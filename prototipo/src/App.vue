<template>
	<div id="app" class="container">
		<!-- <Header :usuario="this.usuario" /> -->
		<router-view
            :geolocation="this.geolocation"
            :shows="this.shows"
		/>
        <PopupLogin v-if="show_login" />
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
    import PopupLogin from '@/components/PopupLogin';

	export default {
		name: 'app',
		components: {
			Nav,
			Header,
			PopupInstall,
            PopupLogin
		},
		data() {
			return {
                show_login: true,
                usuario: {},
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
            setInterval(() => {
                this.fecha_hoy = new Date();
            }, 1000);

			firebase.auth().onAuthStateChanged(user => {
				if (user) {
					console.log("ya estas logueado");
					console.log(user);
					this.show_login = false;
//descargarse usuario
					firebase.firestore().collection("fans").doc(user.uid).onSnapshot((doc) => {
                        this.usuario = doc.data();
                        console.log(this.usuario);
					});
					// this.$router.replace('fichaje');
				} else {
					// No user is signed in.
                    this.show_login = true;
					console.log("no estás logueado");
				}
			});
		},
		mounted() {
            this.get_shows();
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
            get_shows: function() {
                if (localStorage.getItem('coords')){
                    this.geolocation = JSON.parse(localStorage.getItem('coords'));
                    console.log(this.geolocation);
                }
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
                localStorage.setItem('coords', JSON.stringify(this.geolocation));
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
                localStorage.setItem('coords', JSON.stringify(this.geolocation));
            }
		}
	};
</script>