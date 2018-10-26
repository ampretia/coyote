// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import { store } from './store/store.js'

// Require the main Sass manifest file
require('./assets/sass/main.scss')

router.beforeEach((to, from, next) => {
  /* must call `next` */
  if (store.state.ready) {
    next()
  } else {
    next('/')
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
