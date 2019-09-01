<template>
    <div class="index">
        <div class="index_slider">
            <Agenda :shows="this.shows"/>
            <Home/>
        </div>
        <nav class="menu nav_slider">
            <a class="menu-tit slider_link agenda">agenda</a>
            <a class="menu-tit active slider_link home">home</a>
        </nav>
    </div>
</template>

<script>
// @ is an alias to /src
// import Nav from '@/components/Nav.vue'
import Agenda from '@/components/Agenda.vue'
import Home from '@/components/Home.vue'

export default {
    name: 'Index',
    components: {
        Home,
        Agenda
    },
    data() {
        return{}
    },
    props: ["shows"],
    created() {},
    mounted() {
        console.log("ei");
        $(".index_slider").slick({
            arrows: false,
            initialSlide: 1
        });
        $(".nav_slider a").click(function () {
            var slideIndex = $(this).index();
            console.log(slideIndex);
            $('.index_slider').slick('slickGoTo', slideIndex, false);
        });

        $('.index_slider').on('swipe', function (slick, currentSlide) {
            var page = $(".index_slider .slick-current").data("page");
            console.log("página: " + page);
            $(".nav_slider ." + page).addClass("active").siblings().removeClass("active");
        });
        $('.index_slider').on('afterChange', function (slick, currentSlide) {
            var page = $(".index_slider .slick-current").data("page");
            console.log("página: " + page);
            $(".nav_slider ." + page).addClass("active").siblings().removeClass("active");
        });
    },
    methods: {}
}
</script>
