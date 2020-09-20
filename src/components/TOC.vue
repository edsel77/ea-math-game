<template>
<div>
  <v-app>
    <v-container>
      <v-row dense class="mt-2">
        <v-col cols="12">
          <div class="p-3">
            <div class="headline">Terms and conditions</div>
            <hr>
            <div>
              <small>- Arat G Color Game can widthraw all the session saved for events that require further investigation.</small><br>
              <small>- All the information saved will be deleted after the announcement of winner.</small><br>
              <small>- By starting the game, you allowed Arat G Color Game to collect information for reference.</small><br>
              <small>- Prize will be automatically/manually delivered to the player with the latest highest score on the announced date.</small><br>
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