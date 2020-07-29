import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import VueLazyload from 'vue-lazyload';
import toast from 'components/common/toast/index';
import FastClick from 'fastclick';

Vue.config.productionTip = false;

Vue.use(VueLazyload);
Vue.prototype.$bus = new Vue();
Vue.use(toast);
FastClick.attach(document.body);

import 'assets/iconfont/iconfont.css';
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
