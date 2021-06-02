<template>
  <div class="modal subir_form">
    <div class="sub_modal">
      <svg class="cerrar" @click="$emit('close')" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.646446 18.6464C0.451185 18.8417 0.451184 19.1583 0.646446 19.3536C0.841709 19.5488 1.15829 19.5488 1.35355 19.3536L10 10.7071L18.6464 19.3536C18.8417 19.5488 19.1583 19.5488 19.3536 19.3536C19.5488 19.1583 19.5488 18.8417 19.3536 18.6464L10.7071 10L19.3536 1.35355C19.5488 1.15829 19.5488 0.841709 19.3536 0.646447C19.1583 0.451185 18.8417 0.451185 18.6464 0.646447L10 9.29289L1.35356 0.646446C1.15829 0.451185 0.841711 0.451185 0.646448 0.646446C0.451186 0.841709 0.451186 1.15829 0.646448 1.35355L9.29289 10L0.646446 18.6464Z" fill="#B4B4B7"/>
      </svg>
      <form class="form banda">
        <h3 class="tit">{{title}}</h3>
        <formBand v-if="edited_band" :edited_band="edited_band" :new_band="new_band" />
        <formVenue v-if="edited_venue" :edited_venue="edited_venue" :new_venue="new_venue" />
        <div v-if="edited_show">
          <h3 class="tit">Show de {{new_show.band}}</h3>
          <div class="fila show">
            <template>
              <input class="parr band_name" placeholder="Seleccionar grupo" type="text" 
                v-model="new_band.name" list="filtros"
                :disabled="edited_show != 'new'"
              />
              <ul class="filtradas" v-if="bandas_filtradas.length">
                <li class="banda" v-for="(band, index) in bandas_filtradas" :key="index" @click="elegir('band', band)">
                  <p class="parr">{{band.name}}</p>
                </li>
              </ul>
            </template>
            <input class="parr" type="date" v-model="new_show.fecha" placeholder="fecha*"/>
            <input class="parr" type="time" v-model="new_show.hora" placeholder="hora*"/>
          </div>
          <div class="fila location">
            <vs-radio v-model="location_type" val="venue">
              <template>
                <input class="parr band_name" placeholder="Seleccionar venue" type="text" 
                  v-model="new_venue.name" list="filtros"
                  v-on:focusin="location_type = 'venue'"
                />
                <ul class="filtradas" v-if="venues_filtradas.length">
                  <li class="venue" v-for="(venue, index) in venues_filtradas" :key="index" @click="elegir('venue', venue)">
                    <p class="parr">{{venue.name}}</p>
                  </li>
                </ul>
              </template>
            </vs-radio>
            <vs-radio v-model="location_type" val="streaming" class="parr">Streaming</vs-radio>
            <vs-radio v-model="location_type" val="otros" class="parr">Otros</vs-radio>
          </div>
          <div class="fila show">
            <input class="parr" v-model="new_show.price" placeholder="precio"/>
            <input class="parr" v-model="new_show.link" placeholder="link"/>
            <input :disabled="new_venue.id == null" class="parr" v-model="new_show.city" placeholder="ciudad"/>
            <input class="parr" v-model="new_show.festival" placeholder="festival"/>
            </div>
        </div>
        <div class="fila_botones">
          <template v-if="edited_show === 'new'">
            <button class="boton cta" :disabled="disable || !new_show.fecha || !new_show.hora || !new_show.band" @click.prevent="subirShow">subir show</button>
          </template>
          <template v-else-if="edited_band === 'new'">
            <button class="boton cta" :disabled="disable || !new_band.name" @click.prevent="subirBand">subir banda</button>
          </template>
          <template v-else-if="edited_venue === 'new'">
            <button class="boton cta" :disabled="disable || !new_venue.name" @click.prevent="subirVenue">subir venue</button>
          </template>
          <template v-else-if="edited_show.id">
            <button class="boton eliminar" :disabled="disable" @click.prevent="deleteShow">borrar show</button>
            <button class="boton cta" :disabled="disable || !new_show.fecha || !new_show.hora || !new_show.band" @click.prevent="editShow">guardar cambios</button>
          </template>
          <template v-else-if="edited_band.id">
            <button class="boton eliminar" :disabled="disable" @click.prevent="deleteBand">borrar banda</button>
            <button class="boton cta" :disabled="disable || !new_band.name" @click.prevent="editBand">guardar cambios</button>
          </template>
          <template v-else-if="edited_venue.id">
            <button class="boton eliminar" :disabled="disable" @click.prevent="deleteVenue">borrar venue</button>
            <button class="boton cta" :disabled="disable || !new_venue.name" @click.prevent="editVenue">guardar cambios</button>
          </template>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import firebase from "firebase";
