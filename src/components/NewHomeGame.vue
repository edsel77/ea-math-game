<template>
<div>
  <v-app>
    <v-container>
      <v-row dense class="mt-2">
        <v-col cols="12">
          <div class="p-3">
            <div class="text-center">
              <h2 style="color: red !important">Color Game</h2>
              <small style="color: blue !important">Let's start now!</small>
              
              <br>
              <br>

              <div v-if="data.length > 0">
                <strong>First Rank</strong>
                <span>{{`${data[0].username}`}}</span><br>
                <span>{{`Score: ${data[0].score} pts`}}</span><br>
                <span>{{`Prize: ${data[0].load_prize}`}}</span>
              </div>
              <strong v-else>Loading data...</strong>
              <router-link to="/game-data-list" v-show="data.length > 0">
                <small>See all</small>
              </router-link>
              <br>
              <br>
              <div class="my-6 text-center">
                <v-btn x-large class="ma-2" outlined to="/introduction">START NOW</v-btn>
              </div>
              <small class="p-2" @click="gotToTOC">Terms and conditions, v1.0</small>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</div>
</template>

<script>
  export default {
    data () {
      return {
        data: ''
      }
    },
    methods: {
      getGameData () {
        let header = {
          'content-type': 'application/json'
        }

        axios.get(`https://jsonbox.io/${this.$server_id}?sort=-score`, header)
        .then(response => {
          this.data = _.sortBy(response.data, ['score', '_createdOn']).reverse()
        })
      },
      gotToTOC () {
        this.$router.push('/terms-and-conditions')
      }
    },
    created () {
      this.getGameData()
      // localStorage.removeItem('game_data')
    }
  }
</script>