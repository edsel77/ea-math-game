<template>
<div>
  <v-app>
    <v-container>
      <v-row dense class="mt-2">
        <v-col cols="12">
          <div class="p-3">
            <div class="text-center">
              <h4 style="color: red !important">First Rank!</h4>
              <small style="color: blue !important">{{`Keep on top until ${end_game}.`}}</small>
              
              <br>
              <br>

              <div v-if="data.length > 0" style="text-align: left !important; margin-left: 2rem;">
                <strong>{{`${data[0].username}`}}</strong><br>
                <span>{{`Score: ${data[0].score} pts`}}</span><br>
                <span>{{`Number: ${data[0].mobile_no}`}}</span><br>
                <span>{{`Prize: ${data[0].load_prize}`}}</span>
              </div>
              <strong v-else>Loading data...</strong>
              <br>
              <br>
              <small class="p-2" @click="gotToTOC"></small>
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
    },
    computed: {
      end_game () {
        return moment(this.$date).format('MMMM Do YYYY, h:mm:ss a')
      }
    }
  }
</script>