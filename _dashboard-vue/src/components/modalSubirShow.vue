<template>
  <div class="modal subir_form">
    <div class="sub_modal">
      <span class="cerrar">x</span>
      <svg class="cerrar" @click="$emit('close')" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.646446 18.6464C0.451185 18.8417 0.451184 19.1583 0.646446 19.3536C0.841709 19.5488 1.15829 19.5488 1.35355 19.3536L10 10.7071L18.6464 19.3536C18.8417 19.5488 19.1583 19.5488 19.3536 19.3536C19.5488 19.1583 19.5488 18.8417 19.3536 18.6464L10.7071 10L19.3536 1.35355C19.5488 1.15829 19.5488 0.841709 19.3536 0.646447C19.1583 0.451185 18.8417 0.451185 18.6464 0.646447L10 9.29289L1.35356 0.646446C1.15829 0.451185 0.841711 0.451185 0.646448 0.646446C0.451186 0.841709 0.451186 1.15829 0.646448 1.35355L9.29289 10L0.646446 18.6464Z" fill="#B4B4B7"/>
      </svg>
      <div class="new_band" v-if="!new_show.band">
        <label class="parr label">
          Nombre del grupo
          <input class="parr input" placeholder="Insta" type="text" v-model="new_band.name" list="filtros">
          <!-- <p @click="new_show.band = new_band.name" class="parr">Crear banda también</p> -->
          <!-- <datalist id="filtros">
            <option v-for="(band, index) in bandas_filtradas" :key="index" :value="band.name"></option>
          </datalist> -->
        </label>
        <div class="filtradas">
          <div class="banda" v-for="(band, index) in bandas_filtradas" :key="index" @click="elegirBand(band)">
            <p class="parr">{{band.name}}</p>
            <!-- <p class="parr">{{band.insta_user}}</p> -->
          </div>
          <div class="banda" @click="new_show.band = new_band.name">
            <p class="parr">Registrar banda</p>
          </div>
        </div>
        
      </div>
      <div v-if="new_show.band">
        <h3 class="tit">Band</h3>
        <div class="fila band">
          <input class="parr name" placeholder="name" v-model="new_band.name" />
          <input class="parr location" placeholder="location" v-model="new_band.location" />
          <input class="parr insta" placeholder="insta" v-model="new_band.insta" />
          <input class="parr fb" placeholder="facebook" v-model="new_band.facebook" />
          <input class="parr ytube" placeholder="youtube" v-model="new_band.youtube" />
          <input class="parr image" placeholder="image" v-model="new_band.image" />
        </div>
        <h3 class="tit">Show</h3>
        <div class="fila show">
          <input class="parr where" v-model="new_show.timestamp" placeholder="20 may 2020 15:20"/>
          <input class="parr where" v-model="new_show.where" placeholder="link"/>
          <input class="parr fest" v-model="new_show.fest" placeholder="festival"/>
        </div>
        <p class="boton cta" @click="subirShow">Subir show</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import firebase from "firebase";

export default {
	name: 'ModalSubirShow',
	components: {},
	computed: {
		...mapState([
			"shows", "bands", "venues", 'user'
		]),
		band_name() {return this.new_band.name}
	},
	data() {
		return {
			subir_form: false,
			new_band: {
				name: null,
				insta: null,
				instagram: null,
				youtube: null,
				facebook: null,
				city: null,
			},
			new_show: {
				date: null,
				time: null,
				festival: null,
				link: null,
				band: null,
				band_id: null
			}
		}
	},
	watch: {
		band_name() {
			this.bandas_filtradas = this.bands.filter(band => band.name.toLowerCase().includes(this.new_band.name.toLowerCase()));
		}
	},
	created() {
	},
	methods: {
		elegirBand(band) {
			this.new_show.band = band.name;
			this.new_show.band_id = band.id;
			
			this.new_band.id = band.id;
			this.new_band.name = band.name;
			this.new_band.insta = band.insta;
			this.new_band.facebook = band.facebook;
			this.new_band.image = band.image;
			this.new_band.location = band.location;
		},
		subirShow() {
			var db = firebase.firestore();

			const new_band_id = this.bands.length;
			const show_id = this.shows.length;

			const timestamp = new Date(this.new_show.timestamp);

			if (!this.bands.find(bnd => bnd.name === this.new_show.band)) {
				db.collection("bands").doc('band_' + new_band_id).set({
					id: new_band_id,
					name: this.new_band.name,
					youtube: this.new_band.youtube,
					instagram: this.new_band.instagram,
					facebook: this.new_band.facebook,
					city: this.new_band.city,
				}).then(() => {
					console.log("banda subida");
					db.collection("shows").doc('show_' + show_id).set({
						id: show_id,
						timestamp: timestamp,
						festival: this.new_show.festival,
						link: this.new_show.link,
						band_id: this.new_show.band_id,
					}).then(() => console.log("show subido"))
				})
			} else {
				db.collection("shows").doc('show_' + show_id).set({
					id: show_id,
					timestamp: timestamp,
					festival: this.new_show.festival,
					link: this.new_show.link,
					band_id: this.new_show.band_id,
				}).then(() => console.log("show subido"))
			}
		}
	}
}
</script>

<style scoped lang="scss">
.modal {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  .sub_modal {
    position: relative;
    width: 80%;
    // height: 80%;
    background-color: #333;
    padding: 3em;
    border-radius: .25em;
    .cerrar {
      position: absolute;
      top: 2em;
      right: 2em;
      color: white;
              cursor: pointer;
              padding: 1em;
    }
          .filtradas .banda .parr {
              cursor: pointer;
              &:hover {text-decoration: underline;}
          }
    .parr, .tit, input {
      color: white!important;
      margin-right: 1em;
    }
    .boton {
      background-color: white;
      color: #333;
      padding: 1em;
      margin: 1em auto;
      display: inline-block;
      border-radius: .25em;
      cursor: pointer;
    }
  }
}

</style>
