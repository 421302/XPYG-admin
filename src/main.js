// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

import './common/style/index.scss';
import  './assets/css/editormd.css';

import elementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(elementUi);

import axios from 'axios';
Vue.prototype.$axios = axios;

require('./mock.js');
Vue.config.productionTip = false;

import vueLazy from 'vue-lazyload';
Vue.use(vueLazy,{
  loading:require('./assets/logo.png')
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


