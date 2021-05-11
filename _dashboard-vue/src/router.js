import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'bands',
      props: true,
      component: () => import('./views/Bands.vue')
    },
    // {
    //   path: '/Bands',
    //   name: 'bands',
    //   props: true,
    //   component: () => import('./views/Bands.vue')
    // },
    {
      path: '/Shows',
      name: 'shows',
      props: true,
      component: () => import('./views/Shows.vue')
    },
    {
      path: '/Venues',
      name: 'venues',
      props: true,
      component: () => import('./views/Venues.vue')
    }
  ]
})
