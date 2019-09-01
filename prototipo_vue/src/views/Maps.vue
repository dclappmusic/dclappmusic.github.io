<template>
  <div class="page">
        <Map
            :geolocation="this.geolocation"
            :shows="this.shows"
        ></Map>
  </div>
</template>

<script>
// @ is an alias to /src
import Map from '@/components/Map.vue';

export default {
  name: 'maps',
  components: {
    Map
  },
  props: ["geolocation", "shows"],
  created() {},
  mounted() {},
  data() {
    return{}
  },
  methods: {}
}
</script>
