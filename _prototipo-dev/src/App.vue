<template>
	<div id="app" class="container">
		<router-view
            :geolocation="this.geolocation"
            :shows="this.shows"
            :usuario="usuario"
            :get_fake_bd="get_fake_bd"
		/>
        <Nav></Nav>
        <!-- <PopupLogin v-if="show_login" /> -->
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
	import PopupInstall from '@/components/PopupInstall';
    import PopupLogin from '@/components/PopupLogin';
    import axios from 'axios';
    import { mapState } from 'vuex';

	export default {
		name: 'app',
		components: {
			Nav,
			PopupInstall,
            PopupLogin,
		},
		data() {
			return {
                show_login: true,
                usuario: {},
                geolocation: {
                    latitud: null,
                    longitud: null
                },
                show_install: false,
                deferredPrompt: null,
                shows_gs: [],
                shows_fb: [],
                bands_gs: [],
                bands_fb: [],
                venues_gs: [],
                venues_fb: [],
			}
		},
        computed: {
            ...mapState([
                "shows", "bands", "venues", "user"
            ]),
        },
        watch: {
            shows_gs: function() {
                this.set_show_cords(this.shows_gs, this.venues_gs);
                this.$store.commit("updateShows", [...this.shows_fb, ...this.shows_gs]);
            },
            shows_fb: function() {
                this.$store.commit("updateShows", [...this.shows_fb, ...this.shows_gs]);
            },
            bands_gs: function() {
                this.$store.commit("updateBands", [...this.bands_fb, ...this.bands_gs]);
            },
            bands_fb: function() {
                this.$store.commit("updateBands", [...this.bands_fb, ...this.bands_gs]);
            },
            venues_gs: function() {
                this.$store.commit("updateVenues", [...this.venues_fb, ...this.venues_gs]);
            },
            venues_fb: function() {
                this.$store.commit("updateVenues", [...this.venues_fb, ...this.venues_gs]);
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
            this.get_fake_bd();
            
			
			window.addEventListener('beforeinstallprompt', (e) => {
				e.preventDefault();
				this.deferredPrompt = e;
				this.show_install = true;
			});
            this.forceSWupdate();
            
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
                        let show = doc.data();
                        show.timestamp = show.timestamp.toDate();
                        this.shows_fb.push(show);
                    });
                });
            },
            get_fake_bd: function() {
                console.log("get fake bd");
                axios
                    .get('https://script.googleusercontent.com/macros/echo?user_content_key=B2RCswZE_bKhpHpWLE7dh2l8upFAFVNYQNafy9jwsBLeMJurc3MhDJ8KuNBYdrDuZcD7gNoC_pzp8K_h_dbOvXucpcXqn7hum5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnC0Bj8AjnxtLtGH0GnscS5xiWkyEaXlWRRcy-WjMZPpjVKzXvaCvl0CKlmml5HH8C0W-dnclfdIe&lib=M59Av1ZsTFidnmm2zCZX2mvv91E1OTAZR')
                    .then((response) => {
                        var shows = response.data.shows;
                        shows.forEach(show => {
                            show.timestamp =  new Date(show.timestamp);
                        });
                        this.shows_gs = shows;
                    })
                axios
                    .get("https://script.google.com/macros/s/AKfycbwE4QipXuKLAV0UVEsE8_pp2CA2XQu3cqVIzW8co9fLjFi-Javu/exec")
                    .then((response) => {
                        this.bands_gs = response.data.bands;
                    })
                axios
                    .get("https://script.google.com/macros/s/AKfycbxMG-visbQGWcrCwBRig56yhzpNTiTVKyRqB7blIg/exec")
                    .then((response) => {
                        this.venues_gs = response.data.venues;
                    })
            },
            set_show_cords: function(shows, venues) {
                shows.forEach(show => {
                    var venue_id = show.venue_id;
                    show.lat = venues[venue_id].latitud;
                    show.lon = venues[venue_id].longitud;
                });
            },
            event_cerrar_popup: function(deferredPrompt) {
				this.show_install = false;
				this.deferredPrompt = deferredPrompt;
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
            },
            forceSWupdate: function() {
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.getRegistrations().then(function (registrations) {
                    for (let registration of registrations) {
                        registration.update()
                    }
                    })
                }
            }
		}
	};
</script>