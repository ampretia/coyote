// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import { store } from './store/store.js'

// Require the main Sass manifest file
require('./assets/sass/main.scss')

// Ensure that the root is the page navigate to if the state is not yet set
router.beforeEach((to, from, next) => {
  /* must call `next` */
  if (store.state.ready || to.path === '/') {
    next()
  } else {
    next('/')
  }
})

Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
