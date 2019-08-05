<template>
    <div class="page agenda" data-page="agenda">
       Agenda
       <ul class="shows">
           <li class="show" v-for="show in shows" v-bind:key="show.band">
               <p class="banda">{{show.band}}</p>
               <p>{{show.sala}}</p>
               <p>{{show.precio}}</p>
           </li>
       </ul>
    </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: 'Agenda',
  props: [],
  data() {
      return {
          shows: []
      }
  },
  created() {
    var db = firebase.firestore();
    db.collection("shows").get().then((querySnapshot) => {
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
.shows {
    width: 100%;
    padding: 20px;
    .show {
        display: flex;
        justify-content: center;
        .banda {
            display: block;
            position: relative;
            height: 60px;
            width: 100%;
            margin-bottom: 2%;
        }
    }
}
</style>
