<template>
     <div class="page subir">
        <!-- <PopupLogin v-if="!user"/> -->
        <div class="cabecera">
            <h1>Subir un show</h1>   
       </div>
       <div class="view">
            <form>
                <p class="titulo" v-if="band_exist">{{band_exist.name}}</p>
                <div class="new_band" v-if="!band_exist">
                    <label class="form-label">
                        Perfil de instagram
                        <input class="form-input" placeholder="Insta" type="text" v-model="band_instagram">
                    </label>
                    <label class="form-label">
                        Perfil de facebook
                        <input class="form-input" placeholder="Facebook" type="text" v-model="band_facebook">
                    </label>
                </div>
                <div class="band" v-if="!band_exist">
                    <label class="form-label">
                        Nombre del grupo
                        <input class="form-input" placeholder="Grupo" type="text" v-model="band_name">
                    </label>
                    <label class="form-label">
                        Link de imagen de perfil
                        <input class="form-input" placeholder="http://......jpg" type="text" v-model="band_image">
                    </label>
                    <!-- <label class="image_label" for="band-image">
                        <span class="empty">+</span>
                    </label> -->
                    <!-- <input id="band-image" class="image-input" type="file" name="band-imagen" accept="image/png, image/jpeg">	 -->
                    <!-- <input type="file" @change="handleFiles" accept="image/x-png,image/gif,image/jpeg"/> -->
                    
                    <label class="form-label">
                        Ciudad
                        <input class="form-input" placeholder="Grupo" type="text" v-model="band_city">
                    </label>
                </div>
                <!-- <div class="show">
                    <label class="form-label">
                        fecha
                        <input class="form-input" placeholder="fecha" type="date" v-model="show_date">
                    </label>
                    <label class="form-label">
                        hora
                        <input class="form-input" placeholder="hora" type="time" v-model="show_time">
                    </label>
                    <label class="form-label">
                        Festival
                        <input class="form-input" placeholder="Festival" type="text" v-model="show_festival">
                    </label>
                    <div>
                        <p class="titulo">Link del show</p>
                        <p class="option" :class="{active: show_link === 'insta'}" @click="show_link = band_instagram">mi cuenta de instagram</p>
                        <p class="option" :class="{active: show_link === 'facebook'}" @click="show_link = band_facebook">mi cuenta de facebook</p>
                        <p>
                            otros: 
                            <input class="form-input" disabled placeholder="link completo del show" type="text" v-model="show_link" />
                        </p>
                    </div>
                </div> -->
                <p class="" @click="subirBanda">subir banda</p>
                <!-- <div class="boton" @click="subir_show">
                    subir
                </div> -->
            </form>
       </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
// import firebase from "firebase"
import axios from 'axios';
// import PopupLogin from '@/components/PopupLogin'

export default {
    name: 'SubirShow',
    // components: {PopupLogin},
    props: [],
    data() {
        return {
            show_login: true,
            band_name: null,
            band_image: null,
            band_instagram: null,
            band_facebook: null,
            band_city: null,
            show_date: null,
            show_time: null,
            show_festival: null,
            show_link: null
            // show_city: null,
        }
    },
    computed: {
        ...mapState([
            "user", "bands"
        ]),
        band_exist() {
            let insta_exist;
            let facebook_exist;
            if (this.band_instagram) {
                insta_exist = this.bands.find(band => band.insta_user === this.band_instagram);
            } 
            if (this.band_facebook) {
                facebook_exist = this.bands.find(band => band.facebook === this.band_facebook);
            }
            return insta_exist || facebook_exist;
        },
    },
    watch: {
        // band_instagram() {
        //     this.band_exist = this.bands.find(band => band.insta_user === this.band_instagram);
        // }
    },
    methods: {
        subirBanda() {
            var url = "https://script.google.com/macros/s/AKfycbyEmhiWhuv_c2N0YSMawpXlITR5QEQQjkhyhJh6L4bevlqE86Y/exec";
            let band = {
                id: this.bands.length,
                timestamp: new Date(),
                instagram: this.band_instagram,
                band_name: this.band_name,
                ciudad: this.band_city,
                facebook: this.band_facebook,
                estilo: null,
                band_image: this.band_image,
            };
            axios.get(`${'https://cors-anywhere.herokuapp.com/'}${url}`, {
                data: band,
                headers: { 'content-type': 'application/json' }
            }).then((response) => {
                console.log(response);
            }).catch(error => console.log(error));
        },
        subirShow() {
            var url = "https://script.google.com/macros/s/AKfycbxtuh2G5S3rvOpKiyXLVm7XNnjf6BH3-fgTs-Xw4wMVhxKE4iDt/exec";
            let data = {
                id: this.bands.length,
                timestamp: new Date(),
                instagram: this.band_instagram,
                band_name: this.band_name,
                ciudad: this.band_city,
                facebook: this.band_facebook,
                estilo: null,
                band_image: this.band_image,
            };
            axios({
                url: url,
                method: "GET",
                dataType: "json",
                data: data
            }).then((response) => {
                console.log(response);
            });
        },
        // handleFiles(e) {
        //     if (e) {
        //     //get image
        //         const foto_id = this.band_name;
        //         const image = e.target.files[0];
        //         console.log(image);

        //     //upload image
        //         const upload = firebase.storage().ref().child(foto_id).put(image);
        //         upload.on('state_changed', (snapshot) => {
        //             var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        //             console.log('Upload is ' + progress + '% done');
        //             // image_label.find('span').removeClass("empty").html(progress + "%");
        //         }, (error) => {
        //             console.log("error: " + error);
        //         }, () => {
        //             upload.snapshot.ref.getDownloadURL().then((url) => {
        //                 console.log("imagen guardada en: " + url);
        //                 this.band_image = url;
        //             });
        //         });
        //     }
        // }

  }
}
</script>
<style scoped lang="scss">
    .view {
        margin-top: 12vh;
        padding: 0 15px;
        form {
            .form-label {display: block; margin: 1em auto;}
        }
        // .boton {
        //     // background-color: var(--color_primario);
        // }
    }
    
</style>
