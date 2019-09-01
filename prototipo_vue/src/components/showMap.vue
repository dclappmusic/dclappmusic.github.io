<template>
    <div class="page maps" data-page="maps">
       <!-- <h1 class="cabecera">MAP</h1> -->
       <div class="google-map" id="map"></div>
    </div>
</template>

<script>
// import firebase from "firebase";
import MarkerClusterer from '@google/markerclusterer';
import gmapsInit from '../utils/gmaps';

export default {
    name: 'showMap',
    props: ["geolocation", "shows"],
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
                    disableDefaultUI: true
            });
            this.shows.forEach(show => {
                var infowindow = new google.maps.InfoWindow({
                    content: '<div class="info">' + show.sala + ", " + show.ciudad + "</div>"
                });
                var marker = new google.maps.Marker({
                    position: {lat: show.lat, lng: show.lon},
                    label: show.band,
                    map: map,
                    icon: 'images/pin_liveshow.png',
                    animation: google.maps.Animation.DROP
                });
                marker.addListener('click', function() {
                    infowindow.open(map, marker);
                });
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
        #map {
            width: 100vw;
            height: 100vh;
            // z-index: -2;
        }
    }
</style>
