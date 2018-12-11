//DECLARACIONES DE FUNCIONES RELACIONADAS CON EL CLAPP
//----------------------------------------------------------
var distancia;
var distancia_max = 0.001000;
var band_preclapps = 0;
var show_preclapps = 0;



//--------GESTION DE SHOWS

    //comparar distancias dadas coordenadas del clapp y del show
    function is_cerca(posicion1, posicion2) {
        // debugger;
        distancia = Math.pow((Math.pow(posicion1.latitud - posicion2.latitud, 2) + Math.pow(posicion1.longitud - posicion2.longitud,2)), 0.5);
        console.log(distancia);
        return distancia <= distancia_max;
    };

    //Buscar shows dentro del área del clapp midiendo distancia entre el clapp, y todos los shows
    function encontrar_shows() {
        // debugger;
        var musico_encontrado = false;
        var posicion_clapp = {
            latitud: latitud,
            longitud: longitud
        };
        var shows_cerca = {};
        var show_cerca_id;
        var num_shows_cerca = 0;
        var show_lejos = {};
        var show_lejos_id;

//*juntar ordenar shows cerca y lejos en una sóla función
        //ordena un array de shows por distancia
        function ordenarShows_cerca() {
            console.log("lista de shows cercanos, sin ordenar:");
            console.log(shows_cerca);
            var keysSorted = Object.keys(shows_cerca).sort(function(a,b){return shows_cerca[a]-shows_cerca[b]});
            console.log("lista de shows ordenados por lejanía:");
            console.log(keysSorted.map(key => shows_cerca[key]));
            show_cerca_id = keysSorted[0];
            console.log("ID del show más cercano: " + show_cerca_id);
        }
        function ordenarShows_lejos() {
            var keysSorted = Object.keys(show_lejos).sort(function(a,b){return show_lejos[a]-show_lejos[b]});
            console.log("lista de shows ordenados por lejanía:");
            console.log(keysSorted.map(key => show_lejos[key]));
            show_lejos_id = keysSorted[0];
            console.log("ID del show más cercano" + show_lejos_id);
            if (show_lejos_id) {
                shows.forEach((Ishow_lejos) => {
                    if (Ishow_lejos.showId === show_lejos_id) {
                        get_show_cercano(Ishow_lejos.banda);
                    }
                })
                // $(".show_cercano").html("No hemos encontrado ningún show clappeable");
            } else {
                console.log("No hay ningún show activo");
            }
        }
        
        console.log("encontrar en: " + posicion_clapp.latitud + "," + posicion_clapp.longitud);
        console.log("shows:");
        console.log(shows);
        
        //compara la distancia de cada show activo con el clapp
        shows.forEach((Ishow_activo) => {
            console.log(Ishow_activo.banda);
            if (is_cerca(Ishow_activo.posicion, posicion_clapp)) {
                //si hay algún show cerca, lo mete en array de shows cerca, k después será ordenado por distancia

                console.log("está cerca");
                console.log("show id: " + Ishow_activo.showId);
                musico_encontrado = true;
                shows_cerca[Ishow_activo.showId] = distancia;
                num_shows_cerca++;
            } else {
                //ordenarlos por distancia, y publicar el mas cercano
                show_lejos[Ishow_activo.showId] = distancia;
                console.log("está lejos");
            }
        });

        //si hay show cerca: si más de 1 los ordena y coge el más cercano. 
        if (musico_encontrado) {
            console.log("show encontrado");
            console.log(shows_cerca);
            console.log("numero de shows: " + num_shows_cerca);
            if (num_shows_cerca > 1) {
                console.log("hay más de un show cerca");
                ordenarShows_cerca();
                show_encontrado_id = show_cerca_id;
                shows.forEach((Ishow_cerca) => {
                    if (Ishow_cerca.showId === show_encontrado_id) {
                        get_show_encontrado(Ishow_cerca.banda);
                    }
                })   
            } else {
                var unico_show_id = Object.keys(shows_cerca)[0];
                console.log("sólo hay 1 show cerca. ID del show:");
                console.log(unico_show_id);
                show_encontrado_id = unico_show_id;
                shows.forEach((Ishow_cerca) => {
                    if (Ishow_cerca.showId === show_encontrado_id) {
                        // console.log(Ishow_cerca.banda);
                        get_show_encontrado(Ishow_cerca.banda);
                    }
                })
            }
        }

        //si no hay ningun show cerca, ordena los activos lejanos, y trae el más cercano
        if (!musico_encontrado) {
            $(".act").hide();
            $(".no_show").show();
            console.log("lista de shows lejanos, sin ordenar:");
            console.log(show_lejos);
            ordenarShows_lejos();
            $(".fondo .fondo_banda").hide();
        }
    };

    //Bajarse y mostrar los datos de la banda encontrada
    function get_show_encontrado(Ibanda_encontrada) {
        console.log("banda encontrada:");
        console.log(Ibanda_encontrada);
        bandRef.doc(Ibanda_encontrada).onSnapshot((doc) => {
            get_user_clapps();
            banda_activa = doc.data();
            banda_activa_id = doc.id;
            band_preclapps = banda_activa.num_clapps;
            console.log("preclapps: " + band_preclapps);
            console.log(banda_activa.nombre + ", perfil encontrado");
            $(".clapp .fondo .fondo_banda").attr("src", banda_activa.imagen);
            $(".act .name").html("<b>" + banda_activa.nombre + "</b>").attr("href", "perfil.html?band=" + banda_activa_id);
        });
    };
    
    //bajarse el show más cercano cd no hay ninguno clappeable
    function get_show_cercano (Ibanda_encontrada) {
        console.log("banda lejana más cercana:");
        console.log(Ibanda_encontrada);
        bandRef.doc(Ibanda_encontrada).get().then((doc) => {
            banda_activa = doc.data();
            banda_activa_id = doc.id;
            console.log(banda_activa.nombre + ", perfil encontrado");
            $(".btn_clapp").hide();
            // $(".show_cerca").html("este es el show más cercano, a: " + keysSorted[show_lejos_id[0]] + "grados");
            $(".fondo img").attr("src", banda_activa.imagen);
            $(".show_cercano .name").html("<b>" + banda_activa.nombre + "</b>").attr("href", "perfil.html?band=" + banda_activa_id);
        });
    };
    

