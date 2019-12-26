<template>
<div class="show" @click="ampliar" :class="{open: ampliado}">
    <p class="hora">{{this.$moment(show.timestamp).format("HH:mm")}}</p>
    <div class="caja">
        <div class="primera_fila">
            <img class="foto" :src="show.image">
            <div class="datos_principales">
                <router-link class="banda" :to='{ name: "sub", params: {from: "agenda", sub_page: "sub_profile_band", id: show.band_id }}'>
                    <p class="display-med">{{show.band}}</p>
                </router-link>
                <div class="segunda">
                    <!-- <router-link class="sala" :to='{ name: "sub", params: {from: "agenda", sub_page: "sub_profile_venue", id: show.venue_id }}'> -->
                        <p class="parr-sm">{{show.venue}}</p>
                    <!-- </router-link> -->
                    <p class="tipo parr-sm">{{show.show_type}}</p>
                    <p class="precio parr-sm">{{show.price}}€</p>
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
    props:["show"],
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
        get_band: function(id) {

        }
    }
}
</script>
<style scoped lang="scss" > 
    .show {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        margin: 0 auto 1em;
        &.mapa.open {
            .caja {
                background-color: var(--color_secundario);
            }
        }

        &.open {
            .caja {background-color: #333; color: white;}
        }
        .hora {
            width: 10%;
            transform: rotate(-90deg);
            transform-origin: top;
            color: #333;
            font-weight: bold;
            font-size: 1.2em;
        }
        .caja {
            position: relative;
            width: 90%;
            background-color: var(--color_fondo);
            color: #333;
            padding: 1em;
            border-radius: .5em;
            .primera_fila {
                display: flex;
                width: 100%;
                height: 5em;
                .foto {
                    width: 20vw;
                    height: 20vw;
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
                        .parr-sm:not(:first-child) {margin: 0 .5em;}
                        .sala {display: inline-block; margin-right: 1em;}
                        .precio {display: inline-block; margin-right: 1em;}
                    }
                }
            }
        }
    }
</style>
