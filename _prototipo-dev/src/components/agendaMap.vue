<template>
    <div class="page maps" data-page="maps">
        <MglMap 
            :accessToken="accessToken" 
            :mapStyle="mapStyle"
            :center="[this.geolocation.longitud, this.geolocation.latitud]"
            @load="onMapLoaded"
        >
            <!-- <MglPopup v-for="(show, index) in shows" :key="index"
                 :coordinates="[show.lon, show.lat]">
                <span>Hello world!</span>
            </MglPopup> -->
            <MglMarker v-for="(show, index) in shows" :key="index"
                :coordinates="[show.lon, show.lat]" 
                :color="red"
            >
                <div slot="marker" class="marker"></div>
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
            mapStyle: "mapbox://styles/mapbox/streets-v11"
        }
    },
    created() {
        this.map = null;
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
        onMapLoaded() {
            this.map = event.map;
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
    #marker {
        // background-image: url('images/pin_liveshow.png');
        background-size: cover;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
    }
}
</style>
