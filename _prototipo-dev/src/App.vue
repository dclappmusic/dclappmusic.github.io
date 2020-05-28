<template>
	<div id="app" class="container">
        <!-- <get-geolocation @geolocationError="geolocationError" :findLocation="findLocation"/> -->
        <keep-alive>
            <router-view />
        </keep-alive>
        <!-- <Nav></Nav> -->
        <!-- <PopupLogin v-if="show_login" /> -->
		<!-- <PopupInstall 
			v-if="show_install" 
			:deferredPrompt="this.deferredPrompt" 
			@cerrar_popup="event_cerrar_popup"
		/> -->
	</div>
    
</template>

<script>
    import { mapState } from 'vuex';
    import {db} from '@/firebaseConfig'
	// import firebase from "firebase";
	// import Nav from '@/components/Nav';
	// import PopupInstall from '@/components/PopupInstall';
    // import PopupLogin from '@/components/PopupLogin';
    // import GetGeolocation from '@/components/GetGeolocation';
    import axios from 'axios';

	export default {
		name: 'app',
		components: {
			// Nav,
			// PopupInstall,
            // PopupLogin,
            // GetGeolocation
		},
		data() {
			return {
                show_login: true,
                // user: {},
                show_install: false,
                deferredPrompt: null,
                shows_gs: [],
                shows_fb: [],
                bands_gs: [],
                bands_fb: [],
                venues_gs: [],
                venues_fb: [],
                findLocation: false
			}
		},
        computed: {
            ...mapState([
                "shows", "bands", "venues", 'user'
            ]),
        },
        watch: {
            shows_gs: function() {
                // this.set_show_cords(this.shows_gs, this.venues_gs);
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
            },
            // geolocation: function() {
            //     this.$store.commit("updateGeolocation", this.geolocation);
            // }
        },
		created() {
            // setInterval(() => {
            //     this.fecha_hoy = new Date();
            // }, 1000);

		// 	firebase.auth().onAuthStateChanged(user => {
		// 		if (user) {
		// 			console.log("ya estas logueado");
		// 			console.log(user);
		// // 			this.show_login = false;
        // // //download user
		// 			firebase.firestore().collection("fans").doc(user.uid).onSnapshot((doc) => {
        //                 this.user = doc.data();
        //                 console.log(this.user);
        //                 this.$store.commit("updateUser", user);
		// 			});
		// 		} else {
		// 			// No user is signed in.
        //             this.show_login = true;
		// 			console.log("no estás logueado");
		// 		}
		// 	});
		},
		mounted() {
			// window.addEventListener('beforeinstallprompt', (e) => {
			// 	e.preventDefault();
			// 	this.deferredPrompt = e;
			// 	// this.show_install = true;
			// });
            this.get_shows();
            this.get_fake_bd();
            // this.forceSWupdate();  
		},
		methods: {

        //gets the shows from the firebase database
            get_shows() {
                db.ref('/shows/').on('value', snapshot => {
                    this.shows_fb = [];
                    let data = snapshot.val();
                    for (let doc in data) {
                        let show = data[doc];
                        show.timestamp = new Date(show.timestamp * 1000);
                        this.shows_fb.push(show);
                    }
                });
                // var db = firebase.firestore();
                // db.collection("shows").onSnapshot((querySnapshot) => {
                //     querySnapshot.forEach((doc) => {
                //         let show = doc.data();
                //         show.timestamp = show.timestamp.toDate();
                //         this.shows_fb.push(show);
                //     });
                // });
            },

        //Gets data from the Google sheets database
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
                        let bands = response.data.bands;
                        this.bands_gs = bands;
                        console.log("get bands");
                        // bands.forEach(band => {
                        //     if (band.insta) {
                        //         let insta = 'https://www.instagram.com/' + band.insta + '/?__a=1';
                        //         axios
                        //             .get(insta)
                        //             .then((response1) => {
                        //                 if (response1.data.graphql) {
                        //                     debugger;
                        //                     band.image = response1.data.graphql.user.profile_pic_url;
                        //                     console.log(band.image);
                        //                     this.bands_gs = [this.bands_gs, ...response.data.bands];
                        //                 } else {
                        //                     // band.image = '';
                        //                     // this.bands_gs = [this.bands_gs, ...response.data.bands];
                        //                 }
                        //             });
                        //     }
                        // });
                    })
                axios
                    .get("https://script.google.com/macros/s/AKfycbxMG-visbQGWcrCwBRig56yhzpNTiTVKyRqB7blIg/exec")
                    .then((response) => {
                        this.venues_gs = response.data.venues;
                    })
            },
        //Crosses the venues and shows DB to set the show coords
            set_show_cords: function(shows, venues) {
                shows.forEach(show => {
                    var venue_id = show.venue_id;
                    if (venue_id) {
                        show.lat = venues[venue_id].latitud;
                        show.lon = venues[venue_id].longitud;
                    }
                });
            },
        //close the PWA install popup
            event_cerrar_popup: function(deferredPrompt) {
				this.show_install = false;
				this.deferredPrompt = deferredPrompt;
			},
        //suposely update the PWA version everytime you open the App
            forceSWupdate: function() {
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.getRegistrations().then(function (registrations) {
                        for (let registration of registrations) {
                            registration.update()
                        }
                    })
                }
            },
            geolocationError(error) {
                alert(error);
            }
		}
	};
</script>