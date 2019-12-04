<template>
    <div class="page band_profile" data-page="sub">
        <h1 class="cabecera">BAND PROFILE</h1>
        <h2 class="titulo band_name">{{band.band}}</h2>
    </div>
</template>

<script>
import firebase from "firebase";

export default {
    name: 'SubProfileBand',
    props:["band_id"],
    components: {
    },
    data() {
        return {
            band: {}
        }
    },
    created() {
        firebase.firestore().collection("bands").doc(this.band_id).onSnapshot((doc) => {
            var bd_band = doc.data();
            console.log(bd_band);
            this.band = bd_band;
        });
    }
}
</script>
<style scoped lang="scss">
.band_profile {
    padding: 0 10px 5em;
    .band_name {
        // position: relative;
    }
}
</style>
