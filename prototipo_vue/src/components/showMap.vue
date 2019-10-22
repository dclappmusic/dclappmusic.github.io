<template>
    <div class="page maps" data-page="maps">
       <!-- <h1 class="cabecera">MAP</h1> -->
       <div id="map"></div>
    </div>
</template>

<script>
// import firebase from "firebase";
// import MarkerClusterer from '@google/markerclusterer';
// import gmapsInit from '../utils/gmaps';

export default {
    name: 'showMap',
    props: ["geolocation", "shows"],
    components: {},
    data() {
        return {
            // shows: []
        }
    },
    created() {
        
    },
    mounted() {
        console.log(this.geolocation.latitud + ", " + this.geolocation.longitud);
        mapboxgl.accessToken = 'pk.eyJ1IjoiamFwaW1lcyIsImEiOiJjazF3cWdma2QwNDZwM2VxdGpldDQxZWlwIn0.NXdh9SyvQKYtfDyIKGy-ZQ';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11', 
            center: [this.geolocation.longitud, this.geolocation.latitud], 
            zoom: 12 
        });
        this.shows.forEach(show => {
            var el = document.createElement('div');
            el.className = 'marker';
            // create the marker
            new mapboxgl.Marker()
                .setLngLat([show.lon, show.lat])
                .setPopup(new mapboxgl.Popup({ offset: 25, className: 'show_popup'})
                    .setHTML("<h1>" + show.band +"</h1>"))
                .addTo(map);
        });
    }
}
</script>
<style lang="scss" >
    // .maps {
        #map {
            width: 100vw;
            height: 100vh;
            // z-index: -2;
        }
        #marker {
            // background-image: url('images/pin_liveshow.png');
            background-size: cover;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
        }
    // }
</style>
