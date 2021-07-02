<template>
  <div class="form_band">
    <div class="fila band">
      <input class="parr" placeholder="name*" v-model="new_venue.name" />
    </div>
    <div class="fila band">
      <input class="parr" :disabled="!edited_venue && new_venue.id" placeholder="city" v-model="new_venue.city" />
      <mapbox-geocoder 
        class="geocoder"
        :access-token="access_token"
        placeholder="dirección"
        countries="es"
        language="es"
        :reverseGeocode="reverse_geocode"
        @mb-created="instance => control = instance" 
        @mb-result="resultado"
      />
      <p class="parr coords" v-if="new_venue.lat">{{new_venue.lat + ', ' + new_venue.lon}}</p>
    </div>
    <div class="fila band">
      <input class="parr" :disabled="!edited_venue && new_venue.id" placeholder="logo" v-model="new_venue.logo" />
      <input class="parr" :disabled="!edited_venue && new_venue.id" placeholder="web" v-model="new_venue.web" />
      <input class="parr" :disabled="!edited_venue && new_venue.id" placeholder="capacity" v-model="new_venue.capacity" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MapboxGeocoder from '@studiometa/vue-mapbox-gl/dist/components/MapboxGeocoder';
import '@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css';

export default {
	name: 'formVenue',
	components: {MapboxGeocoder},
  props: {
    edited_venue: {},
    new_venue: {},
  },
	computed: {
		...mapState(["venues"])
	},
	data() {
		return {
      disable: false,
      location: null,
      reverse_geocode: false,
      access_token: "pk.eyJ1IjoiamFwaW1lcyIsImEiOiJjazF3cWdma2QwNDZwM2VxdGpldDQxZWlwIn0.NXdh9SyvQKYtfDyIKGy-ZQ",
		}
	},
	created: function() {
    if (this.new_venue.lat) {
      this.reverse_geocode = true;
      // this.reverseGeo().then(result => {
      //   console.log(result);
      //   debugger;
      // });
      // document.querySelector('.mapboxgl-ctrl-geocoder--input').value = this.new_venue.lat + ', ' + this.new_venue.lon;
      // document.querySelector('.mapboxgl-ctrl-geocoder--input').value = this.new_venue.address;
    }

  },
  mounted: function(){
    if (this.reverse_geocode) document.querySelector('.mapboxgl-ctrl-geocoder--input').value = this.new_venue.lon + ',' + this.new_venue.lat;
  },
	methods: {
    resultado(result) {
      debugger;
      this.new_venue.lat = result.result.center[0];
      this.new_venue.lon = result.result.center[1];
      // this.new_venue.address = result.result.place_name;
    },
    async reverseGeo() {
      return await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.new_venue.lat},${this.new_venue.lon}.json?access_token=${this.access_token}`,
        { mode: 'no-cors'})
    }
  }
}
</script>
<style scoped lang="scss">
.coords {
  display: inline-block;
  margin-left: 1em;
}
.geocoder {
  display: inline-block;
  /deep/ .mapboxgl-ctrl-geocoder {
    background-color: transparent;
    .mapboxgl-ctrl-geocoder--icon-search {
      height: 2em;
      left: auto;
      right: 7px;
    }
    input {
      color: white;
      font-size: 1em;
    }
  }
}
</style>
