<template>
  <div class="sub">
        <!-- {{$route.params.sub_page}} -->
        <div v-if="$route.params.sub_page === 'profile_band'">
            <SubProfileBand :id="$route.params.id"></SubProfileBand>
        </div>
        <div v-else-if="$route.params.sub_page === 'profile_venue'">
            <SubProfileVenue :id="$route.params.id"></SubProfileVenue>
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
  created() {},
  mounted() {},
  data() {
    return{}
  },
  methods: {}
}
</script>
<style scoped lang="scss">
</style>
