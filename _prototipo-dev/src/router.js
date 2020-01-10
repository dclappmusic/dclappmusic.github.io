import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      props: true,
      component: () => import('./views/Home.vue')
    },
    {
      path: '/home',
      name: 'home',
      props: true,
      component: () => import('./views/Home.vue')
    },
    {
      path: '/historial',
      name: 'historial',
      props: true,
      component: () => import('./views/Historial.vue')
    },
    {
      path: '/agenda',
      name: 'agenda',
      props: true,
      component: () => import('./views/Agenda.vue')
    },
    {
      path: '/sub',
      name: 'sub',
      props: true,
      component: () => import('./views/Sub.vue')
    },
    {
      path: '/clapp',
      name: 'clapp',
      props: true,
      component: () => import('./views/Clapp.vue')
    }
    // {
    //   path: '/maps',
    //   name: 'maps',
    //   component: () => import('./views/Maps.vue')
    // }
  ]
})
