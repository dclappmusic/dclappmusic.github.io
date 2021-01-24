<template>
<div class="show" @click="ampliar" :class="{open: ampliado, live: show.live, highlight: show.highlight}">
    <p v-if="type==='list_soon'" class="display-sm soon">{{this.$moment(show.timestamp).format("DD/MM")}}</p>
    <p class="parrafo-sm hora">{{this.$moment(show.timestamp).format("HH:mm")}}</p>
    <div class="caja">
        <svg @click="sharePic(show)" class="icon_share" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4689 5.2687C14.4689 6.22927 13.6902 7.00798 12.7297 7.00798C12.2993 7.00798 11.9054 6.85166 11.6017 6.59269L8.06093 9.11233C8.14061 9.31177 8.18444 9.52942 8.18444 9.75729C8.18444 10.0158 8.12804 10.2611 8.02688 10.4817L11.5082 13.0077C11.8222 12.6979 12.2536 12.5066 12.7297 12.5066C13.6902 12.5066 14.4689 13.2853 14.4689 14.2459C14.4689 15.2065 13.6902 15.9852 12.7297 15.9852C11.7691 15.9852 10.9904 15.2065 10.9904 14.2459C10.9904 14.0002 11.0413 13.7663 11.1333 13.5543L7.64099 11.0203C7.32929 11.3155 6.90837 11.4966 6.44516 11.4966C5.48458 11.4966 4.70588 10.7179 4.70588 9.75729C4.70588 8.79672 5.48458 8.01802 6.44516 8.01802C6.93919 8.01802 7.38511 8.22399 7.70173 8.55475L11.1877 6.07412C11.0617 5.83332 10.9904 5.55933 10.9904 5.2687C10.9904 4.30812 11.7691 3.52942 12.7297 3.52942C13.6902 3.52942 14.4689 4.30812 14.4689 5.2687Z" fill="#333333"/>
        </svg>

        <div class="primera_fila">
            <div class="foto_container" v-if="getBand(show.band_id)">
                <p v-if="show.live" class="label_live small">live</p>
                <img class="foto" :src="getBand(show.band_id).image ? getBand(show.band_id).image : 'images/avatar_placeholder.jpg'">
            </div>
            <div class="datos_principales">
                <div class="banda">
                <router-link class="banda" :to='{ name: "sub", params: {from: "agenda", sub_page: "sub_profile_band", id: show.band_id }}'>
                    <p class="display-med">{{show.band ? show.band : ''}}</p>
                </router-link>
                </div>
                <div class="segunda">
                    <p class="tipo parrafo">{{getBand(show.band_id).estilo ? getBand(show.band_id).estilo : ''}}</p>
                    <p class="precio parr-sm">{{show.price > 0 ? show.price + "€" : "GRATIS"}}</p>
                </div>
                <div class="segunda">
                    <router-link class="sala" :to='{ name: "sub", params: {from: "agenda", sub_page: "sub_profile_venue", id: show.venue_id }}'>
                        <p class="parrafo">{{show.festival ? show.festival : ''}}</p>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="segunda_fila" >
            <a v-if="show.link" class="boton-sm comprar" :href="show.link" target="blank">{{show.live ? 'Ver concierto' : 'Ir a la página'}}</a>
        </div>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'ShowCard',
    props:["show", "type", "from"],
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
    created() {
    },
    mounted() {

    },
    methods: {
        ampliar() {
            document.querySelectorAll(".show").removeClass("open");
            this.ampliado = !this.ampliado;
        },
        getBand(id) {
            let band = this.bands.find( band => band.id === id );
            return band;
        },
        sharePic(show) {
            console.log(show);
            navigator.share({
                'title': 'Concierto en "directo"',
                'text': 'Creo que este concierto de ' + show.band + ' te puede gustar.',
                'url': 'https://weclapp.live/agenda?showid=' + show.show_id
            }).then(function() {
                console.log('Successful share');
            }).catch(function(error) {
                console.log('Error sharing:', error)
            });
        },
    }
}
</script>
<style scoped lang="scss" > 
    .show {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        width: 100%;
        margin: 0 auto 1em;
        &.live {
            .hora {
                 color: var(--color_primario);
            }
            .label_live {
                position: absolute;
                top: -15%;
                left: 0;
                background-color: var(--color_primario);
                color: white;
                z-index: 10;
                padding: .3em 1em;
                border-radius: 2em;
                box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.15);
            }
            // .caja {
            //     background-color: var(--color_primario);
            //     // width: 100%;
            //     // padding-top: 1em;
            //     .segunda_fila .comprar {
            //         color: var(--color_primario);
            //         background-color: white;
            //     }
            // }
        }
        &.highlight {
            .caja {
                background-color: var(--color_primario);
                // width: 100%;
                padding-top: 1em;
                .segunda_fila .comprar {
                    color: var(--color_primario);
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
                background-color: #333; color: white;
                a {pointer-events: unset;}
                .primera_fila .datos_principales .segunda .sala:before {
                    background-image: url("../../public/images/pin_liveshow_white.png");
                }
            }
        }
        .soon {
            margin-right: 100%;
        }
        .hora {
            position: relative;
            display: inline-block;
            transform: rotate(-90deg);
            transform-origin: top;
            width: 13%;
            color: #333;
            font-weight: bold;
            font-size: 1.2em;
            margin-left: -10%;
            // top: -15px;
        }
        .caja {
            position: relative;
            display: inline-block;
            width: 95%;
            background-color: var(--color_fondo);
            color: #333;
            padding: 2em .5em;
            border-radius: .5em;
            // a {pointer-events: none;}
            .icon_share {
                display: none;
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
                    width: 30%;
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
                    
                    .banda {width: 100%; margin-bottom: .5em;}
                    .segunda {
                        width: 100%;
                        display: flex;
                        text-align: left;
                        // .parr-sm:not(:first-child) {margin: 0 .5em;}
                        .sala {
                            display: flex; 
                            justify-content: flex-start;
                            margin-right: .5em; 
                            max-width: 100%;
                            font-weight: 600;
                            margin-top: .5em;
                            .parrafo-sm {text-align: left; width: fit-content;}
                            &:before {
                                content: "";
                                background-image: url("../../public/images/pin_liveshow.png");
                                width: 1em;
                                height: 1em;
                                background-size: contain;
                                background-repeat: no-repeat;
                            }
                        }
                        .precio {margin-left: .5em;}
                        // .precio {margin-right: .5em;}
                    }
                }
            }
            .segunda_fila {
                background-color: rgba(255,255,255,.1);
                display: flex;
                justify-content: flex-end;
                width: calc(100% + 1em);
                margin: 0 -.5em -2em;
                .comprar {
                    background-color: var(--color_primario);
                    color: var(--color_fondo);
                    padding: .4em .5em;
                    border-radius: .5em;
                    margin: .5em .5em .5em 0;
                    cursor: pointer;
                }
            }
        }
        @media (max-width:768px) {
           .icon_share {display: block!important;}
           margin: 0 0 1em .5em;
        }
    }
</style>
