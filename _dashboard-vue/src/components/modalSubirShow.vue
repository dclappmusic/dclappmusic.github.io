<template>
  <div class="modal subir_form">
    <div class="sub_modal">
      <svg class="cerrar" @click="$emit('close')" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.646446 18.6464C0.451185 18.8417 0.451184 19.1583 0.646446 19.3536C0.841709 19.5488 1.15829 19.5488 1.35355 19.3536L10 10.7071L18.6464 19.3536C18.8417 19.5488 19.1583 19.5488 19.3536 19.3536C19.5488 19.1583 19.5488 18.8417 19.3536 18.6464L10.7071 10L19.3536 1.35355C19.5488 1.15829 19.5488 0.841709 19.3536 0.646447C19.1583 0.451185 18.8417 0.451185 18.6464 0.646447L10 9.29289L1.35356 0.646446C1.15829 0.451185 0.841711 0.451185 0.646448 0.646446C0.451186 0.841709 0.451186 1.15829 0.646448 1.35355L9.29289 10L0.646446 18.6464Z" fill="#B4B4B7"/>
      </svg>
      <form class="form banda" v-if="new_show.band || edited_band">
        <div v-if="!new_show.band_id || edited_band === 'new'">
          <h3 class="tit">Band</h3>
          <div class="fila band">
            <input class="parr" placeholder="name*" v-model="new_band.name" />
          </div>
          <div class="fila band">
            <input class="parr" placeholder="city" v-model="new_band.city" />
            <input class="parr" placeholder="afin a" v-model="new_band.afin_a" />
            <input class="parr" placeholder="estilo" v-model="new_band.estilo" />
            <input class="parr" placeholder="descripción" v-model="new_band.description" />
            <input class="parr" placeholder="image" v-model="new_band.image" />
          </div>
          <div class="fila band">
            <input class="parr" placeholder="instagram" v-model="new_band.instagram" />
            <input class="parr" placeholder="facebook" v-model="new_band.facebook" />
            <input class="parr" placeholder="youtube" v-model="new_band.youtube" />
            <input class="parr" placeholder="image" v-model="new_band.image" />
          </div>
        </div>
        <div v-if="edited_show">
          <h3 class="tit">Show de {{new_show.band}}</h3>
          <div class="fila show">
            <input class="parr" type="date" v-model="new_show.fecha" placeholder="fecha*"/>
            <input class="parr" type="time" v-model="new_show.hora" placeholder="hora*"/>
            <input class="parr" v-model="new_show.venue" placeholder="sala"/>
          </div>
          <div class="fila show">
            <input class="parr" v-model="new_show.link" placeholder="link"/>
            <input class="parr" v-model="new_show.city" placeholder="ciudad"/>
            <input class="parr" v-model="new_show.festival" placeholder="festival"/>
            </div>
          <div class="fila show">
            <input class="parr" v-model="new_show.lat" placeholder="lat"/>
            <input class="parr" v-model="new_show.lon" placeholder="lon"/>
            </div>
          <div class="fila show">
            <input class="parr" v-model="new_show.image" placeholder="imagen"/>
            <input class="parr" v-model="new_show.price" placeholder="precio"/>
          </div>
        </div>
        <div v-if="edited_show === 'new'" class="fila_botones">
          <button class="boton cta" @click.prevent="subirShow">Subir show</button>
        </div>
        <div v-else-if="edited_band === 'new'" class="fila_botones">
          <button class="boton cta" @click.prevent="subirBand">subir banda</button>
        </div>
        <div v-else-if="edited_show.id" class="fila_botones">
          <button class="boton eliminar" @click.prevent="deleteShow">borrar show</button>
          <button class="boton cta" @click.prevent="editShow">editar show</button>
        </div>
        <div v-else-if="edited_band.id" class="fila_botones">
          <button class="boton eliminar" @click.prevent="deleteBand">borrar banda</button>
          <button class="boton cta" @click.prevent="editBand">editar banda</button>
        </div>
      </form>
      <div class="new_band form" v-else-if="edited_show && !edited_show.id">
        <input class="parr band_name" placeholder="Seleccionar grupo" type="text" v-model="new_band.name" list="filtros">
        <div class="filtradas">
          <div class="banda" v-for="(band, index) in bandas_filtradas" :key="index" @click="elegirBand(band)">
            <p class="parr">{{band.name}}</p>
          </div>
          <button v-if="new_band.name" class="boton cta" @click="new_show.band = new_band.name || ' '">Banda nueva</button>
        </div>
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
  props: {
    edited_band: {},
    edited_show: {}
  },
	computed: {
		...mapState([
			"shows", "bands", "venues", 'user'
		]),
    db() {return firebase.firestore();}
	},
	data() {
		return {
			subir_form: false,
      bandas_filtradas: [],
			new_band: {
        id: null,
				name: null,
        description: null,
				instagram: null,
				youtube: null,
				facebook: null,
				city: null,
        afin_a: null,
        estilo: null,
        image: null
			},
			new_show: {
        id: null,
				link: null,
				band: null,
				band_id: null,
        fecha: null,
        hora: '12:00',
        timestamp: null,
        city: null,
        venue: null,
				festival: null,
        image: null,
        lat: null,
        lon: null,
        price: null
			}
		}
	},
	watch: {
		'new_band.name' () {
			this.bandas_filtradas = this.bands.filter(band => band.name.toLowerCase().includes(this.new_band.name.toLowerCase()));
		}
	},
	created: function() {
    if (this.edited_band?.name) {
      this.new_band = this.edited_band;
    } else if (this.edited_show?.id >= 0) {
      this.new_show = this.edited_show;
      this.new_show.fecha = this.$moment(this.new_show.timestamp).format('YYYY-MM-DD');
      this.new_show.hora = this.$moment(this.new_show.timestamp).format('HH:mm');
    }
	},
  mounted: function(){},
	methods: {
		elegirBand(band) {
			this.new_show.band = band.name;
			this.new_show.band_id = band.id;
			
			this.new_band.id = band.id;
			this.new_band.name = band.name;
			this.new_band.instagram = band.instagram;
			this.new_band.facebook = band.facebook;
			this.new_band.image = band.image;
			this.new_band.location = band.location;
		},
    editBand() {
      this.db.collection("bands").doc('band_' + this.new_band.id).set({
        id: this.new_band.id,
        name: this.new_band.name,
        description: this.new_band.description || null,
        youtube: this.new_band.youtube || null,
        instagram: this.new_band.instagram || null,
        facebook: this.new_band.facebook || null,
        city: this.new_band.city || null,
        afin_a: this.new_band.afin_a || null,
        estilo: this.new_band.estilo || null,
        image: this.new_band.image || null
      }, {merge: true}).then(() => {
        console.log("banda editada");
        this.$emit('close', 'refrescar bands');
      })
    },
    subirBand() {
      const new_band_id = this.bands[0].id + 1;
      this.db.collection("bands").doc('band_' + new_band_id).set({
        id: new_band_id,
        name: this.new_band.name,
        description: this.new_band.description,
        youtube: this.new_band.youtube,
        instagram: this.new_band.instagram,
        facebook: this.new_band.facebook,
        city: this.new_band.city,
        afin_a: this.new_band.afin_a,
        estilo: this.new_band.estilo,
        image: this.new_band.image
      }).then(() => {
        console.log('banda subida');
        if (!this.edited_band && this.new_show.fecha) {
          this.new_show.band_id = new_band_id;
          this.new_show.band_name = this.new_band.name;
          this.subirShow();
        } else {
          this.$emit('close', 'refrescar bands');
        }
      });
    },
    deleteBand() {
      if (window.confirm("Tas seguro?")) {
        this.db.collection("bands").doc('band_' + this.new_band.id).delete().then(() => {
          console.log('banda borrada');
          this.$emit('close', 'refrescar bands');
        })
      }
    },
		subirShow() {
			const show_id = this.shows.length;
			const timestamp = new Date(this.new_show.fecha + ',' + this.new_show.hora).getTime();
      debugger;
			if (!this.bands.find(bnd => bnd.name === this.new_show.band)) {
        this.subirBand();
			} else {
				this.db.collection("shows").doc('show_' + show_id).set({
					id: show_id,
					timestamp: timestamp,
					festival: this.new_show.festival,
					link: this.new_show.link,
          band: this.new_show.band,
          band_id: this.new_show.band_id,
          city: this.new_show.city,
          venue: this.new_show.venue,
          image: this.new_show.image,
          lat: this.new_show.lat,
          lon: this.new_show.lon,
          price: this.new_show.price
				}).then(() => {
          console.log("show subido");
          this.$emit('close', 'refrescar shows');
        })
			}
		},
    editShow() {
      this.db.collection("shows").doc('show_' + this.new_show.id).set({
        id: this.new_show.id,
        timestamp: this.new_show.timestamp || null,
        festival: this.new_show.festival || null,
        link: this.new_show.link || null,
        band: this.new_show.band || null,
        band_id: this.new_show.band_id || null,
        city: this.new_show.city || null,
        venue: this.new_show.venue || null,
        image: this.new_show.image || null,
        lat: this.new_show.lat || null,
        lon: this.new_show.lon || null,
        price: this.new_show.price || null
      }, {merge: true}).then(() => {
        console.log("show editada");
        this.$emit('close', 'refrescar shows');
      })
    },
    deleteShow() {
      if (window.confirm("Tas seguro?")) {
        this.db.collection("shows").doc('show_' + this.new_show.id).delete().then(() => {
          console.log('show borrado');
          this.$emit('close', 'refrescar shows');
        })
      }
    }
	}
}
</script>

<style scoped lang="scss">
#app .modal {
.sub_modal {
  .filtradas .banda .parr {
    cursor: pointer;
    &:hover {text-decoration: underline;}
  }
  .tit {margin-bottom: 1em;}
  .parr, .tit, input {
    color: white!important;
    margin-right: 1em;
  }
  .new_band {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    input {width: 30%;}
    button {text-align: center; margin: 1em 0;}
    .filtradas {flex-basis: 100%}
  }
}
}
</style>
