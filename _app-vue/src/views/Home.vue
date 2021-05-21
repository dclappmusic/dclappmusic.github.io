<template>
    <div class="page home" data-page="home">
			<!-- <Header :user="this.user" /> -->
			<!-- <router-link class="boton btn_preclapp" to="/clapp">
					<img src="@/assets/images/iconClapp_white.svg" />
			</router-link> -->
			<router-link class="boton btn_premap" to="/agenda">
					<img src="images/find_shows_button.png" />
			</router-link>
			<div class="intro_clapp">
				<h3 class="display-med">
					Tap to<br>
					<b>find shows</b><br>
					nearby
				</h3>
				<img src="images/clapp_soon.png" />
			</div>
			<div class="overlay" v-if="show_overlay" @click="show_overlay = false">
				<div class="ov_box">
					<p>{{overlay_msgs.msg}}</p>
				</div>
			</div>
    </div>
</template>

<script>
// import Header from '@/components/Header';

export default {
	name: 'Home',
    components: {
        // Header
    },
	props: ["user"],
	data() {
		return{
            show_overlay: false,
            overlay_msgs: {
                msg: "",
                clapp: "Próximamente"
            }
        }
	},
	created() {},
	mounted() {},
	methods: {
        overlay: function(msg) {
            clearTimeout(timeout);
            let timeout;
            this.show_overlay = true;
            this.overlay_msgs.msg = this.overlay_msgs[msg];
            timeout = setTimeout(()=> {
                this.show_overlay = false;
            }, 1700);
        },
    }
}
</script>
<style scoped lang="scss">
//PAGINAS INDIVIDUALES
.page.home {
	background-color: var(--color-fondo-light); 
	.options {
		.options_login {
			display: none;
			position: fixed;
			width: 5em;
			background: white;
			right: 3em;
			top: 15px;
			padding: .5em .7em;
			&.active {display: block;}
		}
	}
	.btn_preclapp {
		position: absolute;
		top: 25%;
		left: calc(50% - 90px);
		width: 180px;
		height: 180px;
		text-align: center;
		display: flex;
		align-items: center;
		border-radius: 100%;
		background-color: var(--color-primario-fans);
		box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.27), 0px 0px 20px rgba(252, 81, 48, 0.2);
		&:hover {box-shadow: none;}
		img {
			display: block;
			margin: 0 auto;
		}
	}
	.btn_premap {
		position: absolute;
		top: 17%;
		left: calc(50% - 90px);
		width: 180px;
		background-color: transparent;
		box-shadow: none;
		padding: 0;
		&:hover img {filter: none;}
		img {
			filter: drop-shadow(0px 0px 20px rgba(12, 56, 71, 0.2)) drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.27));
			display: block;
			margin: 0 auto;
		}
	}
	.intro_clapp {
		position: absolute;
		bottom: 15%;
		width: 80%;
		left: 10%;
		text-align: center;
		color: var(--color-primario-bands);
		font-family: var(--roboto);
		.display-med {
			font-weight: 100;
			margin-bottom: 1em;
			b {font-weight: bold;}
		}
	}
}
</style>
