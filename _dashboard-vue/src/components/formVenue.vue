<template>
  <div class="form_band">
    <div class="fila band">
      <input class="parr" placeholder="name*" v-model="new_venue.name" />
    </div>
    <div class="fila band">
      <input class="parr" :disabled="!edited_venue && new_venue.id" placeholder="city" v-model="new_venue.city" />
      <input class="parr" :disabled="!edited_venue && new_venue.id" placeholder="latitud" v-model="new_venue.lat" />
      <input class="parr" :disabled="!edited_venue && new_venue.id" placeholder="longitud" v-model="new_venue.lon" />
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

export default {
	name: 'formVenue',
	components: {},
  props: {
    edited_venue: {},
    new_venue: {},
  },
	computed: {
		...mapState(["venues"])
	},
	data() {
		return {
      disable: false
		}
	},
	created: function() {},
  mounted: function(){},
	methods: {}
}
</script>
<style scoped lang="scss">
</style>
