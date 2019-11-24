<template>
    <nav class="nav">
        <p class="slider_link agenda">agenda</p>
        <p class="slider_link home">home</p>
        <!-- <router-link class="agenda" to="/agenda">agenda</router-link>
        <router-link class="index" to="/index">home</router-link> -->
        <!-- <router-link v-if="this.admin" class="registrar" to="/lista-empleados"><img src="images/agenda-de-contactos.svg">empleados</router-link> -->
    </nav>
</template>

<script>
export default {
  name: 'Nav',
  props: ["admin"]
}
</script>
