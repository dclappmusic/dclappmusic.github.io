<template>
    <div></div>
</template>

<script>
export default {
    name: 'GetGeolocation',
    components: {
    },
    props: ['findLocation'],
    data() {
        return {
            geolocation: {
                lat: null,
                lon: null
            },
        }
    },
    watch: {
        geolocation: function() {
            this.$store.commit("updateGeolocation", this.geolocation);
        },
        findLocation() {
            this.get_geolocation();
        }
    },
    created() {
        this.get_geolocation(); 
    },
    mounted() {
    },
    methods: {
    //geolocation functions
        get_geolocation: function() {
            if (localStorage.getItem('coords')){
                this.geolocation = JSON.parse(localStorage.getItem('coords'));
                console.log(this.geolocation);
            }
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    this.browserGeolocationSuccess,
                    this.browserGeolocationFail,
                    {maximumAge: 20000, timeout: 10000, enableHighAccuracy: false}
                );
            } else {
                console.log("Navigator geolocation unavailable.");
                this.$emit("geolocationError",  "No se puede acceder a la ubicación en tu móvil :'(");
            }
        },
        browserGeolocationSuccess: function(position) {
            this.geolocation.lat = position.coords.latitude;
            this.geolocation.lon = position.coords.longitude;
            console.log("Browser geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
            localStorage.setItem('coords', JSON.stringify(this.geolocation));
            this.$store.commit("updateGeolocation", this.geolocation);
        },
        browserGeolocationFail: function(error) {
            switch (error.code) {
                case error.TIMEOUT:
                    console.log("Browser geolocation error !\n\nTimeout.");
                    this.$emit("geolocationError",  "Hay problemas con el acceso a tu ubicación");
                break;
                case error.PERMISSION_DENIED:
                    if(error.message.indexOf("Only secure origins are allowed") == 0) {
                        this.tryAPIGeolocation();
                    } else {
                        console.log("Permison denied");
                        this.$emit("geolocationError",  "No nos has dado permiso de acceder a tu ubicación");
                    }
                break;
                case error.POSITION_UNAVAILABLE:
                    console.log("Browser geolocation error !\n\nPosition unavailable.");
                    this.$emit("geolocationError",  "Browser geolocation error !\n\nPosition unavailable");
                break;
            }
        },
        tryAPIGeolocation: function() {
            jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDCa1LUe1vOczX1hO_iGYgyo8p_jYuGOPU", function(success) {
                this.apiGeolocationSuccess({coords: {latitude: success.location.lat, longitude: success.location.lng}});
            })
            .fail(function(err) {
                console.log("API Geolocation error! \n\n"+err);
                this.$emit("geolocationError",  "API Geolocation error! \n\n"+err);
            });
        },

        apiGeolocationSuccess: function(position) {
            this.geolocation.lat = position.coords.latitude;
            this.geolocation.lon = position.coords.longitude;
            console.log("API geolocation success!\n\nlat = " + latitud + "\nlng = " + longitud);
            localStorage.setItem('coords', JSON.stringify(this.geolocation));
            this.$store.commit("updateGeolocation", this.geolocation);
        },
    }
};
</script>