var distancia_max = 0.001000;

//----------------------------------------------------------
var distancia;
    //comparar distancias dadas coordenadas del clapp y del show
        function cerca (posicion1, posicion2) {
            // debugger;
            distancia = Math.pow((Math.pow(posicion1.latitud - posicion2.latitud, 2) + Math.pow(posicion1.longitud - posicion2.longitud,2)), 0.5);
            console.log(distancia);
            return distancia <= distancia_max;
        };

    //Buscar bandas dentro del área del clapp midiendo distancia entre el clapp, y todos los shows
        function encontrar() {
            // debugger;
            var musico_encontrado = false;
            var posicion_clapp = {
                latitud: latitud,
                longitud: longitud
            };
            var show_lejos = {};
            console.log("encontrar en: " + posicion_clapp.latitud + "," + posicion_clapp.longitud);
            console.log("shows:");
            console.log(shows);
            shows.forEach((Ishow_activo) => {
                console.log(Ishow_activo.banda);
                if (cerca(Ishow_activo.posicion, posicion_clapp)) {
                    console.log("está cerca");
                    console.log("show id: " + Ishow_activo.showId);
                    show_encontrado_id = Ishow_activo.showId;
                    show_encontrado(Ishow_activo);
                    musico_encontrado = true;
                } else {
                    //ordenarlos por distancia, y publicar el mas cercano
                    show_lejos[Ishow_activo.banda] = distancia;
                    console.log("está lejos");
                }
            });
            if (!musico_encontrado) {
                // $(".act .name").html("no music :'(");
                console.log(show_lejos);
                var keysSorted = Object.keys(show_lejos).sort(function(a,b){return show_lejos[a]-show_lejos[b]});
                console.log(keysSorted.map(key => show_lejos[key]));
                show_lejos_id = Object.keys(show_lejos);
                console.log(show_lejos_id[0]);
                show_cercano(show_lejos_id[0]);
                $(".show_cercano").html("No tienes ningún show cerca<br>Éste es el más cercano que hemos encontrado =)");
                // $(".show_cerca").html("este es el show más cercano, a: " + keysSorted[show_lejos_id[0]] + "grados");
            }
        };

    //Bajarse y mostrar los datos de la banda encontrada
        function show_encontrado (Ibanda_encontrada) {
            console.log("banda encontrada:");
            console.log(Ibanda_encontrada);
            bandRef.doc(Ibanda_encontrada.banda).get().then((doc) => {
                banda_activa = doc.data();
                banda_activa_id = doc.id;
                console.log(banda_activa.nombre + ", perfil encontrado");
                $(".clapp .fondo img").attr("src", banda_activa.imagen);
                $(".act .name").html("<b>" + banda_activa.nombre + "</b>").attr("href", "perfil.html?band=" + banda_activa_id);
            });
        };
    
    //bajarse el show más cercano cd no hay ninguno clappeable
    function show_cercano (Ibanda_encontrada) {
        console.log("banda lejana más cercana:");
        console.log(Ibanda_encontrada);
        bandRef.doc(Ibanda_encontrada).get().then((doc) => {
            banda_activa = doc.data();
            banda_activa_id = doc.id;
            console.log(banda_activa.nombre + ", perfil encontrado");
            $(".btn_clapp").hide();
            $(".clapp .fondo img").attr("src", banda_activa.imagen);
            $(".act .name").html("<b>" + banda_activa.nombre + "</b>").attr("href", "perfil.html?band=" + banda_activa_id);
        });
    };


    //sumar y guardar los clapps
        var clapps = 0;

        $(".btn_clapp").click(function() {
            if (login) {
                if (banda_activa) {
                    $(this).addClass("active");

                    if (clapps == 0) {
                        clapps += 1;
                        $(".num_clapps").html("+" + clapps + " clapp");
                    } else if (clapps < 50) { 
                        clapps += 1;
                        $(".num_clapps").html("+" + clapps + " clapps");
                    }
                    //BBDD guardar a la banda y los clapps en el historial de clapps del usuario
                    console.log("Clapp de " + userId + " a " + banda_activa_id);

                    const userRef = firestore.collection("usuarios").doc(userId);
                    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

                    userRef.get().then((doc) => {
                        user = doc.data();
                    });
                    
                    var clapp = {};
                    clapp.band = banda_activa_id;
                    clapp.show = show_encontrado_id;
                    clapp.time = timestamp;
                    clapp.coords = {}
                    clapp.coords.latitud = latitud;
                    clapp.coords.longitud = longitud;
                    clapp.user = userId;

                    userRef.collection("clapps").doc(show_encontrado_id).set(clapp);
                    bandRef.doc(banda_activa_id).collection("clapps").doc(show_encontrado_id).set(clapp);
                    showRef.doc(show_encontrado_id).collection("clapps").doc(userId).set(clapp);
                } else {
                
                }
                
            } else {
                window.location.href = "login.html";
            } 
        });
    //BBDD sumarle los clapps a la banda



 

