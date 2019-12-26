<template>
    <div class="page venue_profile" data-page="sub">
       <img class="image" :src="venue.logo">
        <h2 class="titulo name">{{venue.name}}</h2>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'SubProfileVenue',
    props:["venue_id"],
    components: {
    },
    data() {
        return {
            // band: {}
        }
    },
    computed: {
        ...mapState([
            "shows", "venues", "user"
        ]),
        venue: function() {
            return this.venues.find(venue => venue.id === this.venue_id);
        }
    },
    created() {
    }
}
</script>
<style scoped lang="scss">
.venue_profile {
    .image {
        position: relative;
        display: block;
        margin: 0 auto;
        width: 70vw;
        height: 70vw;
        object-fit: contain;
        object-position: center;
        border-radius: 40%;
        z-index: 10;
    }
    .name {
        position: relative;
        width: 80%;
        margin: 0 auto;
        text-align: center;
        font-family: var(--roboto);
        color: white;
        font-style: normal;
        font-weight: 900;
        line-height: normal;
        font-size: 40px;
        z-index: 10;
    }
}
</style>
