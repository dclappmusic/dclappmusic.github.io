<template>
    <nav class="menu nav_slider">
        <span class="selected" :class="$route.name">
            <svg width="80" height="51" viewBox="0 0 80 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="40" fill="white"/>
            </svg>
        </span>
        <router-link class="menu-tit slider_link historial" to="/historial">historial</router-link>
        <router-link class="menu-tit slider_link home" to="/">home</router-link>
        <router-link class="menu-tit slider_link agenda" to="/agenda">shows</router-link>
    </nav>
</template>

<script>
export default {
  name: 'Nav',
  props: ["admin"],
  mounted() {
      console.log(this.$route);
  }
}
</script>
<style scoped lang="scss">
.menu {
	position: fixed;
	width: 100%;
	height: 8vh;
	bottom: 0;
	display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 3%;
	text-align: center;
	.menu-tit {
		color: var(--color_secundario);
		width: 20%;
        z-index: 10;
        padding-top: 3%;
		&.router-link-exact-active {
			// position: relative;
		}
	}
    .selected {
        position: absolute;
        left: 33%;
        width: 33%;
        border-radius: 100%;
        transition: all .3s ease-in-out;
        svg {
            width: 70%;
            height: 10vh;
        }
        &.historial { left: -5%; }
        &.agenda { left: 75%; }
    }
}
</style>
