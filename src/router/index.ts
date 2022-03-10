import Vue from 'vue';
import Router from 'vue-router';

import Simus from '../views/Simus.vue';
import SimusElement from '../views/SimusElement.vue';
import MyFavorites from '../views/MyFavorites.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'top-stories',
      component: Simus
    },
    {
      path: '/code-examples',
      name: 'code-examples',
      component: SimusElement
    },
    {
      path: '/my-favorites',
      name: 'my-favorites',
      component: MyFavorites
    }
  ]
});

// This callback runs before every route change, including on initial load
router.beforeEach((to, from, next) => {
  next();
});

export default router;
