<template>
<div>
  <v-app>
    <v-container>
      <v-row dense class="mt-2">
        <v-col cols="12">
          <v-card color="#000026" dark>
            <v-card-title class="headline">Let's play a game!</v-card-title>

            <v-card-subtitle>You may be the math clever of the week. Let's start now!</v-card-subtitle>

            <small class="ml-4">First rank: ayalaedsel (30pts) - GO50</small>

            <v-card-actions>
              <v-btn x-large text to="/introduction">Start Now</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</div>
</template>

<script>
  export default {
    methods: {
      getGameData () {

      }
    },
    created () {
      this.getGameData()
      localStorage.removeItem('game_data')
    }
  }
</script>