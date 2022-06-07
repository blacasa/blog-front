<template>
  <div class="home">
    <!-- Scorepad -->
    <div>
      <b-container fluid>
        <b-row class="my-1">
          <b-col sm="4">
            <label>{{ getTitle }}</label>
          </b-col>
          <b-col sm="4">
            <b-form-input v-if="!hidePlayer" v-model="scorePlayer" @update="updatePlayerScore" :readonly="this.readOnly" type="number"></b-form-input>
          </b-col>
          <b-col sm="4">
            <b-form-input v-if="!hideIa" v-model="scoreIa" @update="updateIaScore"  :readonly="this.readOnly" type="number"></b-form-input>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScoreLine2',
  /* props: propriétés qui peuvent être envoyées par le parent */
  props: {
    hidePlayer: Boolean,
    hideIa: Boolean,
    title: String,
    type: String,
    readOnly: Boolean
  },
  /* data: propriétés locales au component */
  data: function () {
    return {
      scorePlayer: null,
      scoreIa: null
    }
  },
  computed: {
    getPlayerScore: function () {
      return this.line.scorePlayer
    },
    getTitle: function () {
      return this.title
    }
  },
  methods: {
    updatePlayerScore: function () {
      this.$emit('player-score-event', this.scorePlayer, this.type)
    },
    updateIaScore: function () {
      this.$emit('ia-score-event', this.scoreIa, this.type)
    }
  }
}
</script>

<style scoped>
</style>
