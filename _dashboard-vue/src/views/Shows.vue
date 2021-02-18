<template>
	<div class="page shows">
		<div class="cabecera">
			<router-link to="/Bands" class="nav_link">Bands</router-link>
			<h1 class="tit">Shows</h1>
			<p class="cta" @click="$emit('openModalSubirShow')">Subir show</p>
		</div>
		<div class="view">
			<div class="tabla">
				<div class="fila cabecero">
					<h3 class="tit id">id</h3>
					<h3 class="tit band">band</h3>
					<h3 class="tit where">where</h3>
					<h3 class="tit fest">festival?</h3>
					<h3 class="tit clicks">clicks</h3>
				</div>
				<div class="fila" v-for="(show, index) in shows_filtrados" :key="index">
					<p class="id">{{show.id}}</p>
					<p class="band">{{show.band}}</p>
					<p class="where">{{show.link}}</p>
					<p class="fest">{{show.festival}}</p>
					<p class="clicks">{{show.clicks}}</p>
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
					band: null,
					where: null,
					fest: null,
					clicks: null
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
		}
	}
</script>
<style scoped lang="scss">
	.tabla {
		.fila {
			.id {width: 5%;}
			.band {width: 25%;}
			.where {width: 30%;}
		}
	}	
</style>