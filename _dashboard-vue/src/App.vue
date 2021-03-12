<template>
	<div id="app">
		<div class="logo">
			<img src="img/logo.png" />
		</div>
		<div class="nav">
			<p class="parr">Número de shows: <b class="tit">{{num_shows}}</b></p>
			<p class="parr">Número de bandas: <b class="tit">{{num_bands}}</b></p>
		</div>
		<modal-subir-show v-if="subir_form" :edited_band="edited_band" :edited_show="edited_show" @close="closeModalSubirShow"/>
		<main class="view">
			<router-view 
				@openModalSubirShow="openModalSubirShow"
			/>
		</main>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import firebase from "firebase";
// import axios from 'axios';
import ModalSubirShow from './components/modalSubirShow.vue';

export default {
	name: 'App',
	components: {ModalSubirShow},
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
			shows_gs: [],
			shows_fb: [],
			bands_gs: [],
			bands_fb: [],
			subir_form: false,
			edited_band: false,
			edited_show: false,
		}
	},
	watch: {
		shows_gs: function() {
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
	},
	created() {
		// this.getFakeDb();
		this.getShows();
		this.getBands();
	},
	methods: {
	//gets the shows from the firebase database
		getShows() {
			this.shows_fb = [];
			var db = firebase.firestore();
			db.collection("shows").onSnapshot((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					let show = doc.data();
					this.shows_fb.push(show);
				});
			});
		},
		getBands() {
			this.bands_fb = [];
			var db = firebase.firestore();
			db.collection("bands").onSnapshot((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					let band = doc.data();
					this.bands_fb.push(band);
				});
			});
		},

//open modal edit show/band
		openModalSubirShow(tipo, id) {
			if (tipo && tipo === 'band') this.edited_band = id || 'nueva';
			if (tipo && tipo === 'show') this.edited_show = id || 'nueva';
			this.subir_form = true;
		},
		closeModalSubirShow(accion) {
			this.subir_form = false;
			if (accion === 'refrescar bands') {
				this.getBands();
			} else if (accion === 'refrescar shows') {
				this.getShows();
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
