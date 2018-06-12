// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCookie from 'vue-cookie';
import Home from './Home'
import router from './routers'
import vueResource from 'vue-resource'
Vue.use(VueRouter)
Vue.use(vueResource);
Vue.use(VueCookie);
Vue.config.debug = false;
Vue.http.options.emulateJSON = true;
Vue.http.options.headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};

const vue = new Vue({
  router,
  render: h => h(Home)
}).$mount('#app')
