<template>
<div>
  <v-app>
    <v-container>
      <v-row dense class="mt-2">
        <v-col cols="12">
          <v-card color="#000026" dark>
            <v-card-title class="headline">Let's play a game!</v-card-title>

            <v-card-subtitle>You may be the math clever of the week. Let's start now!</v-card-subtitle>
            
            <br>

            <div v-if="data.length > 0">
              <strong class="ml-4">{{`First rank: ${data[0].username}`}}</strong><br>
              <span class="ml-4">{{`Score: ${data[0].score} pts`}}</span><br>
              <span class="ml-4">{{`Prize: ${data[0].load_prize}`}}</span>
            </div>
            <strong v-else class="ml-4">Loading data...</strong>
            <br>
            <br>
            <div class="my-6 text-center">
              <v-btn x-large class="ma-2" outlined color="white" to="/introduction">START NOW</v-btn>
            </div>
            <small style="color: white" class="p-2" @click="gotToTOC">Terms and conditions, v1.0</small>
          </v-card>
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

        axios.get(`https://jsonbox.io/${this.$server_id}?sort=-score&limit=20`, header)
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