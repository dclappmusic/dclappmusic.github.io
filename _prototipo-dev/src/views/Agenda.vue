<template>
    <div class="page agenda" data-page="agenda">
       <div class="cabecera">
            <!-- <h1 class="titulo">AGENDA</h1> -->
            <p v-if="!map" class="display-med mapa" :class="{'active': !map}"  @click="map = !map">mapa</p>
            <p v-else class="display-med lista" :class="{'active': map}" @click="map = false">lista</p>
       </div>
       <div class="view">
           <agendaMap
                v-if="map"
                :geolocation="geolocation"
            />
            <agendaList
                v-else
                :geolocation="geolocation"
            />
       </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import agendaMap from '@/components/agendaMap';
import agendaList from "@/components/agendaList";
import axios from 'axios';

export default {
    name: 'Agenda',
    props: [],
    components: {
        agendaList, 
        agendaMap
    },
    data() {
        return {
            map: true,
            accessToken: "pk.eyJ1IjoiamFwaW1lcyIsImEiOiJjazF3cWdma2QwNDZwM2VxdGpldDQxZWlwIn0.NXdh9SyvQKYtfDyIKGy-ZQ",
            city: null
        }
    },
    computed: {
        ...mapState([
            "geolocation"
        ]),
    },
    watch: {
        geolocation: function() {
            this.getCity();
        }
    },
    created() {
    },
    mounted() {
        if (this.geolocation.latitud) {
            this.getCity();
        }
    },
    methods: {
        getCity: function() {
            let call = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + this.geolocation.longitud +  "," + this.geolocation.latitud + ".json?access_token=" + this.accessToken;
            axios
                .get(call)
                .then((response) => {
                    this.city = response.data.features[3].text;
                    this.$store.commit("updateCity", this.city);
                })
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
            }
        }
    }
</style>
