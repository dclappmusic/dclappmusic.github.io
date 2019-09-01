<template>
    <div class="page maps" data-page="maps">
       <h1 class="cabecera">MAP</h1>
       <div class="google-map" id="map"></div>
    </div>
</template>

<script>
// import firebase from "firebase";
import MarkerClusterer from '@google/markerclusterer';
import gmapsInit from '../utils/gmaps';

export default {
    name: 'Map',
    props:["geolocation", "shows"],
    components: {},
    data() {
        return {
            // shows: []
        }
    },
    async mounted() {
        try {
            const google = await gmapsInit();

            var map = new google.maps.Map(
                 document.getElementById('map'), {
                    zoom: 14,
                    center: {lat: this.geolocation.latitud, lng: this.geolocation.longitud},

            });
            this.shows.forEach(show => {
                var marker = new google.maps.Marker({
                    position: {lat: show.lat, lng: show.lon},
                    label: show.band,
                    map: map,
                    icon: 'images/pin_liveshow.png'
                });
                // new google.maps.Marker({
                //     position: {lat: show.lat, lng: show.lon},
                //     label: show.band
                // });
            });
    // Add a marker clusterer to manage the markers.
        // var markerCluster = new MarkerClusterer(map, markers,
        //         {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
        } catch (error) {
            console.error(error);
        }
    }
}
</script>
<style lang="scss" >
    .maps {
        .cabecera {color: $primario; margin-bottom: 5%;}
        #map {
            width: 100vw;
            height: 85vh;
        }
    }
</style>
