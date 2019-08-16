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
    props:[],
    components: {},
    data() {
        return {
            shows: []
        }
    },
    async mounted() {
        try {
            const google = await gmapsInit();
            var uluru = {lat: -25.344, lng: 131.036};
            var map = new google.maps.Map(
                 document.getElementById('map'), {zoom: 4, center: uluru});
            var marker = new google.maps.Marker({position: uluru, map: map});
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
            height: 100vh;
        }
    }
</style>
