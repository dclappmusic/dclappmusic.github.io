<template>
  <div class="sub">
        <!-- {{$route.params.sub_page}} -->
        <div v-if="$route.params.sub_page === 'profile_band'">
            <band-profile :id="$route.params.id"></band-profile>
        </div>
        <div v-else-if="$route.params.sub_page === 'profile_venue'">
            <venue-profile :id="$route.params.id"></venue-profile>
        </div>
      <p v-else>no page</p>
  </div>
</template>

<script>
// @ is an alias to /src
import BandProfile from '@/components/BandProfile.vue';
import VenueProfile from '@/components/VenueProfile.vue';

export default {
  name: 'sub',
  components: {
    BandProfile,
    VenueProfile
  },
  props: [],
  created() {},
  mounted() {},
  data() {
    return{}
  },
  methods: {}
}
</script>
