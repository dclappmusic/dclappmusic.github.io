<template>
    <div class="page maps" data-page="maps">
       <!-- <h1 class="cabecera">MAP</h1> -->
       <div id="map"></div>
    </div>
</template>

<script>
import ShowCard from '@/components/ShowCard';
// import firebase from "firebase";
// import MarkerClusterer from '@google/markerclusterer';
// import gmapsInit from '../utils/gmaps';

export default {
    name: 'agendaMap',
    props: ["geolocation", "shows"],
    components: {
        ShowCard
    },
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

        // $(".mapboxgl-canvas").prepend("<div class='overlay'></div>");
    },
    methods: {
    }
}
</script>
<style scoped lang="scss" >
    // .maps {
        #map {
            width: 100vw;
            height: 100vh;
            // z-index: -2;
            .mapboxgl-popup {
                // z-index: 100;
                // .mapboxgl-popup-tip {border-top-color: var(--color_secundario);}
                .mapboxgl-popup-content {
                    width: 60vw;
                    height: 20vh;
                    // background-color: var(--color_secundario);
                    color: white;
                    border-radius: 1.8em;
                }
            }
            // .overlay {
            //     position: absolute; 
            //     width: 100vw;
            //     height: 100vh;
            //     background: linear-gradient(166.85deg, rgba(252, 81, 48, 0.585) 0%, rgba(252, 81, 48, 0.669762) 51.37%, rgba(252, 81, 48, 0.75) 100%);
            //     z-index: 15;
            // }
            // .mapboxgl-control-container {
            //     position: absolute; 
            //     top: 0;
            //     width: 100vw;
            //     height: 100vh;
            //     background: linear-gradient(166.85deg, rgba(252, 81, 48, 0.585) 0%, rgba(252, 81, 48, 0.669762) 51.37%, rgba(252, 81, 48, 0.75) 100%);
            //     mix-blend-mode: multiply;
            //     z-index: 15;
            // }
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
