<template>
    <div class="page agenda" data-page="agenda">
       <div class="cabecera">
           <h1>AGENDA</h1>
            <p class="display-med" @click="map = true">hoy</p>
            <p class="display-med" @click="map = false">otro dia</p>
       </div>
       <div class="view">
           <showMap
                v-if="this.map"
                :geolocation="this.geolocation"
                :shows="this.shows"
            />
            <showAgenda 
                v-else
                :geolocation="this.geolocation"
                :shows="this.shows"
            />
       </div>
       
       <button class="boton" @click="show_form = true;">crear show</button>
       <showSubir v-show="show_form" @cerrar_form="show_form = false"/>
       <!-- <router-link class="to_maps" to="/maps">MAPS</router-link> -->
    </div>
</template>

<script>
import showMap from '@/components/showMap';
import showAgenda from "@/components/showAgenda";
import showSubir from '@/components/showSubir';

export default {
    name: 'Agenda',
    props: ["geolocation", "shows"],
    // components: {showSubir, ShowsMap, ShowsAgenda},
    components: {showSubir, showAgenda, showMap},
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
<style lang="scss" >
    .agenda {
        .cabecera {color: $primario; margin-bottom: 5%; position: fixed; z-index: 1;}
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