import formBand from "@/components/formBand";
import formVenue from "@/components/formVenue";

export default {
	name: 'ModalSubirShow',
	components: {formBand, formVenue},
  props: {
    edited_band: {},
    edited_show: {},
    edited_venue: {},
  },
	computed: {
		...mapState([
			"shows", "bands", "venues", 'user'
		]),
    db() {return firebase.firestore()},
    st() {return firebase.storage()}
	},
	data() {
		return {
			subir_form: false,
      title: '',
      location_type: 'venue',
      bandas_filtradas: [],
      venues_filtradas: [],
      disable: false,
      band_image_cambiada: false,
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
        image: null,
        image_url: null
			},
			new_show: {
        id: null,
				band: null,
				band_id: null,
        venue: null,
        venue_id: null,
				link: null,
        fecha: null,
        hora: '12:00',
        timestamp: null,
        city: null,
				festival: null,
        image: null,
        lat: null,
        lon: null,
        price: null
			},
			new_venue: {
        id: null,
        name: null,
        lat: null,
        lon: null,
        city: null,
        logo: null,
        web: null,
        capacity: null
			}
		}
	},
	watch: {
		'new_band.name': {
      handler(newComponents, oldComponents) {
        if (this.new_show.band_id == null || (this.new_show.band_id !== null && (oldComponents?.length > newComponents?.length))) {
          this.new_show.band = null;
          this.new_show.band_id = null;
          this.bandas_filtradas = this.bands.filter(band => band.name ? band.name.toLowerCase().includes(this.new_band.name.toLowerCase()) : '');
        }
      }
		},
		'new_venue.name': {
      handler(newComponents, oldComponents) {
        if (this.new_show.venue == null || (this.new_show.venue !== null && (oldComponents?.length > newComponents?.length))) {
            this.new_show.venue = null;
            this.new_show.venue_id = null;
            this.venues_filtradas = this.venues.filter(venue => venue.name ? venue.name.toLowerCase().includes(this.new_venue.name.toLowerCase()) : '');
        }
      }
		},
    location_type() {
      if (this.location_type != 'venue') {
        this.new_venue.name = null;
        this.new_show.venue_id = 0;
        this.new_show.venue = this.location_type;
      }
    },
    'new_band.image'() {
      this.band_image_cambiada = true;
    }
	},
	created: function() {
    if (this.edited_band) {
      this.title = 'Crear banda';
      if (this.edited_band?.name) {
        this.new_band = this.edited_band;
        this.title = 'Editar banda';
      }
    } else if (this.edited_show) {
      this.title = 'Crear show';
      if (this.edited_show?.id >= 0) {
        this.new_show = {...this.edited_show};
        this.new_show.fecha = this.new_show.timestamp ? this.$moment(this.new_show.timestamp).format('YYYY-MM-DD') : null;
        this.new_show.hora = this.new_show.timestamp ? this.$moment(this.new_show.timestamp).format('HH:mm') : null;
        this.new_band = this.bands.find(bnd => bnd.id === this.new_show.band_id) || {name: this.new_show.band};
        if (this.new_show.venue_id) this.new_venue = this.venues.find(vne => vne.id === this.new_show.venue_id);
        else { this.new_venue.name = this.new_show.venue || ""; }
        this.title = 'Editar show';
      }
    } else if (this.edited_venue) {
      this.title = 'Crear venue';
      if (this.edited_venue?.id >= 0) {
        this.title = 'Editar venue';
        this.new_venue = {...this.edited_venue};
      }
    }
	},
  mounted: function(){},
	methods: {
		elegir(tipo, elegido) {
      if (tipo === 'band') {
        this.bandas_filtradas = [];
        this.new_show.band = elegido.name;
        this.new_show.band_id = elegido.id;
        this.new_band = {...elegido};
      } else if (tipo === 'venue') {
        this.new_show.venue = elegido.name;
        this.venues_filtradas = [];
        this.new_show.venue_id = elegido.id;
        if (elegido.lat) {
          this.new_show.lat = elegido.lat;
          this.new_show.lon = elegido.lon;
        }
        if (elegido.city) this.new_show.city = elegido.city;
        this.new_venue = {...elegido};
      }
		},
    editBand() {
      this.disable = true;
      if (this.band_image_cambiada) {
        const upload = this.st.ref('band_images/' + this.new_band.id).put(this.new_band.image);
        upload.on('state_changed', (snapshot) => {
          let progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          console.log('Upload is ' + progress + '% done');
        }, (error) => {
          console.log("error:");
          console.log(error);
        }, () => {
          upload.snapshot.ref.getDownloadURL().then((url) => {
            console.log("imagen guardada en: " + url);
            this.new_band.image_url = url;
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
              image: this.new_band.image_url || null
            }, {merge: true}).then(() => {
              console.log("banda editada");
              this.$emit('close', 'refrescar bands');
            })
          });
        });
      } else {
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
          image: this.new_band.image_url || null
        }, {merge: true}).then(() => {
          console.log("banda editada");
          this.$emit('close', 'refrescar bands');
        })
      }
    },
    subirBand() {
      this.disable = true;
      this.new_band.id = this.bands[0].id + 1;
      if (!this.bands.find(bnd => bnd.id === this.new_band.id)) {
        if (this.new_band.image) {
          const upload = this.st.ref('band_images/' + this.new_band.id).put(this.new_band.image);
          upload.on('state_changed', (snapshot) => {
						let progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
						console.log('Upload is ' + progress + '% done');
					}, (error) => {
						console.log("error:");
						console.log(error);
					}, () => {
						upload.snapshot.ref.getDownloadURL().then((url) => {
							console.log("imagen guardada en: " + url);
							this.new_band.image_url = url;
              this.db.collection("bands").doc('band_' + this.new_band.id).set({
                id: this.new_band.id,
                name: this.new_band.name,
                description: this.new_band.description,
                youtube: this.new_band.youtube,
                instagram: this.new_band.instagram,
                facebook: this.new_band.facebook,
                city: this.new_band.city,
                afin_a: this.new_band.afin_a,
                estilo: this.new_band.estilo,
                image: this.new_band.image_url
              }).then(() => {
                console.log('banda subida');
                  this.$emit('close', 'refrescar bands');
              });
						});
					});
        } else {
          this.db.collection("bands").doc('band_' + this.new_band.id).set({
            id: this.new_band.id,
            name: this.new_band.name,
            description: this.new_band.description,
            youtube: this.new_band.youtube,
            instagram: this.new_band.instagram,
            facebook: this.new_band.facebook,
            city: this.new_band.city,
            afin_a: this.new_band.afin_a,
            estilo: this.new_band.estilo,
            image: this.new_band.image_url
          }).then(() => {
            console.log('banda subida');
            // if (!this.edited_band && this.new_show.fecha) {
            //   this.new_show.band_id = this.new_band.id;
            //   this.new_show.band = this.new_band.name;
            //   this.subirShow();
            // } else {
              this.$emit('close', 'refrescar bands');
            // }
          });

        }
      } else {
        alert('ya hay una banda con ese id, mandarle pantallazo de esto a Rober');
      }
    },
    deleteBand() {
      if (window.confirm("Tas seguro?")) {
        this.disable = true;
        if (this.new_band.image) {
          this.st.ref().child('band_images/' + this.new_band.id).delete();
        }
        this.db.collection("bands").doc('band_' + this.new_band.id).delete().then(() => {
          console.log('banda borrada');
          this.$emit('close', 'refrescar bands');
        })
      }
    },
		subirShow() {
      debugger;
      this.disable = true;
      this.shows.sort((a,b) => b.id - a.id);
			const show_id = this.shows[0].id + 1;
			const timestamp = this.$moment(this.new_show.fecha + ' ' + this.new_show.hora).unix()*1000;
			if (!this.bands.find(bnd => bnd.name === this.new_show.band) && !this.new_band.id) {
        this.subirBand();
			} else {
        if (!this.shows.find(sho => sho.id === show_id)) {
          this.db.collection("shows").doc('show_' + show_id).set({
            id: show_id,
            timestamp: timestamp,
            festival: this.new_show.festival,
            link: this.new_show.link,
            band: this.new_show.band,
            band_id: this.new_show.band_id,
            city: this.new_show.city,
            venue: this.new_show.venue,
            venue_id: this.new_show.venue_id,
            image: this.new_show.image,
            lat: this.new_show.lat,
            lon: this.new_show.lon,
            price: this.new_show.price
          }).then(() => {
            console.log("show subido");
            this.$emit('close', 'refrescar shows');
          })
        } else {
          alert('ya hay un show con ese id, mandarle pantallazo de esto a Rober');
        }
			}
		},
    editShow() {
      this.disable = true;
      const timestamp = this.$moment(this.new_show.fecha + ' ' + this.new_show.hora).unix()*1000;
      this.db.collection("shows").doc('show_' + this.new_show.id).set({
        id: this.new_show.id,
        timestamp: timestamp || null,
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
      this.disable = true;
      if (window.confirm("Tas seguro?")) {
        this.db.collection("shows").doc('show_' + this.new_show.id).delete().then(() => {
          console.log('show borrado');
          this.$emit('close', 'refrescar shows');
        })
      }
    },
    editVenue() {
      debugger;
      this.disable = true;
      this.db.collection("venues").doc('venue_' + this.new_venue.id).set({
        id: this.new_venue.id,
        name: this.new_venue.name || null,
        lat: this.new_venue.lat || null,
        lon: this.new_venue.lon || null,
        city: this.new_venue.city || null,
        logo: this.new_venue.logo || null,
        web: this.new_venue.web || null,
        capacity: this.new_venue.capacity || null
      }, {merge: true}).then(() => {
        console.log("venue editada");
        this.$emit('close', 'refrescar venues');
      })
    },
    subirVenue() {
      this.disable = true;
      this.new_venue.id = this.venues[0].id + 1;
      if (!this.venues.find(ven => ven.id === this.new_venue.id)) {
        this.db.collection("venues").doc('venue_' + this.new_venue.id).set({
          id: this.new_venue.id,
          name: this.new_venue.name,
          lat: this.new_venue.lat,
          lon: this.new_venue.lon,
          city: this.new_venue.city,
          logo: this.new_venue.logo,
          web: this.new_venue.web,
          capacity: this.new_venue.capacity
        }).then(() => {
          console.log('venue subida');
          if (!this.edited_venue && this.new_show.fecha) {
            this.new_show.venue_id = this.new_venue.id;
            this.new_show.venue = this.new_venue.name;
            this.subirShow();
          } else {
            this.$emit('close', 'refrescar venues');
          }
        });
      } else {
        alert('ya hay una venue con ese id, mandarle pantallazo de esto a Rober');
      }
    },
    deleteVenue() {
      if (window.confirm("Tas seguro?")) {
        this.disable = true;
        this.db.collection("venues").doc('venue_' + this.new_venue.id).delete().then(() => {
          console.log('venue borrada');
          this.$emit('close', 'refrescar venues');
        })
      }
    },
	}
}
</script>

<style scoped lang="scss">
#app .modal .sub_modal {
  .filtradas li .parr {
    cursor: pointer;
    &:hover {text-decoration: underline;}
  }
  .tit {margin-bottom: 1em;}
  ::v-deep .parr, .tit, input {
    color: white!important;
    margin-right: 1em;
  }
  .fila.location {
    display: flex;
    align-items: center;
  }
  // .new_band {
  //   display: flex;
  //   flex-flow: row;
  //   align-items: center;
  //   justify-content: flex-start;
  //   flex-wrap: wrap;
  //   input {width: 30%;}
  //   button {text-align: center; margin: 1em 0;}
  // }
  .filtradas {
    position: absolute;
    background-color: #444;
    padding: .5em;
    margin-top: -.9em;
    box-shadow: 0 5px 5px rgba(0,0,0, .3);
    z-index: 10;
  }
}
</style>
