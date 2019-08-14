<template>
    <div class="page agenda" data-page="agenda">
       <h1 class="cabecera">AGENDA</h1>
       <p class="display-med">hoy</p>
       <ul class="shows">
           <li class="show" v-for="show in shows" :key="show.band">
               <img src="images/avatar_base.png">
               <div>
                    <router-link :to='{ name: "sub", params: {from: "agenda", sub_page: "profile_band", id:"1" }}'>
                        <p class="display-med banda">{{show.band}}</p>
                    </router-link>
                    <router-link :to='{ name: "sub", params: {from: "agenda", sub_page: "profile_venue", id:"2" }}'>
                        <p class="parr-sm">{{show.sala}}</p>
                    </router-link>
                    <p class="parr-sm">{{show.precio}}€</p>
               </div>
               <div>
                    <a class="boton-sm" :href="show.link">comprar entradas</a>
                </div>
           </li>
       </ul>
       <button class="boton" @click="show_form = true;">crear show</button>
       <showSubir v-show="show_form" @cerrar_form="show_form = false"/>
       <router-link class="to_maps" to="/maps">MAPS</router-link>
    </div>
</template>

<script>
import firebase from "firebase";
import showSubir from '@/components/showSubir';

export default {
    name: 'Agenda',
    props:[],
    components: {
        showSubir
    },
    data() {
        return {
            shows: [],
            show_form: false
        }
    },
    created() {
        var db = firebase.firestore();
        db.collection("shows").onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var shows = doc.data();
                console.log(shows);
                this.shows.push(shows);
            });
        });
    }
}
</script>
<style lang="scss" >
    .agenda {
        .cabecera {color: $primario; margin-bottom: 5%;}
        .shows {
            width: 100%;
            padding: 20px;
            .show {
                position: relative;
                display: flex;
                // justify-content: center;
                align-items: center;
                height: 60px;
                width: 100%;
                margin-bottom: 5%;
                // background-color: rgba(0,0,0,.2);
                img {
                    // position: absolute;
                    width: 15vw;
                    height: 15vw;
                    margin-right: 10px;
                    // left: 75px;
                    // top: 27px;
                    // background-size: cover;
                    border-radius: 87px;
                }
            }
        }
    }
</style>
