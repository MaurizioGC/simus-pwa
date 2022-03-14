import Vue from 'vue';
import Router from 'vue-router';

import Simus from '../views/Simus.vue';
import QrCode from '../views/QrCode.vue';
import SimusElement from '../views/SimusElement.vue';
import Preferiti from '../views/Preferiti.vue';
import Cerca from '../views/Cerca.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'musei',
      component: Simus
    },
    {
      path: '/qrcode',
      name: 'qrcode',
      component: QrCode
    },
    {
      path: '/elemento',
      name: 'elemento',
      component: SimusElement
    },
    {
      path: '/preferiti',
      name: 'preferiti',
      component: Preferiti
    },
    {
      path: '/cerca',
      name: 'cerca',
      component: Cerca
    }
  ]
});

// This callback runs before every route change, including on initial load
router.beforeEach((to, from, next) => {
  next();
});

export default router;
