
//-------------FUNCIONES GLOBALES

//ver si hay algun usuario logeado, coger su user ID y ejecutar function user en la página concreta
    const auth = firebase.auth();
    var userId;
    var login = false;

    //chequear si hay user logeado, en cualquier caso, ejecuta function_user despues de chekear
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
