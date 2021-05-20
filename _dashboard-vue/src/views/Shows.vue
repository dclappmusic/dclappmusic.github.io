<template>
	<div id="shows" class="page shows">
		<div class="cabecera">
			<router-link to="/" class="nav_link">Bands</router-link>
			<h1 class="tit">Shows</h1>
			<router-link to="/Venues" class="nav_link">Venues</router-link>
			<p class="cta" @click="$emit('openModalSubirShow', 'show')">Subir show</p>
		</div>
		<div class="view">
			<div class="filtros">
				<p :class="['chip', filtros.futuros ? 'active' : '']" @click="filtrar('futuros')">Sólo futuros</p>
				<!-- <p :class="['chip', filtros.madrid ? 'active' : '']" @click="filtrar('madrid')">Sólo en Madrid</p> -->
			</div>
			<div class="tabla">
				<div class="fila cabecero">
					<h3 class="tit id sort" @click="ordenarPor('id')">id &#8661;</h3>
					<h3 class="tit band sort" @click="ordenarPor('band')">band &#8661;</h3>
					<h3 class="tit where">where</h3>
					<h3 class="tit when sort" @click="ordenarPor('timestamp')">when &#8661;</h3>
				</div>
				<div class="fila" v-for="(show, index) in shows_filtrados" :key="index"
					@click="$emit('openModalSubirShow', 'show', show)"
				>
					<p class="id">{{show.id}}</p>
					<p class="band">{{show.band}}</p>
					<p class="where">{{show.venue}}</p>
					<p class="when">{{show.timestamp ? $moment(show.timestamp).format('DD/MM/YYYY HH:mm') : 'Sin fecha'}}</p>
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
				filtros:{
					futuros: false,
					madrid: false
				}
			}
		},
		watch: {
			shows() {
				this.shows_filtrados = [...this.shows].sort((a, b) => b.id - a.id);
				this.filtrar('futuros');
			},
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
						if (sentido_ascendente) return (a[categoria] && b[categoria]) ? b[categoria] - a[categoria] : -1
						else {return (a[categoria] && b[categoria]) ? a[categoria] - b[categoria] : -1}
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
			},
			filtrar(filtro) {
				if (filtro === 'futuros') {
					if (!this.filtros.futuros) {
						this.filtros.futuros = true;
						this.shows_filtrados = this.shows_filtrados.filter(show => {
							let today = this.$moment().hours(0).minutes(0).seconds(0).millisecond(0);
							let time = this.$moment(show.timestamp);
							let show_time = this.$moment().set({
								"year": time.year(), "month": time.month(), "date": time.date(),"hour": time.hour(), "minute": time.minute(), "second": 0, "millisecond": 0
							});
							let show_futuro = show_time.diff(today, 'days') >= 0;
							return show_futuro;
						});
					} else {
						this.filtros.futuros = false;
						this.shows_filtrados = [];
						this.shows_filtrados = [...this.shows].sort((a, b) => b.id - a.id);
					}
				} 
			}
		}
	}
</script>
<style scoped lang="scss">
#shows {
	.filtros {
		display: flex;
		.chip {
			padding: .5em 1em;
			border: 1px solid #333;
			border-radius: 2em;
			color: #333;
			cursor: pointer;
			&.active {
				background-color: #333;
				color: white
			}
		}
	}
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