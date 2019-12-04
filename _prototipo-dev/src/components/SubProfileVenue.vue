<template>
    <div class="page venue_profile" data-page="sub">
       <h1 class="cabecera">VENUE PROFILE</h1>
       {{venue_id}}
    </div>
</template>

<script>
import firebase from "firebase";

export default {
    name: 'SubProfileVenue',
    props:["venue_id"],
    components: {
    },
    data() {
        return {
            
        }
    },
    created() {
        // firebase.firestore().collection("shows").onSnapshot((querySnapshot) => {
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
</style>
