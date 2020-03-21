<template>
  <div class="sub">
    <svg @click="$router.go(-1)" class="back" width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.939341 10.9393C0.353554 11.5251 0.353554 12.4749 0.939341 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97919 12.6066 1.3934C12.0208 0.807611 11.0711 0.807611 10.4853 1.3934L0.939341 10.9393ZM26 10.5L2 10.5V13.5L26 13.5V10.5Z" fill="white"/>
    </svg>
    <div v-if="params.sub_page === 'sub_profile_band'">
        <SubProfileBand :band_id="params.id" />
    </div>
    <div v-else-if="params.sub_page === 'sub_profile_venue'">
        <SubProfileVenue :venue_id="params.id" />
    </div>
      <p v-else>no page</p>
  </div>
</template>

<script>
// @ is an alias to /src
import SubProfileVenue from '@/components/SubProfileVenue.vue';
import SubProfileBand from '@/components/SubProfileBand.vue';

export default {
  name: 'sub',
  components: {
    SubProfileBand,
    SubProfileVenue
  },
  props: [],
  computed: {
    params() {
      return this.$route.params;
    }
  },
  created() {},
  mounted() {
    console.log(this.params.sub_page);
  },
  data() {
    return{}
  },
  methods: {}
}
</script>
<style scoped lang="scss">
.sub {
	padding-top: 2em;
	// background: var(--color_secundario);
    background: linear-gradient(116.98deg, #D65238 3.41%, #7D352B 97.16%, #17225C 111.5%);
}
</style>
