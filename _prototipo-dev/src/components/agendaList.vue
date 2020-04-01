<template>
<div class="shows">
    <div v-for="(day, index) in shows_week" :key="index" class="dia">
        <div v-if="day[0]">
            <p class="when display-med">{{index === "0" ? "Today" : index === "1" ? "Tomorrow" : $moment(day[0].timestamp).format('dddd DD')}}</p>
            <ShowCard v-for="(show, subindex) in day" :key="subindex" 
                :show="show" 
                :type="'list'" 
                :from="'list'" 
                :class="{live: show.live}"
            />
        </div>
    </div>
    <div v-if="other_shows[0]" class="dia">
        <p class="when display-med">Soon</p>
        <ShowCard class="list-soon" v-for="(show, index) in other_shows" :key="index" :show="show" :type="'list_soon'" :from="'list'" />
    </div>
    
    <!-- <button @click="show_showsubir = true" class="boton">subir show</button> -->
    <!-- <showSubir v-if="show_showsubir" @cerrar-form="show_showsubir = false" /> -->
</div>
</template>

<script>
import ShowCard from '@/components/ShowCard';
import { mapState } from 'vuex';

export default {
    name: 'agendaList',
    props:["shows"],
    components: {
        ShowCard
    },
    data() {
        return {
            shows_week: {},
            other_shows: [],
            shows_here: []
        }
    },
    computed: {
        ...mapState([
            "city", "geolocation"
        ])
    },
    watch: {
        shows() {
            this.shows_city();
        }
    },
    created() {
        
    },
    mounted() {
        this.shows_city();
    },
    methods: {
        shows_city: function() {
            this.shows_here = [];
            this.shows.forEach(show => {
                // if (show.city === this.city) {
                    this.shows_here.push(show);
                // }
            });
            this.filter_shows();
        },
        filter_shows: function() {
            // this.shows_here.sort((a, b) => this.$moment(a.timestamp).unix() - this.$moment(b.timestamp).unix());
            let today = this.$moment().hours(12).minutes(0).seconds(0).millisecond(0);
            let now = this.$moment();
            this.shows_week = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };

            this.shows_here.forEach(show => {
                var time = this.$moment(show.timestamp);
                var show_time = this.$moment().set({
                    "year": time.year(), "month": time.month(), "date": time.date(),"hour": time.hour(), "minute": time.minute(), "second": 0, "millisecond": 0
                });
                var diff_days = show_time.diff(today, 'days');
                var diff_hours = time.diff(now, 'hours');
                if (diff_days >= 0 && diff_days < 7) {
                    show.diff_days = diff_days;
                    show.diff_hours = diff_hours;
                    if (show.link && diff_hours > -1) {
                        diff_hours < 0 ? show.live = true : show.live = false;
                        this.shows_week[diff_days].push(show);
                    }
                } else if (diff_days > 6) {
                    if (show.link) {this.shows_week[diff_days].push(show);}
                    this.other_shows.push(show);
                }
            });
            for (let day in this.shows_week) {
                this.shows_week[day].sort((a, b) => this.$moment(a.timestamp).unix() - this.$moment(b.timestamp).unix());
            }
            this.other_shows.sort((a, b) => this.$moment(a.timestamp).unix() - this.$moment(b.timestamp).unix());
        }
    }
}
</script>
<style scoped lang="scss" > 
    .shows {
        width: 100%;
        padding: 20px;
        margin-top: 10vh;
        display: flex;
        flex-direction: column;
        // flex-wrap: wrap;
        // justify-content: center;
        .when {
            margin-top: 1em;
            color: var(--color_primario);
            width: 100vw;
        }
        .show {
            width: 400px;
            margin: 0 1em 1em;
        }
        .dia > div {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            // justify-content: center;

        }
    }
</style>
