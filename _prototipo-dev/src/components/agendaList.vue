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

export default {
    name: 'agendaList',
    props:["geolocation", "shows"],
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
    created() {
        var hoy = this.$moment();
        this.shows_week = {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: []
        };
        this.shows.forEach(show => {
            var show_time = this.$moment(show.timestamp);
            var diff = show_time.diff(hoy, 'days');
            // debugger;
            if (diff >= 0 && diff < 7) {
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
