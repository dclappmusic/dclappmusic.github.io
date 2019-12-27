<template>
    <nav class="menu nav_slider">
        <router-link class="menu-tit slider_link historial" to="/historial">historial</router-link>
        <router-link class="menu-tit slider_link home" to="/">home</router-link>
        <router-link class="menu-tit slider_link agenda" to="/agenda">agenda</router-link>
    </nav>
</template>

<script>
export default {
  name: 'Nav',
  props: ["admin"]
}
</script>
