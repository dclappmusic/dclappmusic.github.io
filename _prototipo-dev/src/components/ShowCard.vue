<template>
<div class="show" @click="ampliar" :class="{open: ampliado}">
    <p v-if="type==='list_soon'" class="display-sm soon">{{this.$moment(show.timestamp).format("D/MM")}}</p>
    <p class="hora">{{this.$moment(show.timestamp).format("HH:mm")}}</p>
    
    <div class="caja">
        <div class="primera_fila">
            <img class="foto" :src="show.image">
            <div class="datos_principales">
                <router-link class="banda" :to='{ name: "sub", params: {from: "agenda", sub_page: "sub_profile_band", id: show.band_id }}'>
                    <p class="display-med">{{show.band}}</p>
                </router-link>
                <div class="segunda">
                    <router-link class="sala" :to='{ name: "sub", params: {from: "agenda", sub_page: "sub_profile_venue", id: show.venue_id }}'>
                        <p class="parr-sm">{{show.venue}}</p>
                    </router-link>
                    <p class="tipo parr-sm">{{show.show_type}}</p>
                    <p class="precio parr-sm">{{show.price > 0 ? show.price + "€" : "GRATIS"}}</p>
                </div>
            </div>
        </div>
        <div class="segunda_fila" v-if="ampliado">
            <a class="boton-sm" :href="show.link">comprar entradas</a>
        </div>
    </div>
</div>
</template>

<script>

export default {
    name: 'ShowCard',
    props:["show", "type"],
    data() {
        return {
            show_form: false,
            ampliado: false
        }
    },
    created() {
    },
    mounted() {

    },
    methods: {
        ampliar() {
            // $(".show").removeClass("open");
            this.ampliado = !this.ampliado;
        },
    }
}
</script>
<style scoped lang="scss" > 
    .show {
        position: relative;
        display: block;
        align-items: center;
        width: 100%;
        margin: 0 auto 1em;
        &.mapa.open {
            .caja {
                background-color: var(--color_secundario);
            }
        }

        &.open {
            .caja {
                background-color: #333; color: white;
                a {pointer-events: unset;}
            }
        }
        .hora {
            position: relative;
            transform: rotate(-90deg);
            transform-origin: top;
            display: inline-block;
            width: 10%;
            color: #333;
            font-weight: bold;
            font-size: 1.2em;
            margin-left: -5%;
            top: -30px;
        }
        .caja {
            position: relative;
            display: inline-block;
            width: 90%;
            background-color: var(--color_fondo);
            color: #333;
            padding: 1em .5em;
            border-radius: .5em;
            a {pointer-events: none;}
            .primera_fila {
                display: flex;
                width: 100%;
                height: 5em;
                .foto {
                    // width: 20vw;
                    // height: 20vw;
                    width: 75px;
                    height: 75px;
                    object-fit: cover;
                    margin-right: 10px;
                    border-radius: 50%;
                    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.45);
                }
                .datos_principales {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    align-items: center;
                    justify-content: center;
                    
                    .banda {width: 100%; margin-bottom: .5em;}
                    .segunda {
                        width: 100%;
                        display: flex;
                        text-align: center;
                        .parr-sm:not(:first-child) {margin: 0 .5em;}
                        .sala {
                            display: flex; 
                            justify-content: flex-start;
                            margin-right: .5em; 
                            max-width: 50%;
                            .parr-sm {text-align: left;}
                            &:before {
                                content: "";
                                background-image: url("/images/pin_liveshow.png");
                                width: 1em;
                                height: 1em;
                                background-size: contain;
                                background-repeat: no-repeat;
                            }
                        }
                        .precio {display: inline-block; margin-right: .5em;}
                    }
                }
            }
        }
    }
</style>
