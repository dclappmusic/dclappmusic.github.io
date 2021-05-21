<template>
	<div class="show" @click="ampliar" :class="{open: ampliado, live: show.live, highlight: show.highlight}">
		<p v-if="type==='list_soon'" class="display-sm soon">{{this.$moment(show.timestamp).format("DD/MM")}}</p>
		<p class="parrafo-sm hora">{{this.$moment(show.timestamp).format("HH:mm")}}</p>
		<div class="caja">
			<svg @click="sharePic(show)" class="icon_share" width="20" height="20" viewBox="0 0 20 20" fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<circle cx="10" cy="10" r="10" fill="white" />
				<path fill-rule="evenodd" clip-rule="evenodd"
					d="M14.4689 5.2687C14.4689 6.22927 13.6902 7.00798 12.7297 7.00798C12.2993 7.00798 11.9054 6.85166 11.6017 6.59269L8.06093 9.11233C8.14061 9.31177 8.18444 9.52942 8.18444 9.75729C8.18444 10.0158 8.12804 10.2611 8.02688 10.4817L11.5082 13.0077C11.8222 12.6979 12.2536 12.5066 12.7297 12.5066C13.6902 12.5066 14.4689 13.2853 14.4689 14.2459C14.4689 15.2065 13.6902 15.9852 12.7297 15.9852C11.7691 15.9852 10.9904 15.2065 10.9904 14.2459C10.9904 14.0002 11.0413 13.7663 11.1333 13.5543L7.64099 11.0203C7.32929 11.3155 6.90837 11.4966 6.44516 11.4966C5.48458 11.4966 4.70588 10.7179 4.70588 9.75729C4.70588 8.79672 5.48458 8.01802 6.44516 8.01802C6.93919 8.01802 7.38511 8.22399 7.70173 8.55475L11.1877 6.07412C11.0617 5.83332 10.9904 5.55933 10.9904 5.2687C10.9904 4.30812 11.7691 3.52942 12.7297 3.52942C13.6902 3.52942 14.4689 4.30812 14.4689 5.2687Z"
					fill="#333333" />
			</svg>

			<div class="primera_fila">
				<div class="foto_container" v-if="show.band_id !== 0">
					<p v-if="show.live" class="label_live small">live</p>
					<img class="foto" 
						:src="show.band_id && getBand(show.band_id).image ? getBand(show.band_id).image : 'images/avatar_placeholder.jpg'">
				</div>
				<div :class="['datos_principales', !(show.band_id !== 0 && getBand(show.band_id).image) ? 'sin_imagen' : '']">
					<router-link v-if="show.band_id !== 0" class="banda"
						:to='{ name: "sub", params: {from: "agenda", sub_page: "sub_profile_band", id: show.band_id }}'>
						<p class="parrafo-big">{{show.band ? show.band : ''}}</p>
					</router-link>
					<a class="banda" v-else>
						<p class="parrafo-big">{{show.band ? show.band : ''}}</p>
					</a>

					<div class="fila">
						<p v-if="show.venue && show.venue_id != 0" class="sala tipo parrafo">
							<svg class="pin" width="7" height="9" viewBox="0 0 7 9" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M5.86079 4.31678C6.00326 3.98154 6.08214 3.61234 6.08214 3.22458C6.08214 1.69101 4.84844 0.447815 3.32659 0.447815C1.80474 0.447815 0.571045 1.69101 0.571045 3.22458C0.571045 3.61234 0.649921 3.98154 0.792387 4.31678H0.756561L2.75325 8.0925C2.97248 8.50706 3.5647 8.51155 3.7902 8.10038L5.61818 4.76713C5.70458 4.63705 5.78036 4.49921 5.84427 4.35486L5.86516 4.31678H5.86079Z" fill="white"/>
							</svg>
							{{show.venue}}
						</p>
						<p v-else-if="show.venue === 'streaming'" class="sala tipo parrafo">
							<svg class="pin" width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M4.02405 0.536433C3.95729 0.468315 3.87776 0.41402 3.79001 0.37665C3.70225 0.339279 3.608 0.319567 3.51262 0.318638C3.41725 0.317709 3.32263 0.335583 3.23416 0.371237C3.1457 0.406892 3.06513 0.459628 2.99705 0.526433C2.227 1.29201 1.61616 2.20249 1.19978 3.20535C0.783399 4.2082 0.569713 5.28358 0.571051 6.36943C0.569802 7.49695 0.800305 8.6127 1.24825 9.64742C1.6962 10.6821 2.35204 11.6138 3.17505 12.3844C3.31357 12.5125 3.49654 12.5815 3.68512 12.5768C3.8737 12.5722 4.05304 12.4942 4.18505 12.3594C4.50105 12.0434 4.46205 11.5404 4.15805 11.2494C3.49755 10.62 2.97194 9.86277 2.61317 9.02386C2.2544 8.18494 2.06995 7.28184 2.07105 6.36943C2.07105 4.52343 2.81205 2.84943 4.01405 1.63143C4.30405 1.33643 4.33405 0.846433 4.02405 0.536433Z" fill="black"/>
								<path d="M5.78505 2.29843C5.65335 2.16292 5.4733 2.08514 5.28436 2.08214C5.09541 2.07914 4.91299 2.15117 4.77705 2.28243C4.23588 2.81651 3.80635 3.45289 3.51347 4.15455C3.22058 4.8562 3.07019 5.6091 3.07105 6.36943C3.07105 8.06143 3.80105 9.58243 4.96405 10.6334C5.1013 10.7547 5.27994 10.8185 5.46295 10.8116C5.64596 10.8047 5.81931 10.7277 5.94705 10.5964C6.27505 10.2684 6.21405 9.75243 5.90605 9.46243C5.48386 9.06557 5.14756 8.58632 4.91794 8.05432C4.68831 7.52232 4.57025 6.94887 4.57105 6.36943C4.57105 5.21943 5.02805 4.17543 5.77105 3.40943C6.05705 3.11543 6.10405 2.61643 5.78505 2.29843Z" fill="black"/>
								<path d="M11.3571 2.29843C11.4888 2.16292 11.6688 2.08514 11.8577 2.08214C12.0467 2.07914 12.2291 2.15117 12.3651 2.28243C12.9062 2.81651 13.3358 3.45289 13.6286 4.15455C13.9215 4.8562 14.0719 5.6091 14.0711 6.36943C14.0711 8.06143 13.3411 9.58243 12.1781 10.6334C12.0408 10.7547 11.8622 10.8185 11.6791 10.8116C11.4961 10.8047 11.3228 10.7277 11.1951 10.5964C10.8671 10.2684 10.9281 9.75243 11.2361 9.46243C11.6582 9.06557 11.9945 8.58632 12.2242 8.05432C12.4538 7.52232 12.5718 6.94887 12.5711 6.36943C12.5711 5.21943 12.1141 4.17543 11.3711 3.40943C11.0851 3.11543 11.0381 2.61643 11.3571 2.29843Z" fill="black"/>
								<path d="M13.1181 0.536433C13.1848 0.468315 13.2643 0.41402 13.3521 0.37665C13.4398 0.339279 13.5341 0.319567 13.6295 0.318638C13.7249 0.317709 13.8195 0.335583 13.9079 0.371237C13.9964 0.406892 14.077 0.459628 14.1451 0.526433C14.9151 1.29201 15.5259 2.20249 15.9423 3.20535C16.3587 4.2082 16.5724 5.28358 16.5711 6.36943C16.5723 7.49695 16.3418 8.6127 15.8938 9.64742C15.4459 10.6821 14.7901 11.6138 13.9671 12.3844C13.8285 12.5125 13.6456 12.5815 13.457 12.5768C13.2684 12.5722 13.0891 12.4942 12.9571 12.3594C12.6411 12.0434 12.6801 11.5404 12.9851 11.2494C13.6454 10.6199 14.1708 9.86264 14.5294 9.02374C14.888 8.18483 15.0723 7.28177 15.0711 6.36943C15.0711 4.52343 14.3301 2.84943 13.1281 1.63143C12.8381 1.33643 12.8081 0.846433 13.1181 0.536433Z" fill="black"/>
								<path d="M8.57105 4.86943C8.17323 4.86943 7.7917 5.02747 7.51039 5.30877C7.22909 5.59008 7.07105 5.97161 7.07105 6.36943C7.07105 6.76726 7.22909 7.14879 7.51039 7.43009C7.7917 7.7114 8.17323 7.86943 8.57105 7.86943C8.96888 7.86943 9.35041 7.7114 9.63171 7.43009C9.91302 7.14879 10.0711 6.76726 10.0711 6.36943C10.0711 5.97161 9.91302 5.59008 9.63171 5.30877C9.35041 5.02747 8.96888 4.86943 8.57105 4.86943Z" fill="black"/>
							</svg>
							Streaming
						</p>
						<p class="parrafo" v-if="show.price >= 0">·</p>
						<p class="precio parrafo">{{show.price > 0 ? show.price + "€" : "GRATIS"}}</p>
					</div>
					<div class="fila" v-if="show.band_id && getBand(show.band_id).estilo">
						<p class="tipo parrafo" v-if="show.band_id && getBand(show.band_id).estilo">{{getBand(show.band_id).estilo}}</p>
						<!-- <router-link class="sala"
							:to='{ name: "sub", params: {from: "agenda", sub_page: "sub_profile_venue", id: show.venue_id }}'>
							<p class="parrafo">{{show.festival ? show.festival : ''}}</p>
						</router-link> -->
					</div>
				</div>
			</div>
			<div class="botones">
				<a v-if="show.link" class="boton-sm comprar" :href="show.link" target="blank">
					<!-- {{show.live ? 'Ver concierto' : 'Ir a la página'}} -->
					comprar entradas
				</a>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		mapState
	} from 'vuex'

	export default {
		name: 'ShowCard',
		props: ["show", "type", "from"],
		data() {
			return {
				show_form: false,
				ampliado: false
			}
		},
		computed: {
			...mapState([
				'bands'
			])
		},
		created() {},
		mounted() {

		},
		methods: {
			ampliar() {
				// this.ampliado = !this.ampliado;
			},
			getBand(id) {
				let band = this.bands.find(band => band.id === id);
				return band;
			},
			sharePic(show) {
				console.log(show);
				navigator.share({
					'title': 'Concierto en "directo"',
					'text': 'Creo que este concierto de ' + show.band + ' te puede gustar.',
					'url': 'https://weclapp.live/agenda?showid=' + show.show_id
				}).then(function () {
					console.log('Successful share');
				}).catch(function (error) {
					console.log('Error sharing:', error)
				});
			},
		}
	}
