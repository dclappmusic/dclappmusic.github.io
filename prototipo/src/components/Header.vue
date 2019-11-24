<template>
    <div class="header">
        <p class="nombre">
            {{this.usuario.nombre}}<br>
            {{this.usuario.apellidos}}
        </p>

        <!-- <h1 class="tiempo_restante">{{+(Math.round(this.usuario.horas - this.tiempo(this.usuario.tiempo_total + "e+2")  + "e-2"))}}</h1> -->
        <div class="ajustes" @click="toggle_menu"><img src="images/ajustes.svg"></div>
        <div class="ajustes_open cerrado">
            <a class="logout" @click="logout">logout</a>
        </div>
    </div>
</template>

<script>
// import firebase from 'firebase';

export default {
  name: 'Header',
  props: ["usuario"],
  methods: {
    toggle_menu: function () {
        $(".ajustes_open").toggleClass("cerrado");
    },
    logout: function () {
        // firebase.auth().signOut().then(() => {
        //     this.$router.replace('login');
        // }).catch(function (error) {
        //     window.alert("error: " + error);
        // });
    }
  }
}
</script>
