<template>
  <div class="modal subir_form">
    <div class="sub_modal">
      <!-- <svg class="cerrar" @click="$emit('close')" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.646446 18.6464C0.451185 18.8417 0.451184 19.1583 0.646446 19.3536C0.841709 19.5488 1.15829 19.5488 1.35355 19.3536L10 10.7071L18.6464 19.3536C18.8417 19.5488 19.1583 19.5488 19.3536 19.3536C19.5488 19.1583 19.5488 18.8417 19.3536 18.6464L10.7071 10L19.3536 1.35355C19.5488 1.15829 19.5488 0.841709 19.3536 0.646447C19.1583 0.451185 18.8417 0.451185 18.6464 0.646447L10 9.29289L1.35356 0.646446C1.15829 0.451185 0.841711 0.451185 0.646448 0.646446C0.451186 0.841709 0.451186 1.15829 0.646448 1.35355L9.29289 10L0.646446 18.6464Z" fill="#B4B4B7"/>
      </svg> -->
      <form class="form" v-if="preaction">
        <input class="parr" v-model="email" placeholder="email"/>
        <button :disabled="!email" class="boton cta" @click.prevent="autenticate">entrar</button>
      </form>
      <div v-else class="form">
        <p class="parr">Vale, te hemos mandao un email, cierra esta pestaña y sigue desde la que te abrirá el link del email</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import firebase from "firebase";

export default {
	name: 'ModalLogin',
	components: {},
  props: {},
	computed: {
		...mapState(['user']),
    db() {return firebase.firestore();}
	},
	data() {
		return {
			email: null,
      preaction: true
		}
	},
	watch: {},
	created: function() {
	},
  mounted: function(){},
	methods: {
    autenticate() {
      let actionCodeSettings = {
        url: 'https://weclapp.live/dashboard/',
        handleCodeInApp: true
      };
      firebase.auth().sendSignInLinkToEmail(this.email, actionCodeSettings).then(() => {
          // The link was successfully sent. Inform the user.
          // Save the email locally so you don't need to ask the user for it again
          // if they open the link on the same device.
          window.localStorage.setItem('emailForSignIn', this.email);
          this.preaction = false;
          // ...
        })
        .catch((error) => {console.log(error)});
    }
  }
}
</script>

<style scoped lang="scss">
#app .modal {
  backdrop-filter: blur(5px);
  .sub_modal {
    width: clamp(28rem, 30vw, 40rem);
    // height: clamp(40vh,auto,60vh);
    min-height: unset;
    .form {
      
      .parr {color: white}
    }
  }
}
</style>
