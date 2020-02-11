<template>
<div class="shows">
    <div v-for="(day, index) in shows_week" :key="index">
        <div v-if="day[0]">
            <p class="when display-med">{{index === "0" ? "Today" : index === "1" ? "Tomorrow" : $moment(day[0].timestamp).format('dddd')}}</p>
            <ShowCard v-for="(show, subindex) in day" :key="subindex" :show="show" :type="'list'"/>
        </div>
    </div>
    <div v-if="other_shows[0]">
        <p class="when display-med">Soon</p>
        <ShowCard class="list-soon" v-for="(show, index) in other_shows" :key="index" :show="show" :type="'list_soon'" />
    </div>
    
    <!-- <button @click="show_showsubir = true" class="boton">subir show</button> -->
    <!-- <showSubir v-if="show_showsubir" @cerrar-form="show_showsubir = false" /> -->
</div>
</template>

<script>
import ShowCard from '@/components/ShowCard';
// import showSubir from '@/components/showSubir';
import { mapState } from 'vuex';

export default {
    name: 'agendaList',
    props:["geolocation"],
    components: {
        ShowCard,
        // showSubir
    },
    data() {
        return {
            show_showsubir: false,
            shows_week: {},
            other_shows: []
        }
    },
    computed: {
        ...mapState([
            "shows"
        ])
    },
    created() {
        
    },
    mounted() {
        this.filter_shows();
    },
    methods: {
        filter_shows: function() {
            let today = this.$moment().hours(12).minutes(0).seconds(0).millisecond(0);
            this.shows_week = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };

            this.shows.forEach(show => {
                var time = this.$moment(show.timestamp);
                var show_time = this.$moment().set({
                    "year": time.year(), "month": time.month(), "date": time.date(),"hour": 12, "minute": 0, "second": 0, "millisecond": 0
                });
                var diff = show_time.diff(today, 'days');
                if (diff >= 0 && diff < 7) {
                    show.diff = diff;
                    this.shows_week[diff].push(show);
                } else if (diff > 6) {
                    this.other_shows.push(show);
                }
            });
        }
    }
}
</script>
<style scoped lang="scss" > 
    .shows {
        width: 100%;
        padding: 20px;
        margin-top: 5vh;
        .when {
            margin-bottom: 1em;
            color: var(--color_primario);
        }
    }
</style>
