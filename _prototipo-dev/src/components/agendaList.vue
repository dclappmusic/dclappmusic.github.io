<template>
<div class="shows">
    <ShowCard v-for="(show, index) in this.shows" :key="index" :show="show" />
    <button @click="show_showsubir = true" class="boton">subir show</button>
    <showSubir v-if="show_showsubir" @cerrar-form="show_showsubir = false" />
</div>
</template>

<script>
import ShowCard from '@/components/ShowCard';
import showSubir from '@/components/showSubir';

export default {
    name: 'agendaAgenda',
    props:["geolocation", "shows"],
    components: {
        ShowCard,
        showSubir
    },
    data() {
        return {
            show_showsubir: false
        }
    },
    created() {
    },
    mounted() {

    }
}
</script>
<style scoped lang="scss" > 
    .shows {
        width: 100%;
        padding: 20px;
        margin-top: 15vh;
    }
</style>
