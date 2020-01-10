<template>
    <div class="page agenda" data-page="agenda">
       <div class="cabecera">
            <!-- <h1 class="titulo">AGENDA</h1> -->
            <p v-if="!map" class="display-med mapa" :class="{'active': !map}"  @click="map = !map">mapa</p>
            <p v-else class="display-med lista" :class="{'active': map}" @click="map = false">lista</p>
       </div>
       <div class="view">
           <agendaMap
                v-if="map"
                :geolocation="geolocation"
            />
            <agendaList
                v-else
                :geolocation="geolocation"
            />
       </div>
    </div>
</template>

<script>
import agendaMap from '@/components/agendaMap';
import agendaList from "@/components/agendaList";

export default {
    name: 'Agenda',
    props: ["geolocation", "get_fake_bd"],
    components: {agendaList, agendaMap},
    data() {
        return {
            map: true,
        }
    },
    computed: {
    },
    created() {
    },
    mounted() {
        this.get_fake_bd();
    }
}
</script>
<style scoped lang="scss">
    .agenda {
        .cabecera {
            .display-med {
                &.active {
                    background-color: white;
                    color: var(--color_primario);
                    padding: .3em;
                    border-radius: 5em;
                    position: absolute;
                    right: 10px;
                    top: 0;
                    font-size: .6em;
                    width: 25%;
                    &.mapa {
                        background-color: var(--color_primario);
                        color: white;
                    }
                }
            }
        }
    }
</style>
