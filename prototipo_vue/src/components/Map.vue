<template>
    <div class="page maps" data-page="maps">
       <h1 class="cabecera">MAP</h1>
       <div id="map"></div>
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
        const locations = [
            {
                position: {
                    lat: 40.432306,
                    lng: -3.693502
                },
            },
            {
                position: {
                    lat: 40.444167,
                    lng: -3.709342
                },
            }
        ];
        try {
            const google = await gmapsInit();
            const geocoder = new google.maps.Geocoder();
            const map = new google.maps.Map(this.$el);

            geocoder.geocode({ address: 'Madrid' }, (results, status) => {
                if (status !== 'OK' || !results[0]) {
                    throw new Error(status);
                }
                map.setCenter(results[0].geometry.location);
                map.fitBounds(results[0].geometry.viewport);
            });
            const markers = locations
                .map((location) => {
                    const marker = new google.maps.Marker({ ...location, map });
                    marker.addListener('click', () => markerClickHandler(marker));
                        return marker;
                });
            new MarkerClusterer(map, markers, {
                magePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
            });
        } catch (error) {
            console.error(error);
        }
    },
}
</script>
<style lang="scss" >
    .maps {
        .cabecera {color: $primario; margin-bottom: 5%;}
        .map {
            width: 100vw;
            height: 100vh;
        }
    }
</style>
