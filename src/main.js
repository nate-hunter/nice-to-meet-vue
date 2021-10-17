import Vue from 'vue';
import App from './App.vue';
import { firestorePlugin } from 'vuefire';

import VueRouter from 'vue-router';
import Home from './components/Home';
import VueCompositionApi from '@vue/composition-api';

Vue.use(VueRouter);
Vue.use(firestorePlugin);
Vue.use(VueCompositionApi);

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
  ]
})


Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
