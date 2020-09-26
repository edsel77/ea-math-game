<template>
<div>
  <v-app>
    <v-container>
      <v-row dense class="mt-2">
        <v-col cols="12">
          <div class="p-3">
            <div class="text-center">
              <h2 style="color: red !important">Color Game</h2>
              <small style="color: green !important" v-show="!game_ended">Let's start now!</small>
              
              <br>
              <br>

              <div v-if="data.length > 0">
                <strong v-if="!game_ended">First Rank</strong>
                <strong v-else style="color: green">Game ended, congratulations!</strong><br>
                <span style="color: blue;" @click="$router.push('/winner-details')">{{`${data[0].username}`}}</span><br>
                <span>{{`Score: ${data[0].score} pts`}}</span><br>
                <span>{{`Prize: ${data[0].load_prize}`}}</span>
              </div>
              <strong v-else>Loading data...</strong>
              <router-link to="/game-data-list" v-show="data.length > 0">
                <small>See all</small>
              </router-link>
              <br>
              <small style="color: orange" v-show="game_ended">Load prize will be delivered within the day.</small>
              <br>
              <div class="my-6 text-center" v-show="!game_ended">
                <v-btn x-large class="ma-2" outlined to="/introduction">START NOW</v-btn>
              </div>
              <small style="color: blue !important" v-show="!game_ended">{{`Keep on top until ${end_game}.`}}</small><br>
              <small class="p-2" @click="gotToTOC">{{`Terms and conditions, ${$version}`}}</small>
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
        data: '',
        game_ended: false
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
      console.log(moment().unix())
      console.log(moment(this.$date).unix())
      console.log(moment().unix() > moment(this.$date).unix())
      setInterval(m => {
        if (moment().unix() > moment(this.$date).unix()) {
          this.game_ended = true
        }
      }, 1000)
    },
    computed: {
      end_game () {
        return moment(this.$date).format('MMMM Do YYYY, h:mm:ss a')
      }
    }
  }
</script>