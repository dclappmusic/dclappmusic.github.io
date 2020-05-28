<template>
    <div class="page agenda" data-page="agenda">
        <!-- <get-geolocation @geolocationError="geolocationError" :findLocation="findLocation"/> -->
        <div class="cabecera">
            <h1 class="titulo">Agenda de conciertos streaming</h1>

            <a href="https://weclapp.live/" target="blank" class="logo">
                <img src="images/icon_completo.png" />
            </a>
            <router-link class="display-med subir" to="/subirShow">subir show</router-link>
            <!-- <p class="display-med filtros" @click="filters = true">filtros</p> -->
            <keep-alive>
                <AgendaFilters v-if="filters" @filters_popup="filters = false" @filtering="filtering"/>
            </keep-alive>
            <!-- <p v-if="!map" class="display-med mapa" :class="{'active': !map}"  @click="map = !map">mapa</p>
            <p v-else class="display-med lista" :class="{'active': map}" @click="map = !map">lista</p> -->
        </div>
        <div class="view" v-if="shows[0]">
            <keep-alive v-if="map">
                <!-- <agendaMap :shows="shows_filtered" /> -->
            </keep-alive>
            <keep-alive v-else>
                <agendaList :shows="shows_filtered" />
            </keep-alive>
        </div>
        <div class="spinner" :class="{active: !shows[0]}">
            <p class="display-sm">Bienvenido a weclapp</p>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
// import GetGeolocation from '@/components/GetGeolocation';
// import agendaMap from '@/components/agendaMap';
import agendaList from "@/components/agendaList";
// import ModalSubirShow from "@/components/ModalSubirShow";
import AgendaFilters from "@/components/AgendaFilters";
import axios from 'axios';

export default {
    name: 'Agenda',
    props: [],
    components: {
        agendaList, 
        // agendaMap,
        AgendaFilters,
        // ModalSubirShow
        // GetGeolocation
    },
    data() {
        return {
            map: false,
            // accessToken: "pk.eyJ1IjoiamFwaW1lcyIsImEiOiJjazF3cWdma2QwNDZwM2VxdGpldDQxZWlwIn0.NXdh9SyvQKYtfDyIKGy-ZQ",
            city: null,
            filters: false,
            shows_filtered: [],
            findLocation: false,
            subir_show: false
        }
    },
    computed: {
        ...mapState([
            "geolocation", "shows"
        ]),
    },
    watch: {
        geolocation: function() {
            // this.getCity();
        },
        shows_filtered: function() {
            
        },
        shows() {
            this.shows_filtered = [...this.shows];
        }
    },
    created() {
        this.shows_filtered = [...this.shows];
        // if (this.geolocation.lat) {
        //     this.getCity();
        // }
    },
    mounted() {
    },
    methods: {
        getCity: function() {
            let call = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + this.geolocation.lon +  "," + this.geolocation.lat + ".json?access_token=" + this.accessToken;
            axios
                .get(call)
                .then((response) => {
                    this.city = response.data.features[3].text;
                    this.$store.commit("updateCity", this.city);
                })
        },
        filtering(new_filters) {
            console.log(new_filters.tipo);
            console.log(new_filters.price);
            if (new_filters.price === 50) {new_filters.price = 500;}
            this.shows_filtered = this.shows.filter(show => (new_filters.tipo.includes(show.show_type)) && (new_filters.price >= show.price));
            console.log(this.shows_filtered);

        },
        geolocationError(error) {
            // alert(error);
        }
    }
}
</script>
<style scoped lang="scss">
    .agenda {
        .cabecera {
            position: absolute;
            padding: 0 15px;
            .logo {
                position: fixed;
                top: 15px;
                right: 15px;
                img {
                    width: 2em;
                    border-radius: 10px;
                    box-shadow: 0 0 15px rgba(0,0,0,.15);
                }
            }
            .titulo {
                max-width: calc(100% - 2em);
                text-align: left;
            }
            .display-med {
                &.active {
                    background-color: white;
                    color: var(--color_primario);
                    padding: .3em;
                    border-radius: 5em;
                    position: absolute;
                    right: 10px;
                    top: 0;
                    font-size: .6em;
                    width: 25%;
                    &.mapa {
                        background-color: var(--color_primario);
                        color: white;
                    }
                }
                &.filtros {
                    position: absolute;
                    width: 25%;
                    top: 0;
                    left: 10px;
                    font-size: .6em;
                    background-color: white;
                    color: var(--color_primario);
                    padding: .3em;
                    border-radius: 5em;
                }
            }
        }
        .spinner {
            // display: none;
            opacity: .8;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 0;
            background: var(--color_primario);
            // display: flex;
            align-items: center;
            justify-content: center;
            transition: all .5s ease-in-out;
            &.active {
                display: flex;
                opacity: 1;
                height: 100vh;
                .display-sm {display: initial;}
                // transition: all 1s ease-in-out;
            }
            .display-sm {
                color: white;
                text-align: center;
                display: none;
            }
        }
        @media (max-width:768px) {
            .cabecera {
                .titulo {font-size: 6vw;}
            }
        }
    }
</style>
