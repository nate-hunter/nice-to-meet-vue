import Vue from 'vue';
import { firestorePlugin } from 'vuefire';
import VueRouter from 'vue-router';
import VueCompositionApi from '@vue/composition-api';
import '@fortawesome/fontawesome-free/js/all';

import App from './App.vue';
import Home from './components/Home';
import ChatRoom from './components/ChatRoom';


Vue.use(VueRouter);
Vue.use(firestorePlugin);
Vue.use(VueCompositionApi);

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/chats/:id', component: ChatRoom, name: 'chat' }
  ]
})


Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
