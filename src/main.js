import Vue from 'vue'
import Router from 'vue-router'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import Home from './components/Home.vue'
import Introduction from './components/Introduction.vue'
import InGame from './components/InGame.vue'
import Page2 from './components/Page2.vue'

import 'material-design-icons-iconfont/dist/material-design-icons.css'

import 'bootstrap/dist/css/bootstrap.css'

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

window._ = require('lodash')
window.axios = require('axios')

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name:'home',
      component: Home
    },
    {
      path: '/introduction',
      name:'introduction',
      component: Introduction
    },
    {
      path: '/in-game',
      name:'in-game',
      component: InGame
    }
  ]
})

new Vue({
 el: '#app',
 vuetify,
 render: h => h(App),
 router
})