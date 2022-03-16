import Vue from 'vue';
import '@/state/installCompositionApi.ts';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import register from './service-worker/register-service-worker';

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');

register();

if (process.env.NODE_ENV === 'development' || process.env.VUE_APP_PWA_LOCAL_SERVE === 'true') {
  console.log(`PWA Local Serve: ${process.env.VUE_APP_PWA_LOCAL_SERVE}`); // eslint-disable-line no-console
  console.log(`Node Env: ${process.env.NODE_ENV}`); // eslint-disable-line no-console
}
