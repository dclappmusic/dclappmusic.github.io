var latitud;
var longitud;

//geolocalizacion

var apiGeolocationSuccess = function(position) {
	latitud = position.coords.latitude;
	longitud = position.coords.longitude;
    console.log("API geolocation success!\n\nlat = " + latitud + "\nlng = " + longitud);
};

var tryAPIGeolocation = function() {
    jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDCa1LUe1vOczX1hO_iGYgyo8p_jYuGOPU", function(success) {
        apiGeolocationSuccess({coords: {latitude: success.location.lat, longitude: success.location.lng}});
	})
  .fail(function(err) {
    console.log("API Geolocation error! \n\n"+err);
  });
};

var browserGeolocationSuccess = function(position) {
    latitud = position.coords.latitude;
    longitud = position.coords.longitude;
    console.log("Browser geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
    // latitud = 39.665158;
    // quien();
    encontrar();
};

var browserGeolocationFail = function(error) {
  switch (error.code) {
    case error.TIMEOUT:
      console.log("Browser geolocation error !\n\nTimeout.");
    //   latitud = 43.21114;
	//   longitud = -8.23259;
      break;
    case error.PERMISSION_DENIED:
      if(error.message.indexOf("Only secure origins are allowed") == 0) {
        tryAPIGeolocation();
      } else {
      	// latitud = 43.21114;
	    // longitud = -8.23259;
      }
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Browser geolocation error !\n\nPosition unavailable.");
    //   latitud = 43.21114;
	//   longitud = -8.23259;
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
  		// latitud = 43.21114;
	    // longitud = -8.23259;
  	}
};

    // tryGeolocation();




var activos = [
    {
        name: "Mese",
        imagen: "images/perfil_rober.png",
        ciudad: "Madrid",
        posicion_show: {
            latitud: 40.407063,
            longitud: -3.703284
        }
    },
    {
        name: "Paul and the pauls",
        imagen: "images/perfil_pablo.jpeg",
        ciudad: "Valladolid",
        posicion_show: {
            latitud: 40.450249,
            longitud: -3.695041
        }
    },
    {
        name: "Marina",
        imagen: "images/perfil_marina.jpeg",
        ciudad: "Berlin",
        posicion_show: {
            latitud: 52.516050,
            longitud: 13.462634
        }
    },
    {
        name: "Markiño",
        imagen: "images/perfil_markuser.jpg",
        ciudad: "Berlin",
        posicion_show: {
            latitud: 52.490818,
            longitud: 13.402605
        }
    },
    {
        name: "Poni",
        imagen: "images/perfil_maria.png",
        ciudad: "Intermundicia",
        posicion_show: {
            latitud: 40.423399,
            longitud: -3.691778
        }
    }
];



// var posicion_clapp = {
//     latitud: latitud,
//     longitud: longitud
// };

var diferencia = 0.001000;

function cerca (posicion1) {
    var distancia;
    // debugger;
    distancia = Math.pow((Math.pow(posicion1.latitud - latitud, 2) + Math.pow(posicion1.longitud - longitud,2)), 0.5);
    console.log(distancia);
    return distancia <= diferencia;
}


function encontrar() {
    var musico_encontrado = false;
    console.log("encontrar");
    activos.forEach(function(element) {
        console.log(element.name);
        if (cerca(element.posicion_show)) {
            $(".clapp .fondo img").attr("src", element.imagen);
            $(".act .name").html(element.name);
            console.log("está cerca");
            musico_encontrado = true;
        } else {
            console.log("está lejos");
        }
    });
    if (!musico_encontrado) {
        $(".act .name").html("no music :'(");
    }
};


