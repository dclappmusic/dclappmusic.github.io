<template>
    <form class="subir_show_form">
        <label class="form-label">
            Band
            <input class="form-input" placeholder="Grupo" type="text" v-model="show_band">
        </label>

        <label class="form-label">
            Ciudad
            <input class="form-input" placeholder="ciudad" type="text" v-model="show_ciudad">
        </label>
        <label class="form-label">
            fecha
            <input class="form-input" placeholder="fecha" type="datetime" v-model="show_fecha">
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
        <div class="boton" @click="subir_show">
            subir
        </div>
    </form>
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
            show_sala: null
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
            sala: this.show_sala
        };
        
        console.log(show);
        firebase.firestore().collection("shows").doc(this.show_band + this.show_fecha).set(show).then(() => {
            console.log("show subido illo");
            this.$emit('cerrar_form', "molt be");
        })
      }
  }
}
</script>
<style lang="scss" >
    .container {
        .subir_show_form {
            position: fixed;
            overflow: scroll;
            top: 0;
            width: 100vw;
            height: 100vh;
            background-color: $secundario;
            z-index: 10000;
        }
        .boton {
            background-color: $primario;
        }
    }
    
</style>
