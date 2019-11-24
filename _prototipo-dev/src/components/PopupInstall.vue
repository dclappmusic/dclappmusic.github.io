<template>
	<div class="install popup">
        <div class="sub_popup">
            <button class="boton-med install" @click="install">Añadir la app a tu móvil</button>
            <button class="boton-secundario cancelar" @click="cerrar">No añadir</button>
        </div>
    </div>
</template>

<script>
	export default {
        name: 'PopupInstall',
        props: ["deferredPrompt"],
		created() {},
		data() {return {}},
		methods: {
            install: function(e) {
                // Show the prompt
                this.deferredPrompt.prompt();
                // Wait for the user to respond to the prompt
                this.deferredPrompt.userChoice
                    .then((choiceResult) => {
                        if (choiceResult.outcome === 'accepted') {
                            console.log('User accepted the A2HS prompt');
                        } else {
                            console.log('User dismissed the A2HS prompt');
                        }
                        this.deferredPrompt = null;
                    });
                this.$emit('cerrar_popup', this.deferredPrompt);
            },
			cerrar: function() {
				this.$emit('cerrar_popup', "install");
			}
		}
	}
</script>
<style scoped lang="scss">
.popup.install .sub_popup {
    // width: 90vw;
    // height: auto;
    .install {width: 100%;}
    .cancelar {
        display: block;
        margin: 10% auto 0;
        background: none;
        text-decoration: underline;
    }
}
</style>