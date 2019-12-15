<template>
    <div class="page maps" data-page="maps">
        <MglMap 
            :accessToken="accessToken" 
            :mapStyle="mapStyle"
            :center="[geolocation.longitud, geolocation.latitud]"
            :zoom="12"
            @load="onMapLoaded"
        >
            <!-- <MglPopup v-for="(show, index) in shows" :key="index"
                 :coordinates="[show.lon, show.lat]">
                <span>Hello world!</span>
            </MglPopup> -->
            <MglMarker v-for="(show, index) in shows" :key="index"
                :coordinates="[show.lon, show.lat]"
                :anchor="'bottom'"
                @click="fly_to(show)"
            >
                <div slot="marker" class="marker">
                    <div class="pin">
                        <svg width="21" height="30" viewBox="0 0 21 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.8369 14.5078C20.371 13.2509 20.6666 11.8667 20.6666 10.4129C20.6666 4.662 16.0402 0 10.3333 0C4.62638 0 0 4.662 0 10.4129C0 11.8667 0.295651 13.2509 0.82967 14.5078H0.696732L8.30735 28.8994C9.07669 30.3542 11.155 30.37 11.9463 28.927L18.9301 16.1924C19.2516 15.7078 19.5338 15.1944 19.7722 14.6569L19.854 14.5078H19.8369Z" fill="#0C3847"/>
                        </svg>
                    </div>
                </div>
                <MglPopup :closeButton="false">
                    <ShowCard :show="show" class="mapa open" />
                </MglPopup>
            </MglMarker>
        </MglMap>
    </div>
</template>

<script>
import ShowCard from '@/components/ShowCard';
import Mapbox from "mapbox-gl";
import { MglMap, MglPopup,MglNavigationControl, MglGeolocateControl, MglMarker } from "vue-mapbox";

export default {
    name: 'agendaMap',
    props: ["geolocation", "shows"],
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
            // shows: []
            accessToken: "pk.eyJ1IjoiamFwaW1lcyIsImEiOiJjazF3cWdma2QwNDZwM2VxdGpldDQxZWlwIn0.NXdh9SyvQKYtfDyIKGy-ZQ",
            mapStyle: "mapbox://styles/japimes/ck46x3e5u3ac31dt6ricaqy5d",
            maps: {}
            // centro: [geolocation.longitud, geolocation.latitud]
        }
    },
    created() {
        // this.map = null;
    },
    mounted() {
        console.log(this.geolocation.latitud + ", " + this.geolocation.longitud);
        // mapboxgl.accessToken = 'pk.eyJ1IjoiamFwaW1lcyIsImEiOiJjazF3cWdma2QwNDZwM2VxdGpldDQxZWlwIn0.NXdh9SyvQKYtfDyIKGy-ZQ';
        // var map = new mapboxgl.Map({
        //     container: 'map',
        //     // style: 'mapbox://styles/mapbox/streets-v11', 
        //     center: [this.geolocation.longitud, this.geolocation.latitud], 
        //     zoom: 12 
        // });
        
        // this.shows.forEach(show => {
        //     var el = document.createElement('div');
        //     el.className = 'marker';
        //     // create the marker
        //     new mapboxgl.Marker()
        //         .setLngLat([show.lon, show.lat])
        //         .setPopup(new mapboxgl.Popup({ offset: 25, className: 'show_popup'})
        //             .setHTML("<h1>" + show.band +"</h1>"))
        //         .addTo(map);
        // });
    },
    methods: {
        onMapLoaded(event) {
            this.map = event.map;
        },
        fly_to(show) {
            // const lonlat = [show.lon, show.lat];
            // console.log(lonlat);
            this.map.easeTo({
                center: {lng: show.lon, lat: show.lat},
                duration: 800
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
    }
    &::v-deep .mapboxgl-popup {
        .mapboxgl-popup-tip {border-top-color: var(--color_secundario);}
        .mapboxgl-popup-content {
            background-color: var(--color_secundario);
            border-radius: 10px;
            padding: 0;
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
