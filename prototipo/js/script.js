//-------------VARIABLES GLOBALES

    var latitud;
    var longitud;
    var test_coord_clapp = {
        latitud: 40.444865,
        longitud: -3.703273
    };
    var login = false;


//-------------FUNCIONES


    //ver si hay algun usuario logeado, y coger su user ID
        const auth = firebase.auth();
        var userId;
        auth.onAuthStateChanged(user => {
            if (user) {
                // User is signed in.
                console.log("ya estas logueado");
                var user = auth.currentUser;
                userId = user.uid;
                console.log(userId);
                login = true;
                funcion_user();
            } else {
                // No user is signed in.
                console.log("no estás logueado");
                funcion_user();
            }
        });

// --------------Clapp

    //geolocalizacion
        var apiGeolocationSuccess = function(position) {
            latitud = position.coords.latitude;
            longitud = position.coords.longitude;
            console.log("API geolocation success!\n\nlat = " + latitud + "\nlng = " + longitud);
            if (window.location.pathname.indexOf("clapp.html") > -1) {
                console.log("clapping");
                encontrar();
            } else if (window.location.pathname.indexOf("in_show.html") > -1) {
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
            } else if (window.location.pathname.indexOf("in_show.html") > -1) {
                console.log("showtime1");
                $(".posicion").html("coordenadas: <br>" + latitud + ",<br> " + longitud);
                showtime();
            }
        };

        var browserGeolocationFail = function(error) {
            switch (error.code) {
                case error.TIMEOUT:
                    console.log("Browser geolocation error !\n\nTimeout.");
                    $(".act .name").html("Hay problemas con el acceso a tu ubicación");
                break;
                case error.PERMISSION_DENIED:
                    if(error.message.indexOf("Only secure origins are allowed") == 0) {
                        tryAPIGeolocation();
                    } else {
                        console.log("Permison denied");
                        $(".act .name").html("No nos has dado permiso de acceder a tu ubicación");
                        $(".intro_clapp h3").html("No nos has dado permiso de acceder a tu ubicación");
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
                $(".act .name").html("Hay problemas con el acceso a tu ubicación");
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
