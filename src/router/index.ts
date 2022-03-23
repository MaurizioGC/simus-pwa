import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'musei',
      component: ()=>import('@/views/Simus.vue')
    },
    {
      path: '/qrcode',
      name: 'qrcode',
      component: ()=>import('@/views/QrCode.vue')
    },
    {
      path: '/elemento/:slug',
      name: 'elemento',
      component: ()=>import('@/views/SimusElement.vue')
    },
    {
      path: '/preferiti',
      name: 'preferiti',
      component: ()=>import('@/views/Preferiti.vue')
    },
    {
      path: '/cerca',
      name: 'cerca',
      component: ()=>import('@/views/Cerca.vue')
    }
  ]
});

// This callback runs before every route change, including on initial load
router.beforeEach((to, from, next) => {
  next();
});

export default router;
