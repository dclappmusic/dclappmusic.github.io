<template>
	<div class="login popup">
        <div class="sub_popup">
            <div class="form">
                <div>
                    <label class="form-label email">Email
                        <input class="form-input" placeholder="email" type="email" v-model="user_email">
                    </label>
                    <label v-if="cta_text != 'restablecer'" class="form-label password">Password
                        <input class="form-input password" placeholder="password" type="password" v-model="user_password">
                    </label>
                </div>
                <button class="boton cta" @click="cta(cta_text)">
                    {{cta_text}}
                </button>
                <div>
                    <a class="login_btn" v-if="cta_text != 'login'" @click="mostrar_login">atrás</a>
                    <a class="reset_btn" v-if="cta_text === 'login'" @click="mostrar_reset">restablecer contraseña</a>
                    <a class="signup_btn" v-if="cta_text === 'login'" @click="mostrar_signup">crear una cuenta</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import firebase from 'firebase';

	export default {
		name: 'PopupLogin',
		created() {},
		mounted() {},
		data() {
			return {
				user_email: "",
				user_password: "",
                cta_text: "login"
			}
		},
		props: {},
		methods: {
			login: function() {
				const auth = firebase.auth();

				//autenticar el login
				auth.signInWithEmailAndPassword(this.user_email, this.user_password).then(() => {
					//redirigir a index
					var user = auth.currentUser;
					this.$router.replace("/");
					console.log("logged");
				}).catch((error) => {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					window.alert("error: " + errorMessage);
				});
			},
            signup: function() {
				const auth = firebase.auth();
                //crear login de usuario
                auth.createUserWithEmailAndPassword(this.user_email, this.user_password)
                    .then(() => {
                        //añadir el usuario a la DB
						firebase.firestore().collection("fans").doc(auth.currentUser.uid).set({
                            uid: auth.currentUser.uid,
                            email: this.user_email
						}).then(() => {
							console.log("signup correcto");
						});
					});
			},
			reset: function() {
				firebase.auth().sendPasswordResetEmail(this.user_email).then(() => {
					console.log("reseteando");
					alert("Revisa tu email para poner una contraseña");
					// $(".form").append("<p>Revisa tu email para poner una contraseña</p>");
				}).catch((error) => {
				// An error happened.
					console.log(error);
				});
			},
			mostrar_reset: function() {
                this.cta_text = "restablecer";
			},
            mostrar_signup: function() {
                this.cta_text = "signup";
			},
            mostrar_login: function() {
                this.cta_text = "login";
            },
            cta: function(accion) {
                if (accion === "login") {
                    this.login();
                } else if (accion === "signup") {
                    this.signup();
                } else if(accion === "restablecer") {
                    this.reset();
                }
            }
		}   
	}
</script>