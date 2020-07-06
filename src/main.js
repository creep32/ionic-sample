import { defineCustomElements } from '@ionic/pwa-elements/loader'; // <== NEW

import Vue from 'vue';
import Ionic from '@ionic/vue';
import App from './App.vue';
import router from './router';
import store from './store';

import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/^ion-/];
Vue.use(Ionic);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

defineCustomElements(window);