//-------------------GESTION DE CLAPPS
    var user_preclapps = 0;
    var clapps = 0;

    //coger user_preclapps y sacarlos por pantalla
    function get_user_clapps() {
        // debugger;
        if (userId) {
            const userRef = firestore.collection("usuarios").doc(userId);
            userRef.collection("clapps").doc(show_encontrado_id).get().then((doc) => {
                if (doc.exists) {
                    var show = doc.data();
                    user_preclapps = show.show_clapps;
                    clapps = user_preclapps;
                    console.log("clapps ya dados: " + clapps);
                    if (clapps == 1) {
                        $(".num_clapps").html("+" + clapps + " clapp");
                    } else {
                        $(".num_clapps").html("+" + clapps + " clapps");
                    }    
                } else {
                    clapps = 0;
                    console.log("no se han dado clapps, aún");
                }
            });
        } else {
            console.log("no log, no clapp");
        }
    }

    //lo que ocurre al apretar el botón de clapp
    function clapping() {
        clapped = true;
        $(this).addClass("active");

        if (clapps === 0) {
            clapps ++;
            $(".num_clapps").html("+" + clapps + " clapp");
        } else { 
            clapps ++;
            $(".num_clapps").html("+" + clapps + " clapps");
        }
        // $(".num_clapps").html("+" + clapps + " clapps");
        timeout = setTimeout(set_subirClapps, 3000);
        // if (clapps > 50) {
        //     console.log("suficientes clapps, ahora atiende al show");
        //     $(".num_clapps").html("suficientes clapps, ahora atiende al show");
        // } 
    }

        
    //BBDD sumarle los clapps a la banda
    function set_subirClapps(Ipostclapp) {
        //coger los clapps de la banda
        showRef.doc(show_encontrado_id).onSnapshot((doc) => {
            var snap = doc.data();
            console.log(snap);
            console.log("snap: " + snap.num_clapps);
            show_preclapps = snap.num_clapps;
            console.log("show preclapps: " + show_preclapps);
        });

        //BBDD guardar a la banda y los clapps en el historial de clapps del usuario
        console.log("clapps: " + clapps);
        console.log("band preclapps: " + band_preclapps);
        console.log("user preclapps: " + user_preclapps);
        var band_posclapps = band_preclapps + clapps - user_preclapps;
        var show_posclapps = show_preclapps + clapps - user_preclapps;
    
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        console.log("pre: " + band_preclapps + ", pos: " + band_posclapps);

        console.log("show posclapps: " + show_posclapps);
        
        var clapp = {};
        clapp.band = banda_activa_id;
        clapp.show = show_encontrado_id;
        clapp.time = timestamp;
        clapp.coords = {}
        clapp.coords.latitud = latitud;
        clapp.coords.longitud = longitud;
        clapp.user = userId;
        clapp.show_clapps = clapps;

        console.log("Clapp de " + userId + " a " + banda_activa_id);
        const userRef = firestore.collection("usuarios").doc(userId);

        userRef.collection("clapps").doc(show_encontrado_id).set(clapp, { merge: true }).then(function() {
            bandRef.doc(banda_activa_id).update({"num_clapps": band_posclapps}).then(function() {
                bandRef.doc(banda_activa_id).collection("clapps").doc(show_encontrado_id).set(clapp, { merge: true }).then(function() {
                    showRef.doc(show_encontrado_id).update({num_clapps: show_posclapps}).then(function() {
                        showRef.doc(show_encontrado_id).collection("clapps").doc(userId).set(clapp, { merge: true }).then(function() {
                            //POSTCLAPP1 - redirigir a perfil de la banda
                            if (Ipostclapp) {
                                postclapp(Ipostclapp);
                            } else {
                                postclapp("profile");
                            }
                        });
                    });
                });
            });
        });
    }


    //POSTCLAPP - según el parametro escogido por la banda, hará una u otra acción
    function postclapp(Iaccion) {
        switch (Iaccion) {
            case "profile":
                window.location.href = "perfil.html?band=" + banda_activa_id;
                break;
            case "survey":
                // $(".postclapp-survey").show();
                window.location.href = "https://dclapp.typeform.com/to/VBSQXo";
                break;
            case "tickets":

        }
    }

 

