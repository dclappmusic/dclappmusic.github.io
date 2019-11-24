<template>
    <div class="page band_profile" data-page="sub">
       <h1 class="cabecera">BAND PROFILE</h1>
       {{this.id}}
    </div>
</template>

<script>
import firebase from "firebase";

export default {
    name: 'SubProfileBand',
    props:["id"],
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
