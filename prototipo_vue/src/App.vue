<template>
	<div id="app" class="container">
		<!-- <Header :usuario="this.usuario" /> -->
		<router-view 
		/>
		<PopupInstall 
			v-if="show_install" 
			:deferredPrompt="this.deferredPrompt" 
			@cerrar_popup="event_cerrar_popup"
		/>
	</div>
</template>

<script>
	// import firebase from 'firebase';
	import Nav from '@/components/Nav';
	import Header from '@/components/Header';
	import PopupInstall from '@/components/PopupInstall';

	export default {
		name: 'app',
		components: {
			Nav,
			Header,
			PopupInstall
		},
		data() {
			return {
                show_install: false,
                deferredPrompt: null
			}
		},
		created() {
			
		},
		mounted() {
			// alert("mounted");
			window.addEventListener('beforeinstallprompt', (e) => {
				// Prevent Chrome 67 and earlier from automatically showing the prompt
				e.preventDefault();
				// alert("before install");
				// Stash the event so it can be triggered later.
				this.deferredPrompt = e;
				
				// Update UI notify the user they can add to home screen
				this.show_install = true;
			});
		},
		methods: {
			
		}
	};
</script>