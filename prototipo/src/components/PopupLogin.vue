<template>
	<div class="login popup">
        <div class="sub_popup">
            <div class="form">
                <label class="form-label email">Email
                    <input class="form-input" placeholder="email" type="email" v-model="user_email">
                </label>
                <label class="form-label password">Password
                    <input class="form-input password" placeholder="password" type="password" v-model="user_password">
                </label>
                <button class="boton cta" @click="cta(cta_text)">
                    {{cta_text}}
                </button>
                <button class="boton-med reset" @click="reset">resetear contraseña</button>
                <a class="reset_btn" @click="mostrar_reset">resetear contraseña</a>
                <a class="signup_btn" @click="mostrar_signup">crear una cuenta</a>
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
					// firestore.collection("usuarios").where("email", "==", email).
					this.$router.replace("fichaje");
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
				const auth = firebase.auth();
				auth.sendPasswordResetEmail(this.user_email).then(() => {
					console.log("reseteando");
					alert("Revisa tu email para poner una contraseña");
					$(".form").append("<p>Revisa tu email para poner una contraseña</p>");
				}).catch((error) => {
				// An error happened.
					console.log(error);
				});
			},
			mostrar_reset: function() {
				$(".password").toggle();
				$(".login").toggle();
				$(".reset").toggle();
				if ($(".reset_btn").text() === "cambiar contraseña") {
					$(".reset_btn").text("atras");
				} else {
					$(".reset_btn").text("cambiar contraseña");
				}
			},
            mostrar_signup: function() {
                this.cta_text = "signup";
                // this.cta = this.cta_signup();
				// $(".login").toggle();
				// $(".reset").toggle();
                // $(".signup").toggle();
				// if ($(".reset_btn").text() === "cambiar contraseña") {
				// 	$(".reset_btn").text("atras");
				// } else {
				// 	$(".reset_btn").text("cambiar contraseña");
				// }
			},
            cta: function(accion) {
                if (accion === "login") {
                    this.login();
                } else if (accion === "signup") {
                    this.signup();
                }
            }
		}   
	}
</script>