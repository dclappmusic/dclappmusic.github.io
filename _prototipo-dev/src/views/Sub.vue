<template>
  <div class="sub">
    <!-- {{$route.params.sub_page}} -->
	<a @click="$router.go(-1)">atras</a>
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
	padding-top: 5em;
	background: var(--color_secundario);
}
</style>
