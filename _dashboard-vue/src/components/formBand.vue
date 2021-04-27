<template>
  <div class="form_band">
    <div class="fila band">
      <input class="parr" placeholder="name*" v-model="new_band.name" />
    </div>
    <div class="fila band">
      <input class="parr" :disabled="!edited_band && new_band.id" placeholder="city" v-model="new_band.city" />
      <input class="parr" :disabled="!edited_band && new_band.id" placeholder="afin a" v-model="new_band.afin_a" />
      <input class="parr" :disabled="!edited_band && new_band.id" placeholder="estilo" v-model="new_band.estilo" />
      <input class="parr" :disabled="!edited_band && new_band.id" placeholder="descripción" v-model="new_band.description" />
      <input class="parr" :disabled="!edited_band && new_band.id" placeholder="image" v-model="new_band.image" />
    </div>
    <div class="fila band">
      <input class="parr" :disabled="!edited_band && new_band.id" placeholder="instagram" v-model="new_band.instagram" />
      <input class="parr" :disabled="!edited_band && new_band.id" placeholder="facebook" v-model="new_band.facebook" />
      <input class="parr" :disabled="!edited_band && new_band.id" placeholder="youtube" v-model="new_band.youtube" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'formBand',
	components: {},
  props: {
    edited_band: {},
    new_band: {},
  },
	computed: {
		...mapState(["bands"])
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
