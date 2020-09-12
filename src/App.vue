<template>
  <div id="app">
    <header>
      <div class="text-center">
        <img src="ea_math_game_logo.png" alt="EA Math" @click="goToHome">
      </div>
    </header>
    <main>
      <!-- <router-link to="/">Home</router-link>
      <router-link to="/page-1">Page 1</router-link>
      <router-link to="/page-2">Page 2</router-link> -->
      <div class="content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
    goToHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style>
.v-application--wrap {
  min-height: 0px !important;
}
</style>