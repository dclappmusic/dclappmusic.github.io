<template>
	<div id="app">
		<div class="logo">
			<img src="img/logo.png" />
		</div>
		<div class="nav">
			<p class="parr">Número de shows: <b class="tit">{{num_shows}}</b></p>
			<p class="parr">Número de bandas: <b class="tit">{{num_bands}}</b></p>
			<p class="parr">Loggeado como: <b class="tit">{{logged_user}}</b></p>
		</div>
		<modal-subir-show v-if="logged_user && modal_create_band" 
			:edited_band="edited_band" 
			:edited_show="edited_show" 
			:edited_venue="edited_venue" 
			@close="closeModalSubirShow"
		/>
		<modal-login v-if="modal_login" @close="modal_login = false" />
		<main class="view">
			<router-view 
				@openModalSubirShow="openModalSubirShow"
			/>
		</main>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from "firebase"
import ModalSubirShow from './components/modalSubirShow.vue'
import ModalLogin from './components/modalLogin.vue'

export default {
	name: 'App',
	components: {ModalSubirShow, ModalLogin},
	computed: {
		...mapState([
			"shows", "bands", "venues", 'user'
		]),
		num_shows() {
			return this.shows.length
		},
		num_bands() {
			return this.bands.length
		},
		db() {return firebase.firestore();}
	},
	data() {
		return {
			shows_fb: [],
			bands_fb: [],
			venues_fb: [],
			modal_create_band: false,
			modal_login: true,
			edited_band: false,
			edited_show: false,
			edited_venue: false,
			logged_user: null
		}
	},
	watch: {},
	created() {
		// if (!this.user) {
		// 	this.modal_login = true;
		// }
		this.login();
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				console.log('loggeado');
				this.logged_user = user.email;
				this.modal_login = false;
				this.getShows();
				this.getBands();
				this.getVenues();
				// this.$router.replace( {name: 'bands'} );
			} else {
				console.log('no loggeado');
				this.loggedUser = null;
				this.modal_login = true;
			}
		});
	},
	methods: {
	//gets the shows from the firebase database
		getShows() {
			this.db.collection("shows").onSnapshot((querySnapshot) => {
				this.shows_fb = [];
				querySnapshot.forEach((doc) => {
					let show = doc.data();
					this.shows_fb.push(show);
				});
				if (this.shows_fb.length) this.$store.commit("updateShows", this.shows_fb);
			});
		},
		getBands() {
			this.db.collection("bands").onSnapshot((querySnapshot) => {
				this.bands_fb = [];
				querySnapshot.forEach((doc) => {
					let band = doc.data();
					this.bands_fb.push(band);
				});
				if (this.bands_fb.length) this.$store.commit("updateBands", this.bands_fb);
			});
		},
		getVenues() {
			this.db.collection("venues").onSnapshot((querySnapshot) => {
				this.venues_fb = [];
				querySnapshot.forEach((doc) => {
					let venue = doc.data();
					if (venue.city != 'Berlin') this.venues_fb.push(venue);
				});
				if (this.venues_fb.length) this.$store.commit("updateVenues", this.venues_fb);
			});
		},
		// getVenuesGS() {
		// 	console.log("get fake bd");
		// 	fetch('https://script.google.com/macros/s/AKfycbyb7k9jrcoz2cZwPrrzDcoS96WuBXfxMUuUP7FWrw/exec')
		// 		.then(response => {return response.json()})
		// 		.then(result => {
		// 			var venues = result.venues;
		// 			this.venues_gs = venues.map(ven => {
		// 				return {
		// 					id: ven.id,
		// 					name: ven.name,
		// 					lat: parseFloat(ven.latitud),
		// 					lon: parseFloat(ven.longitud),
		// 					city: ven.city,
		// 					logo: ven.logo,
		// 					web: ven.web_venue,
		// 					capacity: parseInt(ven.capacity) || 0,
		// 				}
		// 			})
		// 			// this.venues_gs.forEach(venue => {
		// 			// 	firebase.firestore().collection("venues").doc('venue_' + venue.id).set(venue);
		// 			// });
		// 		})
		// },
		// getShowsGS() {
		// 	console.log("get fake bd");

		// 	fetch('https://script.google.com/macros/s/AKfycbwtfaKRfZS_gULhNygGn0453Z23HN9QSlyHN2z_a_ed8MXTdSM/exec')
		// 		.then(response => {return response.json()})
		// 		.then(result => {
		// 			var shows = result.shows;
					
		// 			function toTitleCase(str) {
		// 				return str.replace(
		// 					/\w\S*/g,
		// 					function(txt) {
		// 						return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		// 					}
		// 				);
		// 			}

		// 			this.shows_gs = shows.map(sho => {
		// 				return {
		// 					id: sho.show_id,
		// 					band: toTitleCase(sho.show),
		// 					band_id: 0,
		// 					venue: sho.venue,
		// 					venue_id: sho.venue_id,
		// 					link: sho.link,
		// 					fecha: null,
		// 					hora: null,
		// 					timestamp: this.$moment(sho.timestamp).unix()*1000,
		// 					city: "Madrid",
		// 					festival: sho.festival,
		// 					image: null,
		// 					lat: null,
		// 					lon: null,
		// 					price: parseInt(sho['price (anticipada)']) || null,
		// 					consumicion: sho['consumición']
		// 				}
		// 			})
		// 			this.$store.commit("updateShows", [... this.shows_gs, ...this.shows_fb]);
		// 			debugger;
		// 			this.shows_gs.forEach(show => {
		// 				firebase.firestore().collection("shows").doc('show_' + show.id).set(show);
		// 			});
		// 			debugger;
		// 		})
		// },

//open modal edit show/band
		openModalSubirShow(tipo, id) {
			if (tipo && tipo === 'band') this.edited_band = id || 'new';
			if (tipo && tipo === 'show') this.edited_show = id || 'new';
			if (tipo && tipo === 'venue') this.edited_venue = id || 'new';
			this.modal_create_band = true;
		},
		closeModalSubirShow(accion) {
			this.modal_create_band = false;
			this.edited_band = false;
			this.edited_show = false;
			this.edited_venue = false;
			if (accion === 'refrescar bands') {
				// this.getBands();
			} else if (accion === 'refrescar shows') {
				// this.getShows();
			}
		},
		login() {
			if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
				let email = window.localStorage.getItem('emailForSignIn');
				if (!email) email = window.prompt('Please provide your email for confirmation');
				firebase.auth().signInWithEmailLink(email, window.location.href).then((result) => {
					window.localStorage.removeItem('emailForSignIn');
					this.logged_user = result.user.email;
					this.modal_login = false;
					this.$router.replace('/');
					window.location.replace(location.protocol + '//' + location.host + location.pathname);
					this.getShows();
					this.getBands();
					this.getVenues();
				}).catch((error) => {
					alert(error);
				});
			}
		}
	}
}
</script>

<style scoped lang="scss">
#app {
	min-height: 100vh;
	padding: 1em;
	.logo {
		position: absolute;
		top: 1rem;
		left: 1rem;
		img {width: 5rem;}
	}
	.nav {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 50%;
		margin: 1em auto;
		border: 2px solid black;
		padding: 1em;
		&>* {margin: 0 2em;}
	}
}
</style>
