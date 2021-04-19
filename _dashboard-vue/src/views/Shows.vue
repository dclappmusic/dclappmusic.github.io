<template>
	<div id="shows" class="page shows">
		<div class="cabecera">
			<router-link to="/" class="nav_link">Bands</router-link>
			<h1 class="tit">Shows</h1>
			<router-link to="/Venues" class="nav_link">Venues</router-link>
			<p class="cta" @click="$emit('openModalSubirShow', 'show')">Subir show</p>
		</div>
		<div class="view">
			<div class="tabla">
				<div class="fila cabecero">
					<h3 class="tit id sort" @click="ordenarPor('id')">id &#8661;</h3>
					<h3 class="tit band sort" @click="ordenarPor('band')">band &#8661;</h3>
					<h3 class="tit where">where</h3>
					<h3 class="tit when sort" @click="ordenarPor('timestamp')">when &#8661;</h3>
					<!-- <h3 class="tit fest">festival?</h3> -->
					<!-- <h3 class="tit clicks">clicks</h3> -->
				</div>
				<div class="fila" v-for="(show, index) in shows_filtrados" :key="index"
					@click="$emit('openModalSubirShow', 'show', show)"
				>
					<p class="id">{{show.id}}</p>
					<p class="band">{{show.band}}</p>
					<p class="where">{{show.venue}}</p>
					<p class="when">{{show.timestamp ? $moment(show.timestamp).format('DD/MM/YYYY HH:mm') : 'Sin fecha'}}</p>
					<!-- <p class="fest">{{show.festival}}</p> -->
					<!-- <p class="clicks">{{show.clicks}}</p> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		mapState
	} from 'vuex';

	export default {
		name: 'Shows',
		props: [],
		components: {},
		computed: {
			...mapState([
				"shows", "bands", "venues", 'user'
			]),
		},
		data() {
			return {
				subir_show: false,
				shows_filtrados: [],
				new_show: {
					id: null,
					link: null,
					band: null,
					band_id: null,
					timestamp: null,
					city: null,
					venue: null,
					festival: null,
					image: null,
					lat: null,
					lon: null,
					price: null
				}
			}
		},
		watch: {
			shows() {
				this.shows_filtrados = [...this.shows].sort((a, b) => b.id - a.id);
			}
		},
		created() {
			this.shows_filtrados = [...this.shows].sort((a, b) => b.id - a.id);
		},
		methods: {
			ordenarPor(categoria) {
				let sentido_ascendente;
				// if (typeof categoria === 'number') {
				if (categoria === 'id' || categoria === 'timestamp') {
					sentido_ascendente = this.shows_filtrados[0][categoria] < this.shows_filtrados[this.shows_filtrados.length - 1][categoria];
					this.shows_filtrados.sort((a, b) => {
						if (sentido_ascendente) return b[categoria] - a[categoria]
						else {return a[categoria] - b[categoria]}
					});
				} else {
					sentido_ascendente = this.shows_filtrados[0][categoria].localeCompare(this.shows_filtrados[this.shows_filtrados.length - 1][categoria]);
					this.shows_filtrados.sort((a, b) => {
						if (sentido_ascendente > 0) {
							return a[categoria].localeCompare(b[categoria])
						} else {
							return b[categoria].localeCompare(a[categoria])
						}
					});
				} 
			}
		}
	}
</script>
<style scoped lang="scss">
#shows {
	.tabla {
		.fila {
			.id {width: 10%;}
			.band {width: 25%;}
			.where {width: 30%;}
			.sort {
				cursor: pointer;
				&:hover{font-weight: normal;}
			}
		}
	}	
}
</style>