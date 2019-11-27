<template>
    <div class="popup">
        <form class="sub_popup">
            <label class="form-label">
                Band
                <input class="form-input" placeholder="Grupo" type="text" v-model="show_band">
            </label>
            <label class="form-label">
                Ciudad
                <input class="form-input" placeholder="ciudad" type="text" v-model="show_ciudad">
            </label>
            <label class="form-label">
                Tipo de show
                <input class="form-input" placeholder="tipo" type="text" v-model="show_tipo">
            </label>
            <label class="form-label">
                fecha
                <input class="form-input" placeholder="fecha" type="datetime" v-model="show_fecha">
            </label>
            <label class="form-label">
                hora
                <input class="form-input" placeholder="hora" type="datetime" v-model="show_hora">
            </label>
            <label class="form-label">
                link tickets
                <input class="form-input" placeholder="comprar entradas" type="text" v-model="show_link">
            </label>
            <label class="form-label">
                precio
                <input class="form-input" placeholder="precio" type="number" v-model="show_precio">
            </label>
            <label class="form-label">
                sala
                <input class="form-input" placeholder="sala" type="text" v-model="show_sala">
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
            show_ciudad: null,
            show_fecha: null,
            show_link: null,
            show_precio: null,
            show_sala: null,
            show_tipo: null,
            show_hora: null,
            show_lat: 40.404039,
            show_lon: -3.699996
        }
  },
  methods: {
      subir_show: function() {
        var show = {
            band: this.show_band,
            ciudad: this.show_ciudad,
            fecha: this.show_fecha,
            link: this.show_link,
            precio: this.show_precio,
            sala: this.show_sala,
            tipo: this.show_tipo,
            hora: this.show_hora,
            lat: this.show_lat,
            lon: this.show_lon
        };
        
        console.log(show);
        firebase.firestore().collection("shows").doc(this.show_band + this.show_fecha).set(show).then(() => {
            console.log("show subido illo");
            this.$emit('cerrar-form', "molt be");
        })
      }
  }
}
</script>
<style lang="scss" >
    .popup {
        .sub_popup {
            .form-label {display: block; margin: 1em auto;}
        }
        .boton {
            // background-color: var(--color_primario);
        }
    }
    
</style>
