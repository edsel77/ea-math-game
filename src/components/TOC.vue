<template>
<div>
  <v-app>
    <v-container>
      <v-row dense class="mt-2">
        <v-col cols="12">
          <v-card color="#000026" dark>
            <v-card-title class="headline">Terms and conditions</v-card-title>

            <v-card-subtitle>
              <small>- EA Math Game can widthraw all the session saved for events that require further investigation.</small><br>
              <small>- All the information saved will be deleted every Friday midnight.</small><br>
              <small>- By starting the game, you allowed EA Math Game to collect information for reference.</small><br>
              <small>- Prize will be automatically delivered to the player with the latest highest score at 11:59 pm every Friday.</small><br>
            </v-card-subtitle>
            
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
      localStorage.removeItem('game_data')
    }
  }
</script>