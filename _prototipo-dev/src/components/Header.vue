<template>
    <div class="header">
        <p class="nombre">
            {{this.usuario.email}}
        </p>
        <div class="ajustes" @click="toggle_menu">
            <svg width="8" height="34" viewBox="0 0 8 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="4" cy="4" r="4" fill="#0C3847"/>
                <circle cx="4" cy="17" r="4" fill="#0C3847"/>
                <circle cx="4" cy="30" r="4" fill="#0C3847"/>
            </svg>
        </div>
        <div class="ajustes_open" v-if="open">
            <a class="logout" @click="logout">logout</a>
        </div>
        <div class="overlay" v-if="open" @click="open = false"></div>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Header',
  props: ["usuario"],
  data() {
      return {
          open: false
      }
  },
  methods: {
    toggle_menu: function () {
        this.open = !this.open;
    },
    logout: function () {
        firebase.auth().signOut().then(() => {
            // this.$router.replace('login');
            this.cerrado = true;
        }).catch(function (error) {
            window.alert("error: " + error);
        });
    }
  }
}
</script>

<style scoped lang="scss">
.header {
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;
	height: 10%;
    display: flex;
    align-items: center;
	padding: 15px;
    background-color: var(--fondo);
    z-index: 99;
	.nombre {
		display: inline-block;
        margin-left: .5em;
		font-family: var(--roboto);
		color: var(--texto_oscuro);
		font-size: 1.2em;
	}
	.ajustes {
		position: absolute;
		width: 10%;
		right: 0;
		// top: 5vw;
		text-align: center;
        transition: all .25s ease-in-out .5s;
        &:active {
            transition: all .5s ease-out 0s;
            border-radius: 5em;
            background-color: rgba(0,0,0,.2);
        }
	}
	.ajustes_open {
		position: absolute;
		right: 2em;
		top: 15px;
		background: white;
		padding:  .7em 1em;
        box-shadow: 0 2px 15px rgba(0,0,0,.15);
        border-radius: 5px 0 5px 5px;
        z-index: 100;
		a {color: var(--texto_oscuro);}
    }
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0,0,0,.15);
    }
}
</style>
