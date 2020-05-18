<template>
    <div class="page bands">
        <div class="cabecera">
            <h1 class="tit">Bands</h1>   
        </div>
        <div class="view">
            <div class="tabla">
                <div class="fila cabecero">
                    <h3 class="tit id">id</h3>
                    <h3 class="tit name">name</h3>
                    <h3 class="tit location">location</h3>
                    <h3 class="tit insta">insta</h3>
                    <h3 class="tit fb">facebook</h3>
                    <h3 class="tit image">image</h3>
                    <h3 class="tit similar">similar to</h3>
                    <h3 class="tit shows">shows</h3>
                </div>
                <div class="fila" v-for="(band, index) in bands" :key="index">
                    <p class="parr id">{{band.id}}</p>
                    <p class="parr name">{{band.name}}</p>
                    <p class="parr location">{{band.location}}</p>
                    <p class="parr insta">{{band.insta_user}}</p>
                    <p class="parr fb">{{band.fb}}</p>
                    <p class="parr image"><img class="band_image" :src="band.image"/></p>
                    <p class="parr similar">{{band['afin a']}}</p>
                    <p class="parr shows">{{band.shows}}</p>
                </div>
            </div>
       </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Bands',
    props: [],
    components: {},
    computed: {
		...mapState([
			"shows", "bands", "venues", 'user'
		]),
	},
    data() {
        return {
        }
    },
    created() {
    }
}
</script>
<style scoped lang="scss">
    .tabla {
        position: relative;
        width: 100%;
        max-width: 80vw;
        margin: 2em auto;
        height: auto;
        .fila {
            margin: 1em 0;
            width: 100%;
            display: flex;
            .tit, .parr {
                width: 20%;
                text-align: left;
                &.id {width: 5%;}
                &.name {width: 30%;}
                &.insta { width: 25%;}
                &.image {
                    position: relative;
                    width: 20%;
                    .band_image {
                        width: 100%;
                    }
                }
            }
        }
    }
</style>
