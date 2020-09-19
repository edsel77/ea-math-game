<template>
<div>
  <v-app>
    <v-container>
      <div v-show="timer < 60">
        <div class="mb-6">
          <div class="row">
            <div class="col">
              <span style="color: green">{{`Correct: ${this.merit}`}}</span><br>
              <span style="color: red">{{`Wrong: ${this.demerit}`}}</span><br>
            </div>
            <div class="col">
              <span>{{`Timer: ${60 - this.timer} sec`}}</span>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <span>{{`Score: ${score}`}}</span>
            </div>
            <div class="col">
              <span>{{`Top Score: ${top_score}`}}</span>
            </div>
          </div>
        </div>

        <div class="row p-3">
          <div class="col choices" :style="`background-color: ${colors[0]}`" @click="selectedColor(colors[0])"></div>
          <div class="col ml-3 choices" :style="`background-color: ${colors[1]}`" @click="selectedColor(colors[1])"></div>
          <div class="col ml-3 choices" :style="`background-color: ${colors[2]}`" @click="selectedColor(colors[2])"></div>
          <div class="col ml-3 choices" :style="`background-color: ${colors[3]}`" @click="selectedColor(colors[3])"></div>
        </div>

        <div :style="`background-color: ${random_color}; border: 1px solid black`" class="my-3 p-2 text-center">
          <span :style="`color: ${random_color === 'black' ? 'white' : 'black'}`">{{random_color_text.toUpperCase()}}</span>
        </div>

        <div class="row p-3">
          <div class="col choices" :style="`background-color: ${colors[4]}`" @click="selectedColor(colors[4])"></div>
          <div class="col ml-3 choices" :style="`background-color: ${colors[5]}`" @click="selectedColor(colors[5])"></div>
          <div class="col ml-3 choices" :style="`background-color: ${colors[6]}`" @click="selectedColor(colors[6])"></div>
          <div class="col ml-3 choices" :style="`background-color: ${colors[7]}`" @click="selectedColor(colors[7])"></div>
        </div>
      </div>

      <div class="p-2" style="font-size: 20px" v-show="timer > 60">
        <strong v-if="score > top_score" style="color: green">{{`Congrats ${game_data.username}, you defeat the top score!`}}</strong>
        <strong style="color: red" v-else>{{`Sorry ${game_data.username}, try again!`}}</strong>
        <v-row>
          <v-col cols="8">
            <span>Correct Answer:</span>
          </v-col>
          <v-col cols="4">
            {{`+ ${merit}`}}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8">
            <span>Wrong Answer:</span>
          </v-col>
          <v-col cols="4">
            {{`- ${demerit}`}}
          </v-col>
        </v-row>
        <hr>
        <v-row>
          <v-col cols="8">
            <span>Total Score:</span>
          </v-col>
          <v-col cols="4">
            <strong>{{score}}</strong>
          </v-col>
        </v-row>

        <div v-if="score_upload_status === 1" style="background-color: green; color: white; padding: 5px">
          <small>Score uploaded</small>
        </div>
        <div v-else style="background-color: red; color: white; padding: 5px">
          <small>Score uploading...</small>
        </div>

        <div class="my-6 text-center" v-show="score_upload_status !== 0">
          <v-btn x-large class="ma-2" outlined color="indigo" to="/">START AGAIN</v-btn>
        </div>
      </div>
    </v-container>
  </v-app>
</div>
</template>

<script>
  export default {
    data () {
      return {
        game_data: JSON.parse(localStorage.getItem('game_data')),
        clock: 5,
        timer: 0,
        colors: ['red', 'orange', 'yellow', 'green', 'blue', 'violet', 'white', 'black'],
        random_color: 'white',
        random_color_text: 'white',
        merit: 0,
        demerit: 0,
        score: 0,
        score_upload_status: 0,
        top_score: 0
      }
    },
    methods: {
      selectedColor (color) {
        if (color === this.random_color_text) this.merit++
        else this.demerit++
        console.log(`color: ${color}`)
        console.log(`random color: ${this.random_color_text}`)
        this.newSession()
      },
      submitGame () {
        let game_data = {
          load_prize: this.game_data.load_prize,
          mobile_no: this.game_data.mobile_no,
          score: this.score,
          username: this.game_data.username
        }

        let header = {
          'content-type': 'application/json'
        }

        axios.post(`https://jsonbox.io/${this.$server_id}`, game_data, header)
        .then(response => {
          this.score_upload_status = 1
        })
      },
      generateRandomColor () {
        const random1 = Math.floor(Math.random() * this.colors.length);
        this.random_color = this.colors[random1];

        const random2 = Math.floor(Math.random() * this.colors.length);
        this.random_color_text = this.colors[random2];
      },
      newSession () {
        this.score = this.merit - this.demerit
        this.colors = _.shuffle(this.colors)
        this.generateRandomColor()
      },
      getGameData () {
        let header = {
          'content-type': 'application/json'
        }

        axios.get(`https://jsonbox.io/${this.$server_id}?sort=-score`, header)
        .then(response => {
          this.top_score = _.sortBy(response.data, ['score', '_createdOn']).reverse()[0].score
        })
      }
    },
    created () {
      this.getGameData()
      this.newSession()
      setInterval(() => {
        this.timer++
      }, 1000)
      if (!localStorage.getItem('game_data')) this.$router.push('/')
    },
    computed: {

    },
    watch: {
      'timer' (time) {
        if (time === 60) this.submitGame()
      }
    }
  }
</script>

<style>
.choices {
  height: 60px !important; 
  border-radius: 10px !important; 
  border: 1px solid black !important;
}
</style>