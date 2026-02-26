
import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardPlugin from './material-dashboard'
import Vue2Editor from "vue2-editor";

// Plugins
import App from './App.vue'
import Chartist from 'chartist'
import VueTheMask from 'vue-the-mask'
import VeeValidate from 'vee-validate';

//Filters
import './globalFilters'

import './globalFunctions'

// router setup
import routes from './router/index.js'

// plugin setup
Vue.use(VueRouter);
Vue.use(DashboardPlugin);
Vue.use(VueTheMask);
Vue.use(VeeValidate);
Vue.use(Vue2Editor);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'history',
  linkExactActiveClass: 'nav-item active'
});

// global library setup
Object.defineProperty(Vue.prototype, '$Chartist', {
  get() {
    return this.$root.Chartist
  }
})


/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  render: h => h(App),
  router,
  data: {
    Chartist: Chartist
  }
});

global.vm = vm;
