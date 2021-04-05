<template>
	<div class="login popup">
		<div class="sub_popup">
			<form class="form" @submit.prevent>
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
					<a class="login_btn" v-if="cta_text != 'login'" @click="show_login">atrás</a>
					<a class="reset_btn" v-if="cta_text === 'login'" @click="show_reset">restablecer contraseña</a>
					<a class="signup_btn" v-if="cta_text === 'login'" @click="show_signup">crear una cuenta</a>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import firebase from 'firebase';

	export default {
		name: 'PopupLogin',
		props: {},
		data() {
			return {
				user_email: "",
				user_password: "",
				cta_text: "login"
			}
		},
		created() {},
		mounted() {},
		methods: {
			login() {
				const auth = firebase.auth();

				//authenticate the login
				auth.signInWithEmailAndPassword(this.user_email, this.user_password).then(() => {
					//redirect to home
					// this.$router.replace("/");
					console.log("logged");
				}).catch((error) => {
					window.alert("error " + error.code + ": " + error.message);
				});
			},
			signup() {
				const auth = firebase.auth();
				//create user
				auth.createUserWithEmailAndPassword(this.user_email, this.user_password.then(() => {
				//add user to firestore
					firebase.firestore().collection("fans").doc(auth.currentUser.uid).set({
						uid: auth.currentUser.uid,
						email: this.user_email
					}).then(() => {
						console.log("signup correcto");
					});
				}));
			},
			reset() {
				firebase.auth().sendPasswordResetEmail(this.user_email).then(() => {
					console.log("reseteando");
					alert("Revisa tu email para poner una contraseña");
				}).catch((error) => {
					console.log(error);
				});
			},
			show_reset() {
				this.cta_text = "restablecer";
			},
			show_signup() {
				this.cta_text = "signup";
			},
			show_login() {
				this.cta_text = "login";
			},
			cta(action) {
				if (action === "login") {
					this.login();
				} else if (action === "signup") {
					this.signup();
				} else if(action === "restablecer") {
					this.reset();
				}
			}
		}   
	}
</script>
<style scoped lang="scss">
.form {
	margin: 5% auto;
	width: 100%;
	.titulo {
		text-align: center;
		margin-bottom: 2em;
	}
	.form-label {color: #333;}
	.form-input {
		display: block;
		width: 100%;
		border-radius: .2em;
		box-shadow: 0 0 5px rgba(0,0,0,.15);
		text-align: center;
		background: transparent;
		border: none;
		border-bottom: 4px solid white;
		font-family: var(--changa);
		font-size: 25px;
		font-weight: 600;
		color: white;
		&::placeholder {opacity: .5; color: white; font-weight: 200;}
	}

	.reset {display: none;}
	.reset_btn {
		display: block;
		text-align: center; 
		width: 100%; 
		text-decoration: underline!important;
		margin-top: 2em;
		color: #333;
	}
}
</style>