<template>
    <div class="page band_profile" data-page="sub">
        <svg class="elipse" width="468" height="413" viewBox="0 0 468 413" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="234" cy="206.5" rx="234" ry="206.5" fill="#0C3847"/>
        </svg>
        <img class="image" :src="band.image">
       
        <h2 class="titulo name">{{band.name}}</h2>
        <h3 class="style">{{band.estilo}}</h3>
        <p class="description">{{band.description}}</p>
        <div class="concert">
            <h3>Next Concerts</h3>
            <div v-for="show in band_shows" v-bind:key="show">
                {{$moment(show.timestamp).format("D/MM")}} {{show.venue}} {{show.city}} {{show.price}}
            </div>
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'SubProfileBand',
    props:["band_id"],
    components: {
    },
    data() {
        return {
            // band: {}
        }
    },
    computed: {
        ...mapState([
            "shows", "bands", "user"
        ]),
        band: function() {
            return this.bands.find(band => band.id === this.band_id);
        },
        band_shows: function() {
            var band_shows = this.shows.filter(show => show.band_id === this.band_id);
            return band_shows;
        }
    },
    created() {
    //get band by id from firestore
        // firebase.firestore().collection("bands").doc(this.band_id).onSnapshot((doc) => {
        //     var bd_band = doc.data();
        //     console.log(bd_band);
        //     this.band = bd_band;
        // });
    }
}
</script>
<style scoped lang="scss">
.band_profile {
    position: relative;
    padding: 0 10px 5em;
    .elipse {
        position: absolute;
        width: 120%;
        height: 100%;
        left: -10%;
        top: 0;
    }
    .image {
        position: relative;
        display: block;
        margin: 0 auto;
        width: 70vw;
        height: 70vw;
        object-fit: cover;
        object-position: center;
        border-radius: 40%;
        z-index: 10;
    }
    .name {
        position: relative;
        width: 80%;
        margin: 0 auto;
        text-align: center;
        font-family: var(--roboto);
        color: white;
        font-style: normal;
        font-weight: 900;
        line-height: normal;
        font-size: 40px;
        z-index: 10;
    }
    .style {
        position: relative;
        width: 80%;
        margin: 0 auto;
        text-align: left;
        font-family: var(--roboto);
        color: white;
        font-style: normal;
        font-weight: 900;
        line-height: normal;
        font-size: 20px;
        z-index: 10;
    }
    .description {
        position: relative;
        width: 80%;
        margin: 0 auto;
        text-align: justify;
        font-family: var(--roboto);
        color: white;
        font-style: normal;
        line-height: normal;
        font-size: 14px;
        z-index: 10;
    }
    .concert {
        background-color: grey;
        position: relative;
        width: 60%;
        margin: 0 auto;
        text-align: center;
        font-family: var(--roboto);
        color: white;
        font-style: normal;
        line-height: normal;
        font-size: 14px;
        z-index: 10;
    }
    .resumen {
        position: relative;
        width: 80%;
        margin: 20px auto 30px;
        display: flex;
        align-items: center;
        
        li {
            border: 1px solid white;
            width: 74px;
            height: 63px;
            margin-left: 16px;
            color: white;
            display: flex;
            align-items: center;
            text-align: center;
            p {
                width: 100%;
                span {display: block;}
            }
            // &.clapps {
            //     background: url(../images/clapp-rojo.png) no-repeat;
            //     background-position: center;
            //     background-size: 75%;
            //     background-color: var(--color_primario);
            //     border: none;
            //     border-radius: 5px;
            // }
        }
    }
    .seguir {
        position: relative;
        width: 70%;
        margin: 0 auto;
        height: 30px;
        .rrss {
            float: left;
            a {
                display: inline-block;
                width: 2em;
                height: 2em;
                background-size: contain;
                background-repeat: no-repeat;  
            }
        }
        .boton-sm {
            float: right;
            // margin-right: 18%;
            width: 7em;
            margin: 0 auto;
            padding: .5em 1em .7em;
            text-align: center;
            border-radius: 12px;
            background: #FFFFFF;
            color: var(--color_secundario);
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
            &.active {
                border: 1px solid white;
                background: transparent;
                color: white;
                box-shadow: none;
            }	
        }
    }
    .descripcion {
        position: relative;
        width: 100%;
        margin: 100px auto;
        padding: 0 15px;
        color: white;
    }
}
</style>
