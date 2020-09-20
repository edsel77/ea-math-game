import Vue from 'vue'
import Router from 'vue-router'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import NewHomeGame from './components/NewHomeGame.vue'
import Introduction from './components/Introduction.vue'
import InGameColor from './components/InGameColor.vue'
import TOC from './components/TOC.vue'
import GameDataList from './components/GameDataList.vue'
import WinnerDetails from './components/WinnerDetails.vue'

import 'material-design-icons-iconfont/dist/material-design-icons.css'

import 'bootstrap/dist/css/bootstrap.css'

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

window._ = require('lodash')
window.axios = require('axios')

import './prototypes'

import moment from 'moment'
window.moment = moment

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name:'new-home-game',
      component: NewHomeGame
    },
    {
      path: '/introduction',
      name:'introduction',
      component: Introduction
    },
    {
      path: '/in-game',
      name:'in-game',
      component: InGameColor
    },
    {
      path: '/terms-and-conditions',
      name:'terms-and-conditions',
      component: TOC
    },
    {
      path: '/game-data-list',
      name:'game-data-list',
      component: GameDataList
    },
    {
      path: '/winner-details',
      name:'winner-details',
      component: WinnerDetails
    }
  ]
})

new Vue({
 el: '#app',
 vuetify,
 render: h => h(App),
 router
})