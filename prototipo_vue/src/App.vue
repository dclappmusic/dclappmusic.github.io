<template>
	<div id="app" class="container">
		<!-- <Header :usuario="this.usuario" /> -->
		<router-view
            :geolocation="this.geolocation"
            :shows="this.shows"
		/>
		<PopupInstall 
			v-if="show_install" 
			:deferredPrompt="this.deferredPrompt" 
			@cerrar_popup="event_cerrar_popup"
		/>
	</div>
</template>

<script>
	import firebase from "firebase";
	import Nav from '@/components/Nav';
	import Header from '@/components/Header';
	import PopupInstall from '@/components/PopupInstall';

	export default {
		name: 'app',
		components: {
			Nav,
			Header,
			PopupInstall
		},
		data() {
			return {
                geolocation: {
                    latitud: null,
                    longitud: null
                },
                shows: [],
                show_install: false,
                deferredPrompt: null
			}
		},
		created() {
			this.get_geolocation();
            var db = firebase.firestore();
            db.collection("shows").onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var shows = doc.data();
                    console.log(shows);
                    this.shows.push(shows);
                });
            });
		},
		mounted() {
			// alert("mounted");
			window.addEventListener('beforeinstallprompt', (e) => {
				// Prevent Chrome 67 and earlier from automatically showing the prompt
				e.preventDefault();
				// alert("before install");
				// Stash the event so it can be triggered later.
				this.deferredPrompt = e;
				
				// Update UI notify the user they can add to home screen
				this.show_install = true;
			});
		},
		methods: {
			get_geolocation: function() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        this.browserGeolocationSuccess,
                        this.browserGeolocationFail,
                        {maximumAge: 20000, timeout: 10000, enableHighAccuracy: false}
                    );
                } else {
                    console.log("Navigator geolocation unavailable.");
                    // $(".act .name").html("No se puede acceder a la ubicación en tu móvil :'(").addClass("error");
                }
            },
            browserGeolocationSuccess: function(position) {
                this.geolocation.latitud = position.coords.latitude;
                this.geolocation.longitud = position.coords.longitude;
                console.log("Browser geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
                // latitud = test_coord_clapp.latitud;
                // longitud = test_coord_clapp.longitud;
                // if (window.location.pathname.indexOf("clapp.html") > -1) {
                //     console.log("clapping");
                //     encontrar_shows();
                // } else if (window.location.pathname.indexOf("in_show.html") > -1) {
                //     console.log("showtime1");
                //     // $(".posicion").html("coordenadas: <br>" + latitud + ",<br> " + longitud);
                //     showtime();
                // }
            },
            browserGeolocationFail: function(error) {
                switch (error.code) {
                    case error.TIMEOUT:
                        console.log("Browser geolocation error !\n\nTimeout.");
                        // $(".act .name").html("Hay problemas con el acceso a tu ubicación");
                    break;
                    case error.PERMISSION_DENIED:
                        if(error.message.indexOf("Only secure origins are allowed") == 0) {
                            this.tryAPIGeolocation();
                        } else {
                            console.log("Permison denied");
                            // $(".act .name").html("No nos has dado permiso de acceder a tu ubicación");
                            // $(".intro_clapp h3").html("No nos has dado permiso de acceder a tu ubicación");
                        }
                    break;
                    case error.POSITION_UNAVAILABLE:
                        console.log("Browser geolocation error !\n\nPosition unavailable.");
                        // $(".act .name").html("Browser geolocation error !\n\nPosition unavailable");
                    break;
                }
            },
            tryAPIGeolocation: function() {
                jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDCa1LUe1vOczX1hO_iGYgyo8p_jYuGOPU", function(success) {
                    this.apiGeolocationSuccess({coords: {latitude: success.location.lat, longitude: success.location.lng}});
                })
                .fail(function(err) {
                    console.log("API Geolocation error! \n\n"+err);
                    // $(".act .name").html("API Geolocation error! \n\n"+err);
                });
            },

            apiGeolocationSuccess: function(position) {
                this.geolocation.latitud = position.coords.latitude;
                this.geolocation.longitud = position.coords.longitude;
                console.log("API geolocation success!\n\nlat = " + latitud + "\nlng = " + longitud);
                // if (window.location.pathname.indexOf("clapp.html") > -1) {
                //     console.log("clapping");
                //     // encontrar_shows();
                // } else if (window.location.pathname.indexOf("in_show.html") > -1) {
                //     console.log("showtime1");
                //     // $(".posicion").html("coordenadas: <br>" + latitud + ",<br> " + longitud);
                //     // showtime();
                // }
            }
		}
	};
</script>