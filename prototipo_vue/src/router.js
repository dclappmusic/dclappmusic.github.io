import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      props: true,
      component: () => import('./views/Index.vue')
    },
    {
      path: '/index',
      name: 'index',
      props: true,
      component: () => import('./views/Index.vue')
    },
    {
      path: '/sub',
      name: 'sub',
      props: true,
      component: () => import('./views/Sub.vue')
    }
    // {
    //   path: '/maps',
    //   name: 'maps',
    //   component: () => import('./views/Maps.vue')
    // }
  ]
})
