<template>
  <div id="app">
    <header>
      <div class="text-center">
        <img src="ea_math_game_logo.png" alt="EA Math" @click="goToHome" height="120px">
      </div>
    </header>
    <main>
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