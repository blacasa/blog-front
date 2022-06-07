<template>
  <b-col>
    <label class="objective">Objectif: {{ getGameScore }}</label>
    <label class="player" v-bind:class="{ win: getResult, lose: !getResult }">Total ({{ getResultText }}): {{ getPlayerScore }}</label>
  </b-col>
</template>

<script>
export default {
  name: 'Result',
  /* props: propriétés qui peuvent être envoyées par le parent */
  props: {
    playerScore: Number,
    gameScore: Number
  },
  data: function () {
    return {
      hasWin: false
    }
  },
  computed: {
    getGameScore: function () {
      return this.gameScore
    },
    getPlayerScore: function () {
      return this.playerScore
    },
    getResult: function () {
      return this.playerScore >= this.gameScore
    },
    getResultText: function () {
      return this.playerScore >= this.gameScore ? 'victoire' : 'défaite'
    }
  }
}
</script>

<style scoped>
.objective {
  margin-top: 20px;
  width: 50%
}
.player {
  color: lightgrey;
  margin-top: 20px;
  width: 50%
}
.win {
  background-color: green;
}
.lose {
  background-color: darkred;
}
</style>
