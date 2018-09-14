//-------------VARIABLES GLOBALES

    var latitud;
    var longitud;
    var distancia_max = 0.001000;
    var test_coord_clapp = {
        latitud: 40.409054,
        longitud: -3.693103
    };


    var usuario = {
        historial_clapps: [
            {
                clappeado: "Markiño",
                num_clapps: 5
            },
            {
                clappeado: "Mese",
                num_clapps: 2
            }
        ] 
    }
    var bandas = [
        {
            ID: "1",
            name: "Mese",
            imagen: "images/perfil_rober.png",
            ciudad: "Madrid"
        },
        { 
            ID: "2",
            name: "Paul and the pauls",
            imagen: "images/perfil_pablo.jpeg",
            ciudad: "Valladolid"
        },
        {
            ID: "3",
            name: "Marina",
            imagen: "images/perfil_marina.jpeg",
            ciudad: "Berlin"
        },
        {
            ID: "4",
            name: "PORKI",
            imagen: "images/perfil_markuser.jpg",
            ciudad: "Berlin"
        },
        {
            ID: "5",
            name: "PIG",
            imagen: "images/perfil_maria.png",
            ciudad: "Intermundicia"
        },
        {
            ID: "6",
            name: "Bro",
            imagen: "images/perfil_bro.png",
            ciudad: "Mandril"
        },
        {
            ID: "7",
            name: "HIGOMAN",
            imagen: "images/perfil_luca.png",
            ciudad: "tarragona"
        },
        {
            ID: "8",
            name: "PATRÍFULA",
            imagen: "images/perfil_patri.png",
            ciudad: "double_you"
        }
    ];
    

    var shows_activos = [
        //sólo incluye ID y posicion_show, lo de más lo trae de la base de datos a través del ID
        {
            ID: "1",
            posicion_show: {
                latitud: 40.407063,
                longitud: -3.703284
            }
        },
        {
            ID: "2",
            posicion_show: {
                latitud: 40.450249,
                longitud: -3.695041
            }
        },
        {
            ID: "3",
            posicion_show: {
                latitud: 52.516050,
                longitud: 13.462634
            }
        },
        {
            ID: "4",
            posicion_show: {
                latitud: 52.490818,
                longitud: 13.402605
            }
        },
        {
            ID: "5",
            posicion_show: {
                latitud: 40.423399,
                longitud: -3.691778
            }
        },
        {
            ID: "6",
            posicion_show: {
                latitud: 40.433127,
                longitud: -3.704691
            }
        },
        {
            ID: "7",
            posicion_show: {
                latitud: 41.11516,
                longitud: 1.252181
            }
        },
        {
            ID: "8",
            posicion_show: {
                latitud: 40.409054,
                longitud: -3.693103
            }
        }
    ];

//-------------FUNCIONES

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

    //bajarse y colocar los datos de la banda encontrada
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


    
    //cargar clapps en historial
        var cargar_historial = function() {
            console.log("cargar historial");
            //BBDD descargarse user_persona

            
            usuario.historial_clapps.forEach(function(element) {
                console.log(element.clappeado);
                var banda = shows_activos.find(o => o.name === element.clappeado);
                console.log(banda);
                $(".clapps").append(
                    '<li class="clappeado"><img src="' + banda.imagen + '"><p class="band">' + banda.name + '</p><p class="clapps_dados">' + element.num_clapps + '</p></li>'
                );
            });
        };
    
        // var bandas_activasjson = {};
        // bandas_activasjson.getStrings = function() {
		// 	return $.getJSON('bandas_activas.js');
        // }
        // console.log(bandas_activasjson);

        // var bandas_activasjson = function(){
        //     $.getJSON('editor/strings.json');
        // }
        // $.getJSON( "ajax/test.json", function( data ) {
        //     var bandas_activasjson = [];
        //     $.each( data, function( key, val ) {
              
        //     });
           
        //     $( "<ul/>", {
        //       "class": "my-new-list",
        //       html: items.join( "" )
        //     }).appendTo( "body" );
        //   });
        
        //   var factory = {};
		
 

