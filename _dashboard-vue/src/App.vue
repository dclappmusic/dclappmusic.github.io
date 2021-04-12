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
		<modal-subir-show v-if="logged_user && modal_create_band" :edited_band="edited_band" :edited_show="edited_show" @close="closeModalSubirShow"/>
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
	},
	data() {
		return {
			shows_fb: [],
			bands_fb: [],
			modal_create_band: false,
			modal_login: true,
			edited_band: false,
			edited_show: false,
			logged_user: null
		}
	},
	watch: {
	},
	created() {
		// if (!this.user) {
		// 	this.modal_login = true;
		// }
		this.getShows();
		this.getBands();
		this.login();
	},
	methods: {
	//gets the shows from the firebase database
		getShows() {
			var db = firebase.firestore();
			db.collection("shows").onSnapshot((querySnapshot) => {
				this.shows_fb = [];
				querySnapshot.forEach((doc) => {
					let show = doc.data();
					this.shows_fb.push(show);
				});
				if (this.shows_fb.length) this.$store.commit("updateShows", this.shows_fb);
			});
		},
		getBands() {
			var db = firebase.firestore();
			db.collection("bands").onSnapshot((querySnapshot) => {
				this.bands_fb = [];
				querySnapshot.forEach((doc) => {
					let band = doc.data();
					this.bands_fb.push(band);
				});
				if (this.bands_fb.length) this.$store.commit("updateBands", this.bands_fb);
			});
		},

//open modal edit show/band
		openModalSubirShow(tipo, id) {
			if (tipo && tipo === 'band') this.edited_band = id || 'new';
			if (tipo && tipo === 'show') this.edited_show = id || 'new';
			this.modal_create_band = true;
		},
		closeModalSubirShow(accion) {
			this.modal_create_band = false;
			this.edited_band = false;
			this.edited_show = false;
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
				}).catch((error) => {
					alert(error);
				});
			} else {
				this.loggedUser = null;
				this.modal_login = true;
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
