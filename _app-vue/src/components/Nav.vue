<template>
    <nav class="menu nav_slider" v-if="$route.name != 'clapp'" :class="{fondo: $route.name != 'Home'}">
        <span class="selected" :class="$route.name">
            <svg width="80" height="51" viewBox="0 0 80 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="40" fill="white"/>
            </svg>
        </span>
        <router-link class="menu-tit slider_link manifest" to="/manifest">about</router-link>
        <router-link class="menu-tit slider_link home" to="/">home</router-link>
        <router-link class="menu-tit slider_link agenda" to="/agenda">shows</router-link>
    </nav>
</template>

<script>
export default {
  name: 'Nav',
  props: ["admin"],
  mounted() {
    //   console.log(this.$route);
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
	padding: 0 5px;
	text-align: center;
	&.fondo {
		background: linear-gradient(180deg, rgba(255, 255, 255, 0) -46.67%, rgba(255, 255, 255, 0.0441989) 12.92%, rgba(255, 255, 255, 0.54) 49.58%, #FFFEFE 100%);
	}
	.menu-tit {
		color: var(--color-primario-bands);
		width: 20%;
		z-index: 10;
		padding-top: 3%;
		user-select: none!important;
		outline: none!important;
		&.router-link-exact-active {
			font-weight: bold;
			font-size: 1.1em;
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
		&.manifest { left: -7%; }
		&.agenda { left: 75%; }
	}
}
</style>