</script>
<style scoped lang="scss">
p, .parr {margin-bottom: 0}
.show {
	position: relative;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	width: 100%;
	margin: 0 auto 1em;

	&.live {
		.hora {color: var(--color-primario-fans);}
		.label_live {
			position: absolute;
			top: -15%;
			left: 0;
			background-color: var(--color-primario-fans);
			color: white;
			z-index: 10;
			padding: .3em 1em;
			border-radius: 2em;
			box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.15);
		}

		// .caja {
		//     background-color: var(--color-primario-fans);
		//     // width: 100%;
		//     // padding-top: 1em;
		//     .segunda_fila .comprar {
		//         color: var(--color-primario-fans);
		//         background-color: white;
		//     }
		// }
	}

	&.highlight {
		.caja {
			background-color: var(--color-primario-fans);
			// width: 100%;
			padding-top: 1em;

			.segunda_fila .comprar {
				color: var(--color-primario-fans);
				background-color: white;
			}
		}
	}

	&.mapa.open {
		.caja {
			background-color: transparent;
		}
	}

	&.mapa {
		margin-bottom: 0;
		.caja {
			padding: 1em .5em;

			.segunda_fila {
				background: none;
				margin: 1em -1.5em -2em;
				width: calc(100% + 2em);
			}
		}
	}

	&.open {
		.caja {
			background-color: #333;
			color: white;
			a {pointer-events: unset;}
			.primera_fila .datos_principales .segunda .sala:before {
				background-image: url("../../public/images/pin_liveshow_white.png");
			}
		}
	}
	.soon {margin-right: 100%;}

	.hora {
		position: relative;
		display: inline-block;
		transform: rotate(-90deg);
		transform-origin: top;
		width: 13%;
		color: #333;
		font-weight: bold;
		font-size: 1.2em;
		margin-left: -8%;
		top: 15px;
	}

	.caja {
		position: relative;
		display: inline-block;
		width: 95%;
		margin-left: auto;
		background-color: var(--color-fondo-light);
		color: #333;
		padding: .5em;
		border-radius: .5em;

		// a {pointer-events: none;}
		.icon_share {
			position: absolute;
			top: 2em;
			right: 0;
			// box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.45);
		}

		.primera_fila {
			display: flex;
			width: 100%;
			min-height: 5em;
			.foto_container {
				position: relative;
				height: 100%;
				margin-right: 5%;
				.foto {
					width: 20vw;
					height: 20vw;
					max-width: 7em;
					max-height: 7em;
					object-fit: cover;
					border-radius: 50%;
					box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.45);
				}
			}
			.datos_principales {
				display: flex;
				flex-direction: column;
				width: 70%;
				align-items: center;
				justify-content: center;
				&.sin_imagen {width: calc(100% - 30px);}
				.banda {
					width: 100%;
					margin-bottom: .5em;
					p {
						font-weight: bold;
						line-height: 1em;
					}
				}

				.fila {
					width: 100%;
					display: flex;
					text-align: left;
					display: flex;
					align-items: center;
					&>* {margin-right: .3em}
					.sala {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						max-width: 100%;
						// font-weight: 400;
						// .parrafo-sm {
						// 	text-align: left;
						// 	width: fit-content;
						// }
						.pin {
							width: 1em;
							height: 1em;
							margin-right: 3px;
							path {fill: var(--color-primario-bands)}
						}
					}
				}
			}
		}

		.botones {
			background-color: rgba(255, 255, 255, .1);
			display: flex;
			justify-content: flex-end;
			width: calc(100% + 1em);
			// margin: 0 -.5em -2em;
			.comprar {
				background-color: var(--color-primario-fans);
				color: var(--color-fondo-light);
				padding: .4em .5em;
				border-radius: .5em;
				margin: 0 .5em .5em 0;
				cursor: pointer;
			}
		}
	}

	@media (min-width: 768px) {
		margin: 0 auto 1em;
		max-width: 400px;
		.botones {
			margin: 0 -.5em -2em;
		}
	}
}
</style>