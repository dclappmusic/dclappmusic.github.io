<template>
<div class="show" @click="ampliar" :class="{open: ampliado}">
    <p class="hora">{{show.hora || "20:30"}}</p>
    <div class="caja">
        <div class="primera_fila">
            <img class="foto" src="images/avatar_base.png">
            <div class="datos_principales">
                <router-link class="banda" :to='{ name: "sub", params: {from: "agenda", sub_page: "sub_profile_band", id: show.band_id }}'>
                    <p class="display-med">{{show.band}}</p>
                </router-link>
                <!-- <router-link class="sala" :to='{ name: "sub", params: {from: "agenda", sub_page: "sub_profile_venue", id: show.venue_id }}'> -->
                    <p class="parr-sm">{{show.sala}}</p>
                <!-- </router-link> -->
                <p class="precio parr-sm">{{show.precio}}€</p>
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
            width: 90%;
            background-color: var(--color_fondo);
            color: #333;
            padding: 1em;
            border-radius: .5em;
            .primera_fila {
                display: flex;
                .datos_principales {
                    // display: flex;
                    .banda {width: 100%;}
                    .sala {display: inline-block; margin-right: 1em;}
                    .precio {display: inline-block; margin-right: 1em;}
                }
            }
            .foto {
                width: 25%;
                margin-right: 10px;
                border-radius: 87px;
                box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.45);
            }
        }
    }
</style>
