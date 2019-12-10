<template>
    <div class="page agenda" data-page="agenda">
       <div class="cabecera">
            <h1 class="titulo">AGENDA</h1>
            <p class="display-med" :class="{'active': !map}"  @click="map = !map">hoy</p>
            <p class="display-med" :class="{'active': map}" @click="map = false">otro dia</p>
       </div>
       <div class="view">
           <agendaMap
                v-if="map"
                :geolocation="geolocation"
                :shows="shows"
            />
            <agendaList
                v-else
                :geolocation="geolocation"
                :shows="shows"
            />
       </div>
    </div>
</template>

<script>
import agendaMap from '@/components/agendaMap';
import agendaList from "@/components/agendaList";

export default {
    name: 'Agenda',
    props: ["geolocation", "shows"],
    components: {agendaList, agendaMap},
    data() {
        return {
            // shows: [],
            map: true,
            shows_semana: []
        }
    },
    computed: {
        current_week: function() {
            return new Date().getWeekNumber();
        }
    },
    created() {
    },
    mounted() {
        // shows.forEach(show => {
        //     if (show.week === this.current_week) {
        //         this.shows_semana.push(show);
        //     }
        // });
    }
}
</script>
<style scoped lang="scss">
    .agenda {
        .cabecera {
            .active {
                background-color: var(--color_primario);
                color: white;
                padding: .3em;
                border-radius: 5em;
                position: absolute;
                right: 10px;
                top: 0;
                font-size: .6em;
                width: 25%;
            }
        }
        // .shows {
        //     width: 100%;
        //     padding: 20px;
        //     .show {
        //         position: relative;
        //         display: flex;
        //         // justify-content: center;
        //         align-items: center;
        //         height: 60px;
        //         width: 100%;
        //         margin-bottom: 5%;
        //         // background-color: rgba(0,0,0,.2);
        //         img {
        //             // position: absolute;
        //             width: 15vw;
        //             height: 15vw;
        //             margin-right: 10px;
        //             // left: 75px;
        //             // top: 27px;
        //             // background-size: cover;
        //             border-radius: 87px;
        //         }
        //     }
        // }
    }
</style>
