<template>
    <div class="page agenda" data-page="agenda">
       <div class="cabecera">
            <h1>AGENDA</h1>
            <p class="display-med" :class="{'active': !map}"  @click="map = true">hoy</p>
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
import showSubir from '@/components/showSubir';

export default {
    name: 'Agenda',
    props: ["geolocation", "shows"],
    components: {showSubir, agendaList, agendaMap},
    data() {
        return {
            // shows: [],
            show_form: false,
            map: true
        }
    },
    created() {
        // var db = firebase.firestore();
        // db.collection("shows").onSnapshot((querySnapshot) => {
        //     querySnapshot.forEach((doc) => {
        //         var shows = doc.data();
        //         console.log(shows);
        //         this.shows.push(shows);
        //     });
        // });
    }
}
</script>
<style scoped lang="scss">
    .agenda {
        .cabecera {
            // color: var(--color_primario); 
            margin-bottom: 5%; 
            position: fixed; 
            z-index: 20;
            .active {
                // background-color: var(--color_primario);
                color: white;
                padding: .3em;
                border-radius: 15px;
                position: absolute;
                right: 10px;
                top: 0;
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
