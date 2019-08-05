<template>
	<div class="view_container lista_page">
		
	</div>
</template>

<script>
	// import firebase from 'firebase';

	export default {
		name: 'agenda',
		props:[""],
		components: {
			
		},
		created() {
			// firebase.firestore().collection("usuarios").where("empresa", "==", this.usuario.empresa).get().then((querySnapshot) => {
            //     querySnapshot.forEach((doc) => {
            //         var data = doc.data();
            //         this.empleados.push(data);
			// 	});
			// 	this.$emit('empleados_events', this.empleados);
			// });
		},
		mounted() {},
		data() {
			return {
				// empleados: [],
				// registrar: false
			}
		},
		methods: {
			popup: function() {
				this.registrar = true
			},
			cerrarPopup_event: function() {
				this.registrar = false;
			}
		}
	}
</script>