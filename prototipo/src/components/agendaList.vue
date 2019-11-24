<template>
<div>
    <ul class="shows">
        <li class="show" v-for="show in this.shows" :key="show.band">
            <img src="images/avatar_base.png">
            <div>
                <router-link :to='{ name: "sub", params: {from: "agenda", sub_page: "sub_profile_band", id:"1" }}'>
                    <p class="display-med banda">{{show.band}}</p>
                </router-link>
                <router-link :to='{ name: "sub", params: {from: "agenda", sub_page: "sub_profile_venue", id:"2" }}'>
                    <p class="parr-sm">{{show.sala}}</p>
                </router-link>
                <p class="parr-sm">{{show.precio}}€</p>
            </div>
            <div>
                <a class="boton-sm" :href="show.link">comprar entradas</a>
            </div>
        </li>
    </ul>
</div>
</template>

<script>

export default {
    name: 'agendaAgenda',
    props:["geolocation", "shows"],
    components: {},
    data() {
        return {
            show_form: false
        }
    },
    created() {
    }
}
</script>
<style lang="scss" > 
    .shows {
        width: 100%;
        padding: 20px;
        margin-top: 15vh;
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
</style>
