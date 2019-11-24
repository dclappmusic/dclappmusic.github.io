<template>
    <div class="index">
        <div class="index_slider">
            <Home v-if="page==='home'"/>
            <Agenda v-if="page==='agenda'"
                :shows="this.shows"
                :geolocation="this.geolocation"
            />
            
            <Historial v-if="page==='historial'" />
        </div>

        
        <nav class="menu nav_slider">
            <a class="menu-tit slider_link agenda" 
                @click="page='agenda'"
                :class="{'active': page==='agenda'}"
            >agenda</a>
            <a class="menu-tit slider_link home" 
                @click="page='home'"
                :class="{'active': page==='home'}"
            >home</a>
            <a class="menu-tit slider_link historial" 
                @click="page='historial'"
                :class="{'active': page==='historial'}"
            >historial</a>
        </nav>
    </div>
</template>

<script>
// @ is an alias to /src
// import Nav from '@/components/Nav.vue'
import Agenda from '@/views/Agenda.vue'
import Home from '@/views/Home.vue'
import Historial from '@/views/Historial.vue'

export default {
    name: 'Index',
    components: {
        Home,
        Agenda,
        Historial
    },
    props: ["shows", "geolocation"],
    data() {
        return{
            page: "home"
        }
    },
    created() {},
    mounted() {
        console.log("ei");
        // $(".index_slider").slick({
        //     arrows: false,
        //     initialSlide: 1
        // });
        // $(".nav_slider a").click(function () {
        //     var slideIndex = $(this).index();
        //     console.log(slideIndex);
        //     $('.index_slider').slick('slickGoTo', slideIndex, false);
        // });

        // $('.index_slider').on('swipe', function (slick, currentSlide) {
        //     var page = $(".index_slider .slick-current").data("page");
        //     console.log("página: " + page);
        //     $(".nav_slider ." + page).addClass("active").siblings().removeClass("active");
        // });
        // $('.index_slider').on('afterChange', function (slick, currentSlide) {
        //     var page = $(".index_slider .slick-current").data("page");
        //     console.log("página: " + page);
        //     $(".nav_slider ." + page).addClass("active").siblings().removeClass("active");
        // });
    },
    methods: {}
}
</script>
