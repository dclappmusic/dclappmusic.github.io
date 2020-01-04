<template>
    <div class="page maps" data-page="maps">
        <MglMap 
            :accessToken="accessToken" 
            :mapStyle="mapStyle"
            :center="[geolocation.longitud, geolocation.latitud]"
            :zoom="12"
            @load="onMapLoaded"
            :attributionControl="false"
        >
            <MglGeolocateControl 
                position="top-left" 
                :trackUserLocation="true"
            />
            <MglMarker v-for="(show, index) in shows_hoy" :key="index"
                :coordinates="[show.lon, show.lat]"
                :anchor="'bottom'"
                @click="fly_to(show)"
            >
                <div slot="marker" class="marker" :class="{live: show.live}">
                    <div v-if="show.live" class="pin live">
                        <svg width="21" height="30" viewBox="0 0 21 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.8369 14.5078C20.371 13.2509 20.6666 11.8667 20.6666 10.4129C20.6666 4.662 16.0402 0 10.3333 0C4.62638 0 0 4.662 0 10.4129C0 11.8667 0.295651 13.2509 0.82967 14.5078H0.696732L8.30735 28.8994C9.07669 30.3542 11.155 30.37 11.9463 28.927L18.9301 16.1924C19.2516 15.7078 19.5338 15.1944 19.7722 14.6569L19.854 14.5078H19.8369Z" fill="#0C3847"/>
                        </svg>
                    </div>
                    <div v-else class="pin">
                        <span class="small">{{$moment(show.timestamp).format("HH:mm")}}</span>
                        <svg width="22" height="32" viewBox="0 0 22 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.197 15.04C20.7138 13.8236 21 12.484 21 11.077C21 5.51162 16.5228 1 11 1C5.47715 1 1 5.51162 1 11.077C1 12.484 1.28615 13.8236 1.80301 15.04H1.67424L9.03937 28.9674C9.78389 30.3753 11.7952 30.3906 12.561 28.9942L19.3201 16.6693C19.6308 16.2008 19.9036 15.7046 20.134 15.1851L20.2136 15.04H20.197Z" fill="#0C3847" fill-opacity="0.25"/>
                            <path d="M20.197 15.04L19.2766 14.649L18.6856 16.04H20.197V15.04ZM1.80301 15.04V16.04H3.31443L2.72337 14.649L1.80301 15.04ZM1.67424 15.04V14.04H0.0141938L0.790232 15.5075L1.67424 15.04ZM9.03937 28.9674L9.92337 28.5H9.92337L9.03937 28.9674ZM12.561 28.9942L11.6842 28.5133L12.561 28.9942ZM19.3201 16.6693L18.4867 16.1165L18.4635 16.1516L18.4433 16.1884L19.3201 16.6693ZM20.134 15.1851L19.2572 14.7043L19.237 14.7412L19.2199 14.7796L20.134 15.1851ZM20.2136 15.04L21.0904 15.5209L21.9025 14.04H20.2136V15.04ZM20 11.077C20 12.3473 19.7418 13.5541 19.2766 14.649L21.1174 15.4311C21.6859 14.0931 22 12.6206 22 11.077H20ZM11 2C15.9633 2 20 6.05666 20 11.077H22C22 4.96658 17.0823 0 11 0V2ZM2 11.077C2 6.05666 6.03665 2 11 2V0C4.91765 0 0 4.96658 0 11.077H2ZM2.72337 14.649C2.25817 13.5541 2 12.3473 2 11.077H0C0 12.6206 0.314137 14.0931 0.882643 15.4311L2.72337 14.649ZM1.80301 14.04H1.67424V16.04H1.80301V14.04ZM0.790232 15.5075L8.15537 29.4349L9.92337 28.5L2.55824 14.5726L0.790232 15.5075ZM8.15537 29.4349C9.27215 31.5468 12.2891 31.5696 13.4378 29.475L11.6842 28.5133C11.3013 29.2115 10.2956 29.2039 9.92337 28.5L8.15537 29.4349ZM13.4378 29.475L20.1969 17.1501L18.4433 16.1884L11.6842 28.5133L13.4378 29.475ZM19.2199 14.7796C19.0124 15.2474 18.7667 15.6944 18.4867 16.1165L20.1535 17.222C20.4949 16.7071 20.7948 16.1617 21.0481 15.5906L19.2199 14.7796ZM21.0108 15.666L21.0904 15.5209L19.3368 14.5592L19.2572 14.7043L21.0108 15.666ZM20.2136 14.04H20.197V16.04H20.2136V14.04Z" fill="#0C3847"/>
                        </svg>
                    </div>
                </div>
                <MglPopup :closeButton="false">
                    <ShowCard :show="show" class="mapa open" :class="{live: show.live}" :from="'mapa'"/>
                </MglPopup>
            </MglMarker>
        </MglMap>
    </div>
</template>

<script>
import ShowCard from '@/components/ShowCard';
// import Mapbox from "mapbox-gl";
import { 
    MglMap, 
    MglPopup,
    MglNavigationControl,
    MglGeolocateControl, 
    MglMarker 
    } from "vue-mapbox";
import { mapState } from 'vuex';

export default {
    name: 'agendaMap',
    props: ["geolocation"],
    components: {
        MglMap,
        MglNavigationControl,
        MglGeolocateControl,
        MglPopup,
        MglMarker,
        ShowCard
    },
    data() {
        return {
            accessToken: "pk.eyJ1IjoiamFwaW1lcyIsImEiOiJjazF3cWdma2QwNDZwM2VxdGpldDQxZWlwIn0.NXdh9SyvQKYtfDyIKGy-ZQ",
            mapStyle: "mapbox://styles/japimes/ck46x3e5u3ac31dt6ricaqy5d",
            maps: {},
            shows_hoy: []
        }
    },
    computed: {
        ...mapState([
            "shows"
        ])
    },
    created() {
        // this.map = null;
    },
    mounted() {
        console.log(this.geolocation.latitud + ", " + this.geolocation.longitud);
        this.filter_shows_today();
    },
    methods: {
        onMapLoaded(event) {
            this.map = event.map;
        },
        fly_to(show) {
            this.map.easeTo({
                center: {lng: show.lon, lat: show.lat},
                duration: 800
            });
        },
        filter_shows_today: function() {
            var hoy = this.$moment();
            this.shows.forEach(show => {
                var show_time = this.$moment(show.timestamp);
                var diff = show_time.diff(hoy, 'hours');
                if (diff > -2 && diff < 16 ) {
                    diff > -1 && diff < 1 ? show.live = true : show.live = false;
                    this.shows_hoy.push(show);
                }
            });
        }
    }
}
</script>
<style scoped lang="scss">
.page.maps {
    #map {
        width: 100vw;
        height: 100vh;
    }
    .marker {
        cursor: pointer;
        .pin:not(.live) {
            // svg path {fill: red}
            display: flex;
            flex-direction: column;
            align-items: center;
            color: var(--color_secundario);
            font-weight: bold;
        }
    }
    &::v-deep .mapboxgl-popup {
        max-width: 75vw!important;
        .mapboxgl-popup-tip {border-top-color: var(--color_secundario);}
        .mapboxgl-popup-content {
            background-color: var(--color_secundario);
            border-radius: 10px;
            padding: 5% 0;
            .hora {color: white;}
        }
    }
    &::v-deep .mapboxgl-canvas:before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-attachment: rgba(255,0,0,.5);
    }
    
}
</style>
