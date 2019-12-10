<template>
    <div class="popup">
        <form class="sub_popup">
            <label class="form-label">
                Band
                <input class="form-input" placeholder="Grupo" type="text" v-model="show_band">
            </label>
            <label class="form-label">
                Ciudad
                <input class="form-input" placeholder="ciudad" type="text" v-model="show_city">
            </label>
            <label class="form-label">
                Tipo de show
                <input class="form-input" placeholder="tipo" type="text" v-model="show_type">
            </label>
            <label class="form-label">
                fecha
                <input class="form-input" placeholder="fecha" type="date" v-model="show_date">
            </label>
            <label class="form-label">
                hora
                <input class="form-input" placeholder="hora" type="time" v-model="show_time">
            </label>
            <label class="form-label">
                link tickets
                <input class="form-input" placeholder="comprar entradas" type="text" v-model="show_link">
            </label>
            <label class="form-label">
                precio
                <input class="form-input" placeholder="precio" type="number" v-model="show_price">
            </label>
            <label class="form-label">
                sala
                <input class="form-input" placeholder="sala" type="text" v-model="show_venue">
            </label>
            <label class="form-label">
                latitud
                <input class="form-input" placeholder="latitud" type="number" v-model="show_lat">
            </label>
            <label class="form-label">
                longitud
                <input class="form-input" placeholder="longitud" type="number" v-model="show_lon">
            </label>
            <div class="boton" @click="subir_show">
                subir
            </div>
        </form>
    </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: 'showSubir',
  props: [],
  created() {
    console.log(this);
    console.log(this.show_band);
  },
  data() {
        return {
            show_band: null,
            show_city: null,
            show_date: null,
            show_link: null,
            show_price: null,
            show_venue: null,
            show_type: null,
            show_time: null,
            show_lat: 40.404039,
            show_lon: -3.699996
        }
  },
  methods: {
      subir_show: function() {
        var date = new Date(this.show_date + "," + this.show_time);
        var timestamp = date.getTime();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var year = date.getFullYear();
        var week = date.getWeekNumber();

        var show = {
            band: this.show_band,
            city: this.show_city,
            timestamp: date,
            year: year,
            month: month,
            week: week,
            day: day,
            link: this.show_link,
            price: this.show_price,
            venue: this.show_venue,
            show_type: this.show_type,
            lat: this.show_lat,
            lon: this.show_lon
        };
        
        console.log(show);
        firebase.firestore().collection("shows").doc(this.show_band + "-" + timestamp).set(show).then(() => {
            console.log("show subido illo");
            this.$emit('cerrar-form', "molt be");
        })
      }
  }
}
</script>
<style scoped lang="scss">
    .popup {
        .sub_popup {
            .form-label {display: block; margin: 1em auto;}
        }
        // .boton {
        //     // background-color: var(--color_primario);
        // }
    }
    
</style>
