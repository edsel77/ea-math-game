<template>
<div>
  <v-app>
    <v-container>
      <v-row dense class="mt-2" v-show="timer <= 90">
        <v-col cols="12">
          <v-card :color="level_color" dark>
            <div class="p-1">
              <v-row style="border-bottom: 2px solid white">
                <v-col cols="5">
                  <h3 class="headline">{{ timer !== 0 ? `Timer: ${timer}` : 'Starting...'}}</h3>
                </v-col>
                <v-col cols="7" class="text-right">
                  <span style="font-size: 20px">{{`${level.toUpperCase()} - ${level === 'easy' ? '1 pt.' : level === 'average' ? '2 pts.' : '3 pts.'}`}}</span>
                </v-col>
              </v-row>
            </div>
            <div class="p-1">
              <v-row style="border-bottom: 2px solid white">
                <v-col cols="4">
                  <h6>{{`Correct: ${merit}`}}</h6>
                </v-col>
                <v-col cols="4">
                  <h6>{{`Wrong: ${demerit}`}}</h6>
                </v-col>
                <v-col cols="4">
                  <h6>{{`Score: ${score}`}}</h6>
                </v-col>
              </v-row>
            </div>
            <span class="ml-4" style="font-size: 20px">Question:</span>
            <div class="text-center">
              <span class="ml-4" style="font-size: 40px">{{current_question ? current_question : `Ready in ${clock}...`}}</span>
            </div>

            <div class="p-2 mt-3" v-show="timer > 0">
              <v-row>
                <v-col cols="6">
                  <v-btn style="width: 100%" @click="answer(choices[0])">{{choices[0]}}</v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn style="width: 100%" @click="answer(choices[1])">{{choices[1]}}</v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-btn style="width: 100%" @click="answer(choices[2])">{{choices[2]}}</v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn style="width: 100%" @click="answer(choices[3])">{{choices[3]}}</v-btn>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <div class="p-2" style="font-size: 20px" v-show="timer > 90">
        <strong>{{`Congrats ${game_data.username}!`}}</strong>
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

        <div class="my-6 text-center">
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
        current_question: '',
        choices: [1, 2, 3, 4],
        correct_answer: '',
        merit: 0,
        demerit: 0,
        score: 0,
        score_upload_status: 0
      }
    },
    methods: {
      generateQuestion (level) {
        let max_number = 99
        let min_number = 10
        if (level === 'easy') {
          max_number = 99
          min_number = 10
        }
        else if (level === 'average') {
          max_number = 999
          min_number = 100
        }
        else {
          max_number = 9999
          min_number = 1000
        }

        let first_number = Math.round(Math.random() * (max_number - min_number) + 10)
        let second_number = Math.round(Math.random() * (max_number - min_number) + 10)
        let operator = ''

        if (Math.round(Math.random()) === 0) {
          this.current_question = `${first_number} + ${second_number}`
          operator = '+'
          this.correct_answer = first_number + second_number
        } else {
          this.current_question = `${first_number} - ${second_number}`
          operator = '-'
          this.correct_answer = first_number - second_number
        }

        this.generateChoices(operator, first_number, second_number)
      },
      generateChoices (operator, first_number, second_number) {
        if (operator === '+') {
          this.choices = [
            first_number + second_number,
            first_number + second_number - 10,
            first_number + second_number + 10,
            first_number + second_number + 20,
          ]
        } else {
          this.choices = [
            first_number - second_number,
            first_number - second_number + 10,
            first_number - second_number - 10,
            first_number - second_number - 20,
          ]
        }

        this.choices = _.shuffle(this.choices)
      },
      answer (answer) {
        let points = 0
        if (this.level === 'easy') points = 1
        else if (this.level === 'average') points = 2
        else if (this.level === 'difficult') points = 3

        if (this.correct_answer === answer) this.merit = this.merit + points
        else this.demerit = this.demerit + points

        this.score = this.merit - this.demerit
        this.generateQuestion(this.level)
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
      }
    },
    created () {
      setInterval(() => {
        this.clock--
      }, 1000)

      setTimeout(() => {
        setInterval(() => {
          this.timer++
        }, 1000)

        this.generateQuestion(this.level)
        setInterval(() => {
          this.generateQuestion(this.level)
        }, 30000)
      }, 5000)
      if (!localStorage.getItem('game_data')) this.$router.push('/')
    },
    computed: {
      level_color () {
        if (this.timer < 30) return '#008000'
        else if (this.timer >= 30 && this.timer < 60) return '#ffa500'
        else return '#ff0000'
      },
      level () {
        if (this.timer < 30) return 'easy'
        else if (this.timer >= 30 && this.timer < 60) return 'average'
        else return 'difficult'
      }
    },
    watch: {
      'timer' (time) {
        if (time === 90) this.submitGame()
      }
    }
  }
</script>