<template>
    <div class="page agenda" data-page="agenda">
        <get-geolocation />
        <div class="cabecera">
            <!-- <h1 class="titulo">AGENDA</h1> -->
            <p class="display-med filtros" @click="filters = true">filtros</p>
            <keep-alive>
                <AgendaFilters v-if="filters" @filters_popup="filters = false" @filtering="filtering"/>
            </keep-alive>
            <p v-if="!map" class="display-med mapa" :class="{'active': !map}"  @click="map = !map">mapa</p>
            <p v-else class="display-med lista" :class="{'active': map}" @click="map = false">lista</p>
        </div>
        <div class="view" v-if="geolocation.lat && shows[0]">
            <keep-alive v-if="map && city">
                <agendaMap :shows="shows_filtered" />
            </keep-alive>
            <keep-alive v-else>
                <agendaList :shows="shows_filtered" />
            </keep-alive>
        </div>
        <div v-else class="spinner">loading</div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import GetGeolocation from '@/components/GetGeolocation';
import agendaMap from '@/components/agendaMap';
import agendaList from "@/components/agendaList";
import AgendaFilters from "@/components/AgendaFilters";
import axios from 'axios';

export default {
    name: 'Agenda',
    props: [],
    components: {
        agendaList, 
        agendaMap,
        AgendaFilters,
        GetGeolocation
    },
    data() {
        return {
            map: true,
            accessToken: "pk.eyJ1IjoiamFwaW1lcyIsImEiOiJjazF3cWdma2QwNDZwM2VxdGpldDQxZWlwIn0.NXdh9SyvQKYtfDyIKGy-ZQ",
            city: null,
            filters: false,
            shows_filtered: []
        }
    },
    computed: {
        ...mapState([
            "geolocation", "shows"
        ]),
    },
    watch: {
        geolocation: function() {
            this.getCity();
        },
        shows_filtered: function() {
            
        }
    },
    created() {
        this.shows_filtered = this.shows;
        if (this.geolocation.lat) {
            this.getCity();
        }
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

        }
    }
}
</script>
<style scoped lang="scss">
    .agenda {
        .cabecera {
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
            position: fixed;
            top: 0;
            left: 0;
            width: 100vh;
            height: 100vh;
            background: rgba(0,0,0,.5);
        }
    }
</style>
