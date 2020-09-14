<template>
<div>
  <v-app>
    <v-container>
      <div>
        <v-row>
          <v-col cols="8">
            <strong>Player</strong>
          </v-col>
          <v-col cols="4" class="text-right">
            <strong>Score</strong>
          </v-col>
        </v-row>
      </div>
      <div v-for="(game_data, index) in data" :key="index">
        <v-row>
          <v-col cols="8">
            <span>{{`#${index + 1} ${game_data.username}`}}</span>
          </v-col>
          <v-col cols="4" class="text-right">
            <span>{{game_data.score}}</span>
          </v-col>
        </v-row>
      </div>
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

        axios.get(`https://jsonbox.io/${this.$server_id}?limit=1000`, header)
        .then(response => {
          this.data = _.sortBy(response.data, ['score', '_createdOn']).reverse()
        })
      }
    },
    created () {
      this.getGameData()
    }
  }
</script>