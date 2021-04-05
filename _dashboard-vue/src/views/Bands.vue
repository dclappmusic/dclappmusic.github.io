<template>
	<div id="bands" class="page bands">
		<div class="cabecera">
			<h1 class="tit">Bands</h1>
			<router-link to="/Shows" class="nav_link">Shows</router-link>
			<p class="cta" @click="$emit('openModalSubirShow', 'band')">Subir banda</p>
		</div>
		<div class="view">
			<div class="tabla">
				<div class="fila cabecero">
					<h3 class="tit id sort" @click="ordenarPor('id')">id &#8661;</h3>
					<h3 class="tit name sort" @click="ordenarPor('name')">name &#8661;</h3>
					<h3 class="tit location">location</h3>
					<h3 class="tit insta">insta</h3>
					<h3 class="tit fb">facebook</h3>
				</div>
				<div class="fila" v-for="(band, index) in bands_filtradas" :key="index"
					@click="$emit('openModalSubirShow', 'band', band)"
				>
					<p class="parr id">{{band.id}}</p>
					<p class="parr name">{{band.name}}</p>
					<p class="parr location">{{band.city}}</p>
					<a class="parr insta" @click.stop :href="'https://www.instagram.com/' + band.instagram + '/'" target="blank">{{band.instagram}}</a>
					<p class="parr fb">{{band.facebool}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	// import firebase from "firebase";

	export default {
		name: 'Bands',
		props: [],
		components: {},
		computed: {
			...mapState([
				"shows", "bands", "venues", 'user'
			])
		},
		data() {
			return {
				bands_filtradas: []
			}
		},
		watch: {
			bands() {
				this.bands_filtradas = [...this.bands].sort((a, b) => b.id - a.id);
			}
		},
		methods: {
			ordenarPor(categoria) {
				let sentido_ascendente;
				// if (typeof categoria === 'number') {
				if (categoria === 'id') {
					sentido_ascendente = this.bands_filtradas[0][categoria] < this.bands_filtradas[this.bands_filtradas.length - 1][categoria];
					this.bands_filtradas.sort((a, b) => {
						if (sentido_ascendente) return b[categoria] - a[categoria]
						else {return a[categoria] - b[categoria]}
					});
				} else {
					sentido_ascendente = this.bands_filtradas[0][categoria].localeCompare(this.bands_filtradas[this.bands_filtradas.length - 1][categoria]);
					this.bands_filtradas.sort((a, b) => {
						if (sentido_ascendente > 0) {
							return a[categoria].localeCompare(b[categoria])
						} else {
							return b[categoria].localeCompare(a[categoria])
						}
					});
				} 
			}
		},
		created() {
			this.bands_filtradas = [...this.bands].sort((a, b) => b.id - a.id);

			// this.bands.filter(band => band.id > 238).forEach(ban => {
			// 	firebase.firestore().collection("bands").doc('band_' + ban.id).delete().then(() => {
      //     console.log('banda borrada');
      //   })
			// });
		}
	}
</script>
<style scoped lang="scss">
#bands {
	.tabla {
		.id {width: 10%;}
		.name {width: 30%;}
		.insta {width: 25%;}
		.sort {
			cursor: pointer;
			&:hover{font-weight: normal;}
		}
	}
}
</style>