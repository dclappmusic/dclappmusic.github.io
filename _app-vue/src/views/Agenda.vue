<template>
	<div class="page agenda">
		<get-geolocation @geolocationError="geolocationError" :findLocation="findLocation" />
		<div class="cabecera">
			<!-- <h1 class="titulo">Agenda de conciertos</h1> -->
			<!-- <router-link class="display-med subir" to="/subirShow">subir show</router-link>
			<p class="display-med filtros" @click="filters = true">filtros</p> -->
			<!-- <keep-alive>
				<AgendaFilters v-if="filters" @filters_popup="filters = false" @filtering="filtering"/>
			</keep-alive> -->
			<div class="switch">
				<p class="boton display-med mapa" :class="{'active': map}" @click="map = true">mapa</p>
				<p class="boton display-med lista" :class="{'active': !map}" @click="map = false">lista</p>
			</div>
		</div>
		<div class="view" v-if="shows[0]">
			<keep-alive v-if="map">
				<agendaMap :shows="shows_filtered" />
			</keep-alive>
			<keep-alive v-else>
				<agendaList :shows="shows_filtered" />
			</keep-alive>
		</div>
		<!-- <div class="spinner active">
					<p class="display-med">
							Estamos recalibrandonos para encontrar la mejor forma de ser de  mayor utilidad para la comunidad de músicos ante esta nueva situación.<br><br>
							Estate atento a las redes para las novedades
					</p>
					<a href="https://weclapp.live" class="display-sm">volver a la página princpal</a>
			</div> -->
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import GetGeolocation from '@/components/GetGeolocation';
	import agendaMap from '@/components/agendaMap';
	import agendaList from "@/components/agendaList";
	// import ModalSubirShow from "@/components/ModalSubirShow";
	// import AgendaFilters from "@/components/AgendaFilters";

	export default {
		name: 'Agenda',
		components: {
			agendaList,
			agendaMap,
			// AgendaFilters,
			// ModalSubirShow,
			GetGeolocation
		},
		props: {
			agendaView: {
        type: String,
        default: 'list'
      },
		},
		data() {
			return {
				map: false,
				accessToken: "pk.eyJ1IjoiamFwaW1lcyIsImEiOiJjazF3cWdma2QwNDZwM2VxdGpldDQxZWlwIn0.NXdh9SyvQKYtfDyIKGy-ZQ",
				city: null,
				filters: false,
				shows_filtered: [],
				findLocation: false,
				subir_show: false
			}
		},
		computed: {
			...mapState(["geolocation", "shows"]),
		},
		watch: {
			geolocation() {
				this.getCity();
			},
			shows_filtered() {},
			shows() {
				this.shows_filtered = [...this.shows];
			},
			agendaView() {
				this.agendaView === 'map' ? this.map = true : this.map = false;
			}
		},
		created() {
			if (this.agendaView === 'map') this.map = true;
			this.shows_filtered = [...this.shows];
			if (this.geolocation.lat) {
				this.getCity();
			}
		},
		mounted() {},
		methods: {
			getCity() {
				fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + this.geolocation.lon + "," + this.geolocation.lat + ".json?access_token=" + this.accessToken)
					.then(response => {return response.json()})
					.then(result => {
						this.city = result.features[4].text;
						this.$store.commit("updateCity", this.city);
					})
			},
			filtering(new_filters) {
				console.log(new_filters.tipo);
				console.log(new_filters.price);
				if (new_filters.price === 50) {
					new_filters.price = 500;
				}
				this.shows_filtered = this.shows.filter(show => (new_filters.tipo.includes(show.show_type)) && (new_filters
					.price >= show.price));
				console.log(this.shows_filtered);

			},
			geolocationError(error) {
				alert(error);
			}
		}
	}
</script>
<style scoped lang="scss">
.agenda {
	--color_titulo: var(--color-primario-fans);
	.cabecera {
		position: fixed;
		left: 0;
		padding: 0 15px;
		margin-bottom: 50px;
		.switch {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: rgba(255,255,255,.5);
			border-radius: 1rem;
			.boton {
				width: 50%;
				background-color: transparent;
				box-shadow: none;
				color: var(--color-primario-bands);
				font-weight: bold;
				&.active {
					background-color: var(--color-primario-bands);
					color: white;
					width: 50%;
				}
			}
		}
	}
	.filtros {
		position: absolute;
		width: 25%;
		top: 0;
		left: 10px;
		font-size: .6em;
		background-color: white;
		color: var(--color-primario-fans);
		padding: .3em;
		border-radius: 5em;
	}
}

@media (min-width: 768px) {

}
</style>