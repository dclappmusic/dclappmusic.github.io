<template>
	<div id="app">
    <get-geolocation @geolocationError="geolocationError" :findLocation="findLocation"/>
    <keep-alive>
        <router-view />
    </keep-alive>
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
  import { mapState } from 'vuex';
  import {db} from '@/firebaseConfig'
	import firebase from "firebase";
	import Nav from '@/components/Nav';
	import PopupInstall from '@/components/PopupInstall';
  // import PopupLogin from '@/components/PopupLogin';
  import GetGeolocation from '@/components/GetGeolocation';

	export default {
		name: 'app',
		components: {
			Nav,
			PopupInstall,
      // PopupLogin,
      GetGeolocation
		},
		data() {
			return {
        show_login: true,
        // user: {},
        show_install: false,
        deferredPrompt: null,
        shows_fb: [],
        bands_fb: [],
        venues_fb: [],
        findLocation: false
			}
		},
    computed: {
      ...mapState(["shows", "bands", "venues", 'user']),
    },
    watch: {
      // shows_fb: function() {
      //   this.$store.commit("updateShows", this.shows_fb);
      // },
      // bands_fb: function() {
      //   this.$store.commit("updateBands", this.bands_fb);
      // },
      venues_fb: function() {
        this.$store.commit("updateVenues", this.venues_fb);
      },
      geolocation: function() {
        this.$store.commit("updateGeolocation", this.geolocation);
      }
    },
		created() {
      setInterval(() => {
        this.fecha_hoy = new Date();
      }, 1000);
			this.loginState();
		},
		mounted() {
			window.addEventListener('beforeinstallprompt', (e) => {
				e.preventDefault();
				this.deferredPrompt = e;
				this.show_install = true;
			});
      this.getShows();
      this.getBands();
      // this.forceSWupdate();  
		},
		methods: {
      //si el usuario está loggeado, se descarga su perfil
      loginState() {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            console.log("ya estas logueado");
            console.log(user);
            this.show_login = false;
          //download user
            db.collection("fans").doc(user.uid).onSnapshot(() => {
              // this.user = doc.data();
              console.log(user);
              this.$store.commit("updateUser", user);
            });
          } else {
            // No user is signed in.
            this.show_login = true;
            console.log("no estás logueado");
          }
        });
      },
      //gets the shows from the firebase database
      getShows() {
        db.collection("shows").onSnapshot((querySnapshot) => {
          this.shows_fb = [];
          querySnapshot.forEach((doc) => {
            let show = doc.data();
            this.shows_fb.push(show);
          });
          this.$store.commit("updateShows", this.shows_fb);
        });
      },
      getBands() {
        db.collection("bands").onSnapshot((querySnapshot) => {
          this.bands_fb = [];
          querySnapshot.forEach((doc) => {
            let band = doc.data();
            this.bands_fb.push(band);
          });
          this.$store.commit("updateBands", this.bands_fb);
        });
      },

      //Crosses the venues and shows DB to set the show coords
      set_show_cords(shows, venues) {
        shows.forEach(show => {
          var venue_id = show.venue_id;
          if (venue_id) {
            show.lat = venues[venue_id].latitud;
            show.lon = venues[venue_id].longitud;
          }
        });
      },
      //close the PWA install popup
      event_cerrar_popup(deferredPrompt) {
				this.show_install = false;
				this.deferredPrompt = deferredPrompt;
			},
      //suposely update the PWA version everytime you open the App
      // forceSWupdate() {
      //   if ('serviceWorker' in navigator) {
      //     navigator.serviceWorker.getRegistrations().then(function (registrations) {
      //         for (let registration of registrations) {
      //             registration.update()
      //         }
      //     })
      //   }
      // },
      geolocationError(error) {
        alert(error);
      }
		}
	};
</script>
<style lang="scss">
#app {
  position: relative;
  // position: fixed;
	// left: 0;
  // padding: 20px 15px 10px;
	width: 100vw;
	// height: 100%;
	background-color: var(--color-fondo-light); 
	// overflow-x: hidden;
}
</style>