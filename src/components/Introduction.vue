<template>
<div>
  <v-app>
    <v-container>
      <v-row dense class="mt-2">
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="username"
            label="Username"
            outlined
            dense
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="mobile_no"
            label="Mobile No."
            outlined
            dense
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" sm="6" md="4">
          <v-select
            v-model="load_prize"
            :items="items"
            label="Load Prize"
            outlined
          ></v-select>
        </v-col>
      </v-row>
      <div class="my-2 text-center">
        <v-btn x-large class="ma-2" outlined color="indigo" @click="startGame">START</v-btn>
      </div>
    </v-container>
  </v-app>
</div>
</template>

<script>
  export default {
    data () {
      return {
        username: '',
        mobile_no: '',
        load_prize: 'FB10',
        items: [
          'FB10', 
          'GIGA VIDEO 50', 
          'GIGA STORIES 50',
          'GIGA VIDEO 90', 
          'GIGA STORIES 90',
          'GO50',
          'GO70',
          'GO90'
        ]
      }
    },
    methods: {
      startGame () {
        if (!this.username || !this.mobile_no) return
        let game_data = {
          username: this.username,
          mobile_no: this.mobile_no,
          load_prize: this.load_prize
        }
        localStorage.setItem('game_data', JSON.stringify(game_data))
        this.$router.push('/in-game')
      }
    }
  }
</script>