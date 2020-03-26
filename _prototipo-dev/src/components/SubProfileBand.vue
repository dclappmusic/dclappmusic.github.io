<template>
    <div class="page band_profile">
        <svg class="elipse" width="468" height="413" viewBox="0 0 468 413" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="234" cy="206.5" rx="234" ry="206.5" fill="#0C3847"/>
        </svg>
        <img class="image" :src="band.image">
       
        <h2 class="titulo name">{{band.name}}</h2>
        <h3 class="parrafo-big style">{{band.estilo}}</h3>
        <p class="description">{{band.description}}</p>
        <div class="concert">
            <h3>Next Concerts</h3>
            <a class="show" v-for="(show, index) in band_shows" :key="index">
                <a class="date">{{$moment(show.timestamp).format("D/MM")}}</a>
                <a class="sala">{{show.venue}}</a>
                <a class="city">{{show.city}}</a>
                <a class="precio">{{show.price > 0 ? show.price + "€" : "FREE"}}</a>
            </a>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'SubProfileBand',
    components: {
    },
    data() {
        return {
            band_id: null
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
        this.band_id = this.$route.params.id;
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
        margin: 5px auto;
        text-align: center;
        font-family: var(--roboto);
        color: white;
        font-weight: 900;
    }
    .style {
        position: relative;
        width: 80%;
        margin: 3em auto;
        text-align: left;
        color: white;
        z-index: 10;
    }
    .description {
        position: relative;
        width: 80%;
        margin: 5px auto;
        text-align: justify;
        font-family: var(--roboto);
        color: white;
        font-style: normal;
        line-height: normal;
        font-size: 14px;
        z-index: 10;
    }
    .concert {
        position: relative;
        width: 90%;
        margin: 3em auto;
        padding: 10px;
        background-color: #333;
        border-radius: 20px;
        text-align: center;
        font-family: var(--roboto);
        color: white;
        line-height: normal;
        font-size: 14px;
        z-index: auto;

        h3 {
            text-decoration: underline;
            font-size: 18px;
            padding-bottom: 10px;
        }

        .show {
            border-radius: 5px;
            border-color: white;
            border-width: 1px;
            border-style: solid;
            margin: 3px auto;
            display: inline-block;
            width: 90%;
            text-align: justify;

            a {
                display: inline-block;
            }

            .date {
                font-weight: bold;
                width: 20%;
                padding-left: 10px;
            } 
            .sala {
                font-weight: lighter;
                width: 40%;
            }
            .city {
                font-weight: bold;
                width: 20%;
            } 
            .precio {
                font-weight: lighter;
                width: 20%;
                text-align: right;
                padding-right: 10px 
            }
        }
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
