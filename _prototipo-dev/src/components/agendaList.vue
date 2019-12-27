<template>
<div class="shows">
    <div v-for="(day, index) in shows_week" :key="index">
        <div v-if="day[0]">
            <p>{{index === "0" ? "Today" : index === "1" ? "Tomorrow" : $moment(day[0].timestamp).format('dddd')}}</p>
            <ShowCard v-for="(show, subindex) in day" :key="subindex" :show="show" />
        </div>
    </div>
    <div v-if="other_shows[0]">
        <p>Soon</p>
        <ShowCard v-for="(show, index) in day" :key="index" :show="other_shows" />
    </div>
    
    <button @click="show_showsubir = true" class="boton">subir show</button>
    <showSubir v-if="show_showsubir" @cerrar-form="show_showsubir = false" />
</div>
</template>

<script>
import ShowCard from '@/components/ShowCard';
import showSubir from '@/components/showSubir';
import { mapState } from 'vuex';

export default {
    name: 'agendaList',
    props:["geolocation"],
    components: {
        ShowCard,
        showSubir
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
        var hoy = this.$moment().hours(12).minutes(0).seconds(0).millisecond(0);
        this.shows_week = {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: []
        };
        // console.log(this.shows[1].timestamp);
        
        this.shows.forEach(show => {
            var time = this.$moment(show.timestamp);
            var show_time = this.$moment().set({
                "year": time.year(), "month": time.month(), "date": time.date(),"hour": 12, "minute": 0, "second": 0, "millisecond": 0
            });
            var diff = show_time.diff(hoy, 'days');
            if (diff >= 0 && diff < 7) {
                show.diff = diff;
                this.shows_week[diff].push(show);
            } else if (diff > 6) {
                this.other_shows.push(show);
            }
        });
    },
    mounted() {

    }
}
</script>
<style scoped lang="scss" > 
    .shows {
        width: 100%;
        padding: 20px;
        margin-top: 15vh;
    }
</style>
