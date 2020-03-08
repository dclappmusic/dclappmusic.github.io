<template>
<div class="popup filters">
    <div class="sub_popup">
        <a class="cerrar" @click="close_popup">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.05275 7.99504L12.7522 13.8808L13.99 12.6025L8.29057 6.71676L13.4414 1.39755L12.2036 0.119268L7.05275 5.43847L1.7864 0L0.548577 1.27828L5.81492 6.71676L0 12.7217L1.23782 14L7.05275 7.99504Z" fill="#F1F1F1"/>
            </svg>
        </a>
        <div class="filter show_type">
            <h3 class="display-sm">Tipo de show:</h3>
            <ul class="show_type_container">
                <li class="filtro" v-for="(type, subindex) in show_types" :key="subindex" 
                    @click="filtering(type)"
                    :class="{active: filter_type.includes(type)}"
                >
                    <p class="parrafo">{{type}}</p>
                    <!-- {{filter_type[type]}} -->
                </li>
            </ul>
        </div>
        <div class="filter show_price">
            <h3 class="display-sm">Precio máximo (€):</h3>
            <ul class="show_price_container">
                <input class="slider" type="range" min="0" max="50" step="10" list="precios" v-model="filter_price">
                <datalist id="precios" class="precios" >
                    <option value="0">gratis</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">todos</option>
                </datalist>
            </ul>
        </div>
        <a class="boton" @click="close_popup">listo</a>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'AgendaFilters',
    props:[],
    data() {
        return {
            show_types: [],
            filter_type: [],
            filter_price: 50
        }
    },
    computed: {
        ...mapState([
            "shows"
        ])
    },
    watch: {
    },
    created() {
        console.log(this.show_types);
        if (!this.show_types[0]) {
            this.show_types = [];
            this.shows.forEach(show => {
                let type = show.show_type;
                console.log(type);
                if (type && (!this.show_types.includes(type))) {
                    this.show_types.push(type);
                    this.filter_type.push(type);
                }
            });
            // this.show_types.forEach(el => {
            //     this.filter_type[el] = true;
            // });
        }
        // let tipos = this.show_types;
        // this.filter_type = tipos;
    },
    mounted() {
    },
    methods: {
        filtering(filter) {
            // this.filter_type[filter] = !this.filter_type[filter];
            if (!this.filter_type.includes(filter)) {
                this.filter_type.push(filter)
            } else {
                const index = this.filter_type.indexOf(filter);
                this.filter_type.splice(index, 1);
            }
        },
        close_popup() {
            // let array_filters = [];
            // for (let type in this.filter_type) {
            //     if (this.filter_type[type]) { array_filters.push(type); }
            // }
            let filtros = {
                tipo: this.filter_type,
                price: this.filter_price
            }
            this.$emit('filtering', filtros);
            this.$emit('filters_popup', false);
        }
    }
}
</script>
<style scoped lang="scss"> 
    .filters {
        .sub_popup {
            position: relative;
            background-color: #333;
            color: white;
            padding: 1em 7vw;
            .cerrar {
                position: absolute;
                top: 0;
                right: 0;
                padding: .5em;
                svg {width: .5em; height: .5em;}
            }
            .boton {
                font-size: .6em;
                padding: .2em .3em;
                border-radius: 2em;
                width: 35%;
                float: right;
                margin: 1em -.5em -.7em;
            }
            .display-sm {
                text-align: left;
            }
            .show_type_container {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                margin: .5em auto;
                .filtro {
                    border: 1px solid white;
                    border-radius: 2em;
                    padding: .1em .3em;
                    margin: 0 .1em .2em;
                    background-color: transparent;
                    color: white;
                    opacity: .5;
                    &.active {
                        opacity: 1;
                        background-color: white;
                        color: #333;
                    }
                }
            }
            .show_price_container {
                .slider {
                    -webkit-appearance: none;
                    width: 100%;
                    height: 2px;
                    border-radius: 2px;
                    outline: none;
                    padding: 0;
                    margin: 0;
                    transition: all 0.2s ease-out;
                    background-color: white;
                    &::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        width: 1em;
                        height: 1em;
                        background-color: white;
                        transition: all 0.2s ease;
                        border-radius: 50%;
                    }
                }
                .precios {
                    display: flex;
                    padding: 0;
                    margin: .2em -.7em;
                    option {
                        width: 20%;
                        font-size: .5em;
                        font-weight: 400;
                    }
                }
            }
        }
    }
</style>
