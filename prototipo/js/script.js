//-------------VARIABLES GLOBALES

    var latitud;
    var longitud;
    var distancia_max = 0.001000;
    var test_coord_clapp = {
        latitud: 40.409054,
        longitud: -3.693103
    };


//-------------FUNCIONES

// --------------Clapp

    //geolocalizacion
        var apiGeolocationSuccess = function(position) {
            latitud = position.coords.latitude;
            longitud = position.coords.longitude;
            console.log("API geolocation success!\n\nlat = " + latitud + "\nlng = " + longitud);
            encontrar();
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
            encontrar();
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


    //comparar distancias
        function cerca (posicion1, posicion2) {
            var distancia;
            // debugger;
            distancia = Math.pow((Math.pow(posicion1.latitud - posicion2.latitud, 2) + Math.pow(posicion1.longitud - posicion2.longitud,2)), 0.5);
            console.log(distancia);
            return distancia <= distancia_max;
        };

    //Buscar bandas dentro del área del clapp
        function encontrar() {
            var musico_encontrado = false;
            var posicion_clapp = {
                latitud: latitud,
                longitud: longitud
            };
            console.log("encontrar en: " + posicion_clapp.latitud + "," + posicion_clapp.longitud);
            shows_activos.forEach(function(Ishow_activo) {
                console.log(Ishow_activo.ID);
                if (cerca(Ishow_activo.posicion_show, posicion_clapp)) {
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

    //bajarse y mostrar los datos de la banda encontrada
        function show_encontrado (Ibanda_encontrada) {
            bandas.forEach(function(Ibandas) {
                var banda_activa = bandas.find(o => o.ID === Ibanda_encontrada.ID);
                console.log(banda_activa.name + ", perfil encontrado");
                $(".clapp .fondo img").attr("src", banda_activa.imagen);
                $(".act .name").html("<b>" + banda_activa.name + "</b>");
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
        });
    //BBDD sumarle los clapps a la banda


// --------------historial de clapps

    //cargar clapps en historial
        function cargar_historial (I_id) {
            console.log("cargar historial");

            //descargarse user_persona
            usuario = usuarios.find(o => o.ID === I_id);
            console.log(usuario.ID);
            //BBDD descargarse user_persona

            
            usuario.historial_clapps.forEach(function(I_userClapps) {
                console.log(I_userClapps.clappeado);
                var banda = bandas.find(o => o.name === I_userClapps.clappeado);
                console.log(banda);
                $(".clapps").append(
                    '<li class="clappeado"><img src="' + banda.imagen + '"><p class="band">' + banda.name + '</p><p class="clapps_dados">' + I_userClapps.num_clapps + '</p></li>'
                );
            });
        };
 

