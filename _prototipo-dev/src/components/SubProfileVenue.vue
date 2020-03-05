<template>
    <div class="page venue_profile" data-page="sub">
       <img class="image" :src="venue.logo">
        <h2 class="titulo name">{{venue.name}}</h2>

        <div class="concert">
            <h3>Next Concerts</h3>
            <div class="show" v-for="show in venue_shows" v-bind:key="show">
                {{$moment(show.timestamp).format("D/MM")}} {{show.band}} {{show.city}} {{show.price}}
            </div>
        </div>
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
        },
        venue_shows: function() {
            var venue_shows = this.shows.filter(show => show.venue_id === this.venue_id);
            return venue_shows;
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
    .concert {
        background-color: grey;
        border-radius: 20px;
        padding: 10px;
        position: relative;
        width: 70%;
        margin: 10px auto auto auto;
        text-align: center;
        font-family: var(--roboto);
        color: white;
        font-style: normal;
        line-height: normal;
        font-size: 14px;
        z-index: auto;

        h3 {
            text-decoration: underline;
            font-size: 18px;
            padding-bottom: 10px;
        }

        .show {
            border-radius: 5px;
            border-color: white;
            border-width: 1px;
            border-style: solid;
            margin: 3px auto;
        }
    }
}
</style>
