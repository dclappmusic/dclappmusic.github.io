<template>
	<div id="bands" class="page bands">
		<div class="cabecera">
			<router-link to="/" class="nav_link">Bands</router-link>
			<router-link to="/Shows" class="nav_link">Shows</router-link>
			<h1 class="tit">Venues</h1>
			<p class="cta" @click="$emit('openModalSubirShow', 'venue')">Subir venue</p>
		</div>
		<div class="view">
			<div class="tabla">
				<div class="fila cabecero">
					<h3 class="tit id sort" @click="ordenarPor('id')">id &#8661;</h3>
					<h3 class="tit name sort" @click="ordenarPor('name')">name &#8661;</h3>
					<h3 class="tit location">city</h3>
					<h3 class="tit capacity">capacity</h3>
					<h3 class="tit web">web</h3>
				</div>
				<div class="fila" v-for="(venue, index) in venues_filtradas" :key="index"
					@click="$emit('openModalSubirShow', 'venue', venue)"
				>
					<p class="parr id">{{venue.id}}</p>
					<p class="parr name">{{venue.name}}</p>
					<p class="parr location">{{venue.city}}</p>
					<p class="parr capacity">{{venue.capacity}}</p>
					<a class="parr web" @click.stop :href="venue.web" target="blank">{{venue.web}}</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	// import firebase from "firebase";

	export default {
		name: 'Venues',
		props: [],
		components: {},
		computed: {
			...mapState([
				"shows", "bands", "venues", 'user'
			])
		},
		data() {
			return {
				venues_filtradas: []
			}
		},
		watch: {
			bands() {
				this.venues_filtradas = [...this.venues].sort((a, b) => b.id - a.id);
			}
		},
		methods: {
			ordenarPor(categoria) {
				let sentido_ascendente;
				// if (typeof categoria === 'number') {
				if (categoria === 'id') {
					sentido_ascendente = this.venues_filtradas[0][categoria] < this.venues_filtradas[this.venues_filtradas.length - 1][categoria];
					this.venues_filtradas.sort((a, b) => {
						if (sentido_ascendente) return b[categoria] - a[categoria]
						else {return a[categoria] - b[categoria]}
					});
				} else {
					sentido_ascendente = this.venues_filtradas[0][categoria].localeCompare(this.venues_filtradas[this.venues_filtradas.length - 1][categoria]);
					this.venues_filtradas.sort((a, b) => {
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
			this.venues_filtradas = [...this.venues].sort((a, b) => b.id - a.id);

			// this.venues.filter(band => band.id > 238).forEach(ban => {
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