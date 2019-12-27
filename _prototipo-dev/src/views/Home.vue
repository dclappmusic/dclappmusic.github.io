<template>
    <div class="page home" data-page="home">
        <Header :usuario="this.usuario" />
        <a class="boton btn_preclapp" href="clapp.html">
			<img src="images/icon_clapp.png" />
		</a>
		<div class="intro_clapp">
			<a href="sign_band.html"><h3 class="display-med">applaud<br>the talent</h3></a>
		</div>
    </div>
</template>

<script>
import Header from '@/components/Header';

export default {
	name: 'Home',
    components: {
        Header
    },
	props: ["usuario"],
	data() {
		return{}
	},
	created() {},
	mounted() {},
	methods: {}
}
</script>
<style scoped lang="scss">
//PAGINAS INDIVIDUALES
.page.home {
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
		background-color: var(--color_primario);
		box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.27), 0px 0px 20px rgba(252, 81, 48, 0.2);
		&:hover {box-shadow: none;}
		img {
			display: block;
			margin: 0 auto;
		}
	}
	.intro_clapp {
		position: absolute;
		bottom: 25%;
		width: 80%;
		left: 10%;
		text-align: center;
		color: var(--color_secundario);
		font-family: var(--roboto);
	}
}
</style>
