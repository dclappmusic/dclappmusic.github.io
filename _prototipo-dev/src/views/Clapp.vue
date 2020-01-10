<template>
    <div class="page home" data-page="clapp">
        
    </div>
</template>

<script>
import Header from '@/components/Header';

export default {
	name: 'Home',
    components: {
        
    },
	props: ["clapp_position"],
	data() {
		return{
            distancia_max: 0.001000,
            distance: null,
            band_preclapps: 0,
            show_preclapps: 0,
            shows_close: {},
            show_closest: "",
            shows_far: {},
            showFar_closest: "",
            show_founded: false
        }
	},
	created() {},
	mounted() {
        //sort by closeness in 2 arrays
        this.shows.forEach((Ishow_activo) => {
            if (this.is_cerca(Ishow_activo.position, clapp_position)) {
                this.show_founded = true;
                Ishow_activo.distance = this.distancia;
                this.shows_close.push(Ishow_activo);
            } else {
                Ishow_activo.distance = this.distancia;
                this.shows_far.push(Ishow_activo);
            }
        });
        this.show_closest = this.order_shows(this.shows_close);
        this.showFar_closest = this.order_shows(this.shows_far);
    },
	methods: {
        is_cerca: function(posicion1, posicion2) {
            this.distance = Math.pow((Math.pow(posicion1.latitud - posicion2.latitud, 2) + Math.pow(posicion1.longitud - posicion2.longitud,2)), 0.5);
            return this.distance <= this.distance_max;
        },
        order_shows: function(shows) {
            let keysSorted = Object.keys(shows).sort(function(a,b){return shows[a]-shows[b]});
            return keysSorted[0];
        },
    }
}
</script>
<style scoped lang="scss">

</style>
