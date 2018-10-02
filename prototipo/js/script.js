//-------------VARIABLES GLOBALES

    var latitud;
    var longitud;
    var distancia_max = 0.001000;
    var test_coord_clapp = {
        latitud: 40.444865,
        longitud: -3.703273
    };


//-------------FUNCIONES

// --------------Clapp

    //geolocalizacion
        var apiGeolocationSuccess = function(position) {
            latitud = position.coords.latitude;
            longitud = position.coords.longitude;
            console.log("API geolocation success!\n\nlat = " + latitud + "\nlng = " + longitud);
            if (window.location.pathname.indexOf("clapp.html") > -1) {
                console.log("clapping");
                encontrar();
            } else if (window.location.pathname.indexOf("show.html") > -1) {
                console.log("showtime1");
                $(".posicion").html("coordenadas: <br>" + latitud + ",<br> " + longitud);
                showtime();
            }
        };

        var tryAPIGeolocation = function() {
            jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDCa1LUe1vOczX1hO_iGYgyo8p_jYuGOPU", function(success) {
                apiGeolocationSuccess({coords: {latitude: success.location.lat, longitude: success.location.lng}});
            })
            .fail(function(err) {
                console.log("API Geolocation error! \n\n"+err);
                $(".act .name").html("API Geolocation error! \n\n"+err);
            });
        };

        var browserGeolocationSuccess = function(position) {
            latitud = position.coords.latitude;
            longitud = position.coords.longitude;
            console.log("Browser geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
            // latitud = test_coord_clapp.latitud;
            // longitud = test_coord_clapp.longitud;
            if (window.location.pathname.indexOf("clapp.html") > -1) {
                console.log("clapping");
                encontrar();
            } else if (window.location.pathname.indexOf("show.html") > -1) {
                console.log("showtime1");
                $(".posicion").html("coordenadas: <br>" + latitud + ",<br> " + longitud);
                showtime();
            }
        };

        var browserGeolocationFail = function(error) {
            switch (error.code) {
                case error.TIMEOUT:
                    console.log("Browser geolocation error !\n\nTimeout.");
                break;
                case error.PERMISSION_DENIED:
                    if(error.message.indexOf("Only secure origins are allowed") == 0) {
                        tryAPIGeolocation();
                    } else {
                        console.log("Permison denied");
                        $(".act .name").html("No nos has dado permiso de acceder a tu ubicación");
                    }
                break;
                case error.POSITION_UNAVAILABLE:
                    console.log("Browser geolocation error !\n\nPosition unavailable.");
                    $(".act .name").html("Browser geolocation error !\n\nPosition unavailable");
                break;
            }
        };

        var tryGeolocation = function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    browserGeolocationSuccess,
                    browserGeolocationFail,
                    {maximumAge: 20000, timeout: 10000, enableHighAccuracy: false}
                );
            } else {
                console.log("Navigator geolocation unavailable.");
            }
        };


    //Coger parámetro de la URL
        var getUrlParameter = function getUrlParameter(sParam) {
			var sPageURL = decodeURIComponent(window.location.search.substring(1)),
				sURLVariables = sPageURL.split('&'),
				sParameterName,
				i;

			for (i = 0; i < sURLVariables.length; i++) {
				sParameterName = sURLVariables[i].split('=');

				if (sParameterName[0] === sParam) {
					return sParameterName[1] === undefined ? true : sParameterName[1];
				}
			}
		};

//----------------------------------------------------------

    //comparar distancias dadas coordenadas del clapp y del show
        function cerca (posicion1, posicion2) {
            // debugger;
            var distancia;
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
            console.log("encontrar en: " + posicion_clapp.latitud + "," + posicion_clapp.longitud);
            console.log(shows);
            shows.forEach((Ishow_activo) => {
                console.log(Ishow_activo.banda);
                if (cerca(Ishow_activo.posicion, posicion_clapp)) {
                    console.log("está cerca");
                    show_encontrado(Ishow_activo);
                    musico_encontrado = true;
                } else {
                    console.log("está lejos");
                }
            });
            if (!musico_encontrado) {
                $(".act .name").html("no music :'(");
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
                // $(".clapp .fondo img").attr("src", banda_activa.imagen);
                $(".act .name").html("<b>" + banda_activa.nombre + "</b>").attr("href", "perfil.html?band=" + banda_activa_id);
            });
        };
    
    //ordenar los shows activos por distancia al clapp


    //sumar y guardar los clapps
        var clapps = 0;

        $(".btn_clapp").click(function() {
            if (clapps == 0) {
                clapps += 1;
                $(".num_clapps").html("+" + clapps + " clapp");
            } else if (clapps < 50) { 
                clapps += 1;
                $(".num_clapps").html("+" + clapps + " clapps");
            }
            //BBDD guardar a la banda y los clapps en el historial de clapps del usuario
            console.log("Clapp de " + usuario + " a " + banda_activa_id);
            
            userRef.update({
                clapps: firebase.firestore.FieldValue.arrayUnion(banda_activa_id)
            });
            bandRef.doc(banda_activa_id).update({
                //cada clapp, suma un elemento al array de clapps con el id del clapper
                clapps: firebase.firestore.FieldValue.arrayUnion(usuario)
            });
        });
    //BBDD sumarle los clapps a la banda


// --------------historial de clapps

    //cargar historial de clapps dado el identificador del perfil del usuario
        function cargar_historial (I_id) {
            console.log("cargar historial");

            //descargarse user_persona (comparando el ID del usuario que metes, con todos los IDs de usuario en la base de datos)
            usuario = usuarios.find(o => o.ID === I_id);
            console.log(usuario.ID);
            //BBDD descargarse user_persona

            //Por cada clapp, mostrar sus datos añadiendolos a una lista
            usuario.historial_clapps.forEach(function(I_userClapps) {
                console.log(I_userClapps.clappeado);
                var banda = bandas.find(o => o.name === I_userClapps.clappeado);
                console.log(banda);
                $(".clapps").append(
                    '<li class="clappeado"><img src="' + banda.imagen + '"><p class="band">' + banda.name + '</p><p class="clapps_dados">' + I_userClapps.num_clapps + '</p></li>'
                );
            });
        };
 

