<template>
    <div class="page clapp">
        <get-geolocation @geolocationError="geolocationError" :findLocation="findLocation"/>
        <svg @click="$router.go(-1)" class="back" width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.939341 10.9393C0.353554 11.5251 0.353554 12.4749 0.939341 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97919 12.6066 1.3934C12.0208 0.807611 11.0711 0.807611 10.4853 1.3934L0.939341 10.9393ZM26 10.5L2 10.5V13.5L26 13.5V10.5Z" fill="white"/>
        </svg>

        <div v-if="show_founded" class="band close">
            <p class="parrafo clapps">{{clapps}}</p>
            <!-- <p class="titulo animation">
                {{clapp_animacion[clapp_step]}}
            </p> -->
            <p class="titulo tap" 
                v-touch:start="startHandler" 
                v-touch:end="endHandler"
                v-touch="touchHandler"
                v-touch:longtap="longtapHandler"
            >
               {{clapp_animacion[clapp_step]}}
            </p>
            <router-link :to='{ name: "sub", params: {from: "clapp", sub_page: "sub_profile_band", id: band_closest.id }}'>
                <p class="titulo name">
                    {{band_closest.name}}
                </p>
            </router-link>
            <div class="background">
                <span class="overlay"></span>
                <img class="image_band" :src="band_closest.image" />
            </div>
        </div>
        <div v-else-if="showFar_closest" class="band far">
            <p class="titulo tap">
                no shows cerca.
                el más cercano es 
            </p>
            <p class="titulo name">
                {{showFar_closest.band}}
            </p>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from "firebase"
