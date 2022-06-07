<template>
  <div class="home">
    <!-- Scorepad -->
    <div>
      <b-container fluid>
        <b-row class="my-1">
          <b-col sm="3">
            <label>{{ getTitle }}</label>
          </b-col>
          <b-col sm="3">
            <b-form-input v-model="scorePlayer" @update="updatePlayerScore" :readonly="this.readOnly" type="number"></b-form-input>
          </b-col>
          <b-col sm="3">
            <b-form-input v-model="scoreIa1" @update="updateIa1Score"  :readonly="this.readOnly" type="number"></b-form-input>
          </b-col>
          <b-col sm="3">
            <b-form-input v-model="scoreIa2" @update="updateIa2Score" :readonly="this.readOnly" type="number"></b-form-input>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScoreLine',
  /* props: propriétés qui peuvent être envoyées par le parent */
  props: {
    index: Number,
    line: Object,
    readOnly: Boolean
  },
  /* data: propriétés locales au component */
  data: function () {
    return {
      scorePlayer: this.line.player,
      scoreIa1: this.line.ia1,
      scoreIa2: this.line.ia2
    }
  },
  computed: {
    getPlayerScore: function () {
      return this.line.scorePlayer
    },
    getTitle: function () {
      return this.line.title
    }
  },
  methods: {
    updatePlayerScore: function () {
      this.$emit('player-score-event', this.scorePlayer, this.index)
    },
    updateIa1Score: function () {
      this.$emit('ia1-score-event', this.scoreIa1, this.index)
    },
    updateIa2Score: function () {
      this.$emit('ia2-score-event', this.scoreIa2, this.index)
    }
  }
}
</script>

<style scoped>
</style>
