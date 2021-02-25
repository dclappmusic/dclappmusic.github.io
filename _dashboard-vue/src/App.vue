<template>
	<div id="app">
		<div class="logo">
			<img src="img/logo.png" />
		</div>
		<div class="nav">
			<p class="parr">Número de shows: <b class="tit">{{num_shows}}</b></p>
			<p class="parr">Número de bandas: <b class="tit">{{num_bands}}</b></p>
		</div>
		<modal-subir-show v-if="subir_form" @close="subir_form = false"/>
		<main class="view">
			<router-view @openModalSubirShow="subir_form = true"/>
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
		band_name() {return this.new_band.name}
	},
	data() {
		return {
			shows_gs: [],
			shows_fb: [],
			bands_gs: [],
			bands_fb: [],
			subir_form: false,
			new_band: {
				name: null,
				insta: null,
				instagram: null,
				youtube: null,
				facebook: null,
				city: null,
			},
			new_show: {
				date: null,
				time: null,
				festival: null,
				link: null,
				band: null,
				band_id: null
			},
			bandas_filtradas: []
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
		band_name() {
			this.bandas_filtradas = this.bands.filter(band => band.name.toLowerCase().includes(this.new_band.name.toLowerCase()));
		}
	},
	created() {
		this.getFakeDb();
		this.getShows();
	},
	methods: {
	//gets the shows from the firebase database
		getShows: function() {
			var db = firebase.firestore();
			db.collection("shows").onSnapshot((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					let show = doc.data();
					show.timestamp = show.timestamp.toDate();
					this.shows_fb.push(show);
				});
			});
		},

	//Gets data from the Google sheets database
		getFakeDb: function() {
			console.log("get fake bd");
			axios
				.get('https://script.googleusercontent.com/macros/echo?user_content_key=B2RCswZE_bKhpHpWLE7dh2l8upFAFVNYQNafy9jwsBLeMJurc3MhDJ8KuNBYdrDuZcD7gNoC_pzp8K_h_dbOvXucpcXqn7hum5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnC0Bj8AjnxtLtGH0GnscS5xiWkyEaXlWRRcy-WjMZPpjVKzXvaCvl0CKlmml5HH8C0W-dnclfdIe&lib=M59Av1ZsTFidnmm2zCZX2mvv91E1OTAZR')
				.then((response) => {
					var shows = response.data.shows;
					shows.forEach(show => {
						show.timestamp =  new Date(show.timestamp);
                        show.id = show.show_id;
					});
					this.shows_gs = shows;
				})
			axios
				.get("https://script.google.com/macros/s/AKfycbwE4QipXuKLAV0UVEsE8_pp2CA2XQu3cqVIzW8co9fLjFi-Javu/exec")
				.then((response) => {
					let bands = response.data.bands;
					this.bands_gs = bands;
					console.log("get bands");
				})
		},
		elegirBand(band) {
			this.new_show.band = band.name;
			this.new_show.band_id = band.id;
			
			this.new_band.id = band.id;
			this.new_band.name = band.name;
			this.new_band.insta = band.insta;
			this.new_band.facebook = band.facebook;
			this.new_band.image = band.image;
			this.new_band.location = band.location;
		},
		subirShow() {
			var db = firebase.firestore();

			const new_band_id = this.bands.length;
			const show_id = this.shows.length;

			const timestamp = new Date(this.new_show.timestamp);

			if (!this.bands.find(bnd => bnd.name === this.new_show.band)) {
				db.collection("bands").doc('band_' + new_band_id).set({
					id: new_band_id,
					name: this.new_band.name,
					youtube: this.new_band.youtube,
					instagram: this.new_band.instagram,
					facebook: this.new_band.facebook,
					city: this.new_band.city,
				}).then(() => {
					console.log("banda subida");
					db.collection("shows").doc('show_' + show_id).set({
						id: show_id,
						timestamp: timestamp,
						festival: this.new_show.festival,
						link: this.new_show.link,
						band_id: this.new_show.band_id,
					}).then(() => console.log("show subido"))
				})
			} else {
				db.collection("shows").doc('show_' + show_id).set({
					id: show_id,
					timestamp: timestamp,
					festival: this.new_show.festival,
					link: this.new_show.link,
					band_id: this.new_show.band_id,
				}).then(() => console.log("show subido"))
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
