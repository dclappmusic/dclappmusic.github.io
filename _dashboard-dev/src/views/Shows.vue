<template>
    <div class="page shows">
       <div class="cabecera">
            <h1 class="tit">Shows</h1>   
       </div>
       <div class="view">
            <div class="tabla">
                <div class="fila cabecero">
                    <h3 class="tit id">id</h3>
                    <h3 class="tit band">band</h3>
                    <h3 class="tit where">where</h3>
                    <h3 class="tit fest">festival?</h3>
                    <h3 class="tit clicks">clicks</h3>
                </div>
                <div class="fila" v-for="(show, index) in shows" :key="index">
                    <p class="id">{{show.id}}</p>
                    <p class="band">{{show.band}}</p>
                    <p class="where">{{show.link}}</p>
                    <p class="fest">{{show.festival}}</p>
                    <p class="clicks">{{show.clicks}}</p>
                </div>
            </div>
       </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Shows',
    props: [],
    components: {},
    computed: {
		...mapState([
			"shows", "bands", "venues", 'user'
		]),
	},
    data() {
        return {
            subir_show: false,
            new_show: {
                id: null,
                band: null,
                where: null,
                fest: null,
                clicks: null
            }  
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
            h3, p, input {
                width: 20%;
                text-align: left;
                &.id {width: 5%;}
                &.band {width: 25%;}
                &.where {
                    width: 30%;
                }
            }
        }
    }
</style>
