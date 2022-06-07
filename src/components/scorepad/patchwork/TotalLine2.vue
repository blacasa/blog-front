<template>
  <div class="home">
    <!-- Scorepad -->
    <b-container fluid>
      <b-row class="my-1">
        <b-col sm="4">
            <label>{{ getTitle }}</label>
        </b-col>
        <b-col sm="4" v-bind:class="{ win: hasWin, lose: hasLose }">
          <label>{{ getPlayerScore }}</label>
        </b-col>
        <b-col sm="4">
          <label>{{ getIaScore }}</label>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'TotalLine2',
  /* props: propriétés qui peuvent être envoyées par le parent */
  props: {
    player: Number,
    ia: Number,
    title: String
  },
  computed: {
    getPlayerScore: function () {
      return this.player
    },
    getIaScore: function () {
      return this.ia
    },
    getTitle: function () {
      return this.title
    },
    hasLose: function () {
      return this.player < this.ia
    },
    hasWin: function () {
      return this.player > this.ia
    }
  }
}
</script>

<style scoped>
.win {
  background-color: green;
  color: lightgrey;
}
.lose {
  background-color: darkred;
  color: lightgrey;
}
</style>
