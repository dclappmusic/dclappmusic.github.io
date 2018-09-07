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
    // latitud = 40.450149;
    quien();
};

var browserGeolocationFail = function(error) {
  switch (error.code) {
    case error.TIMEOUT:
      console.log("Browser geolocation error !\n\nTimeout.");
      latitud = 43.21114;
	  longitud = -8.23259;
      break;
    case error.PERMISSION_DENIED:
      if(error.message.indexOf("Only secure origins are allowed") == 0) {
        tryAPIGeolocation();
      } else {
      	latitud = 43.21114;
	    longitud = -8.23259;
      }
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Browser geolocation error !\n\nPosition unavailable.");
      latitud = 43.21114;
	  longitud = -8.23259;
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



var diferencia = 0.000500;

var mese = {
    name: "Mese",
    imagen: "images/perfil_rober.png",
    latitud: 40.407063,
    longitud: -3.703284,
    latmin: 40.407063 - diferencia,
    latmax: 40.407063 + diferencia 
}
var pablo = {
    name: "Paul and the pauls",
    imagen: "images/perfil_pablo.jpeg",
    latitud: 40.450249,
    longitud: -3.695041,
    latmin: 40.450249 - diferencia,
    latmax: 40.450249 + diferencia 
}
var marina = {
    name: "Marina",
    imagen: "images/perfil_marina.jpeg",
    latitud: 52.516050,
    longitud: 13.462634,
    latmin: 52.516050 - diferencia,
    latmax: 52.516050 + diferencia 
}
var marco = {
    name: "Markiño",
    imagen: "images/perfil_markuser.jpg",
    latitud: 52.490818,
    longitud: 13.402605,
    latmin: 52.490818 - diferencia,
    latmax: 52.490818 + diferencia 
}
var maria = {
    name: "Poni",
    imagen: "images/perfil_rober.png",
    latitud: 39.665170,
    longitud: 13.402605,
    latmin: 39.665170 - diferencia,
    latmax: 39.665170 + diferencia 
}

var quien = function() {
    // debugger;
    console.log(latitud);
    // latitud = 52.516000;
    console.log(latitud);
    console.log(marina.latitud);
    if ((mese.latmin < latitud) && (latitud < mese.latmax)) {
        console.log("MESE IS HERE");
        $(".clapp .fondo img").attr("src", mese.imagen);
        $(".act .name").html(mese.name);
    } else if ((marina.latmin < latitud) && (latitud < marina.latmax)) {
        console.log("MARINA IS HERE");
        $(".clapp .fondo img").attr("src", marina.imagen);
        $(".act .name").html(marina.name);
    } else if ((marco.latmin < latitud) && (latitud < marco.latmax)) {
        console.log("MARCO IS HERE");
        $(".clapp .fondo img").attr("src", marco.imagen);
        $(".act .name").html(marco.name);
    } else if ((pablo.latmin < latitud) && (latitud < pablo.latmax)) {
        console.log("PABLO IS HERE");
        $(".clapp .fondo img").attr("src", pablo.imagen);
        $(".act .name").html(pablo.name);
    } else if ((maria.latmin < latitud) && (latitud < maria.latmax)) {
        console.log("PONI IS HERE");
        $(".clapp .fondo img").attr("src", maria.imagen);
        $(".act .name").html(maria.name);
    } else {
        $(".act .name").html("no music :'(");
    }
}