import GetGeolocation from '@/components/GetGeolocation'
export default {
	name: 'Clapp',
    components: {
        GetGeolocation
    },
    computed: {
        ...mapState([
            "geolocation", "shows", "bands"
        ]),
    },
	data() {
		return{
            user_id: 11111,
            distance_max: 0.013,
            distance: null,
            show_closest: null,
            band_closest: null,
            shows_close: [],
            shows_far: [],
            showFar_closest: null,
            show_founded: false,
            shows_active: [],
            clapp_time: 0,
            clapp_taps: 0,
            clapp_start: null,
            clapps: 0,
            clapp_animacion: [
                "tap to clapp", "beh", "guay", "la ostia", "wooooooooow"
            ],
            clapp_step: 0,
            clapp_step_init: 0,
            interval: null,
            upload_timer: null,
            findLocation: false
        }
	},
    watch: {
        clapp_time() {
            console.log(this.clapp_time);
            const clapp_value =  Math.round(this.clapp_time/100);
            clapp_value < 1 ? this.clapp_taps++ : this.clapps += clapp_value;
        },
        clapp_taps() {
            this.clapps++;
        },
        geolocation() {
            this.filter_shows_today();
            this.arrangeShows();
        },
        clapps() {
            if (this.clapps > 10) {
                if (this.clapps > 20) {
                    this.clapp_step_init = 2;
                } else {
                    this.clapp_step_init = 1;
                }
            } else {this.clapp_step_init = 0;}
        },
        shows() {
            this.filter_shows_today();
            this.arrangeShows();
        }
    },
	created() {
        if (this.geolocation && this.shows) {
            this.filter_shows_today();
            this.arrangeShows();
        } else {
            // let waiting = setInterval(() => {
            //     this.clapp_step < 3 ? this.clapp_step++ : '';
            // }, 1000);
        }
    },
	mounted() {
    },
	methods: {
        filter_shows_today: function() {
            console.log('filtering');
            const hoy = this.$moment();
            this.shows.forEach(show => {
                const show_time = this.$moment(show.timestamp);
                const diff = show_time.diff(hoy, 'hours');
                if (diff > -1 && diff < 1 ) {
                    this.shows_active.push(show);
                }
            });
        },
        arrangeShows() {
            console.log('arranging shows');
            this.shows_active.forEach((Ishow_activo) => {
                Ishow_activo.position = {lat: Ishow_activo.lat, lon: Ishow_activo.lon};
                if (this.isCerca(Ishow_activo.position, this.geolocation)) {
                    this.show_founded = true;
                    Ishow_activo.distance = this.distance;
                    this.shows_close.push(Ishow_activo);
                } else {
                    Ishow_activo.distance = this.distance;
                    this.shows_far.push(Ishow_activo);
                }
            });
            this.shows_close.sort((a, b) => a.distance - b.distance);
            this.shows_far.sort((a, b) => a.distance - b.distance);

            this.show_closest = this.shows_close[0];
            this.showFar_closest = this.shows_far[0];

            if (this.show_closest) {
                this.band_closest = this.getBand(this.show_closest.band_id);
            }
        },
        isCerca: function(posicion1, posicion2) {
            this.distance = Math.pow((Math.pow(posicion1.lat - posicion2.lat, 2) + Math.pow(posicion1.lon - posicion2.lon,2)), 0.5);
            return this.distance <= this.distance_max;
        },
        getBand(band_id) {
            console.log('get band');
            return this.bands.find(band => band.id === band_id);
        },
        // clapp() {
        //     this.clapps++;
        // },
        touchHandler(e) {
            // const touch = this.$moment(e.timeStamp).millisecond();
            console.log(e + 'touch');
            // this.clapps += 1;
        },
        startHandler(e) {
            clearInterval(this.upload_timer);
            this.clapp_step = this.clapp_step_init;
            this.interval = setInterval(() => {
                this.clapp_step < 3 ? this.clapp_step++ : '';
            }, 500);

            const empieza = this.$moment(e.timeStamp).millisecond();
            console.log('start: ' + empieza);
            this.clapp_start = empieza;
            
        },
        endHandler(e) {
            clearInterval(this.interval);
            setTimeout(() => {this.clapp_step = 0;}, 1000);

            const termina = this.$moment(e.timeStamp);
            console.log('end:' + termina.millisecond());
            this.clapp_time = termina.subtract(this.clapp_start, 'milliseconds').millisecond();

            this.upload_timer = setTimeout(() => {
                this.uploadClapps();
            }, 3000);
        },
        longtapHandler(e) {
            console.log(e);
        },
        uploadClapps() {
            let doc_name = this.user_id + '-' + this.show_closest.band_id + '-' + this.clapps;
            let clapp_ob = {
                band_id: this.band_closest.id,
                show_id: this.show_closest.show_id,
                user_id: this.user_id,
                clapp_time: this.clapp_time,
                clapp_taps: this.clapp_taps,
                timestamp: new Date()
            }
            firebase.firestore().collection("clapps").doc(doc_name).set(clapp_ob).then(() => {
                console.log("clapp uploaded");
                this.postclapp('band_profile')
            })
        },
        postclapp(type) {
            if (type === 'band_profile') {
                this.$router.push({ name: "sub", params: {from: "postclapp", sub_page: "sub_profile_band", id: this.band_closest.id }});
            }
        },
        geolocationError(error) {
            alert(error);
        }
    }
}
</script>
<style scoped lang="scss">
.clapp {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: var(--color-primario-fans);
    z-index: -1;
    // background-blend-mode: screen;
    .band {
        width: 100%;
        height: 100%;
        .animation {
            position: absolute;
            top: 20vh;
            width: 100%;
            font-size: 15vw;
            text-align: center;
            color: var(--color-primario-bands);
            transition: all .5s ease-in-out;
        }
        .clapps {
            position: absolute;
            top: 20px;
            right: 20px;
            color: var(--color-primario-bands);
        }
        .name {
            position: absolute;
            width: 100%;
            bottom: 20vh;
            font-size: 15vw;
            color: var(--color-primario-bands);
            text-align: center;
            line-height: 85%;
        }
        .tap {
            position: absolute;
            top: 40vh;
            width: 100%;
            color: white;
            font-weight: 500;
            font-size: 35px;
            line-height: 26px;
            text-align: center;
        }
        .background {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: -1;
            .image_band {
                width: 100%;
                height: 100%;
                object-fit: cover;
            } 
            .overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--color-primario-fans);
                mix-blend-mode: screen;
            }
        }
    }
}
</style>
