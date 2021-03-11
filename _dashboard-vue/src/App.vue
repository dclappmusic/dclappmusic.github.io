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
import axios from 'axios';
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
		this.getFakeDb();
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
					show.timestamp = show.timestamp.toDate();
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

	//Gets data from the Google sheets database
		getFakeDb() {
			console.log("get fake bd");
			axios
				.get('https://script.googleusercontent.com/macros/echo?user_content_key=B2RCswZE_bKhpHpWLE7dh2l8upFAFVNYQNafy9jwsBLeMJurc3MhDJ8KuNBYdrDuZcD7gNoC_pzp8K_h_dbOvXucpcXqn7hum5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnC0Bj8AjnxtLtGH0GnscS5xiWkyEaXlWRRcy-WjMZPpjVKzXvaCvl0CKlmml5HH8C0W-dnclfdIe&lib=M59Av1ZsTFidnmm2zCZX2mvv91E1OTAZR')
				.then((response) => {
					var shows = response.data.shows;
					this.shows_gs = shows.map(show => {
						return {
							id: show.show_id,
							link: show.link,
							band: show.band,
							band_id: show.band_id,
							timestamp: new Date(show.timestamp),
							city: show.city,
							venue: show.venue,
							festival: show.festival,
							image: show.image,
							lat: show.lat,
							lon: show.lon,
							price: show.price
						}
					});
				})
			axios
				.get("https://script.google.com/macros/s/AKfycbwE4QipXuKLAV0UVEsE8_pp2CA2XQu3cqVIzW8co9fLjFi-Javu/exec")
				.then((response) => {
					let bands = response.data.bands;
					this.bands_gs = bands.map(band => {
						return {
							id: band.id,
							name: band.name,
							instagram: band.insta_user,
							youtube: band.rrss3,
							facebook: band.facebook,
							city: band.location,
							afin_a: band['afin a'],
							description: band.description,
							estilo: band.estilo,
							image: band.image
						}
					});
					console.log("get bands");
				})
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
