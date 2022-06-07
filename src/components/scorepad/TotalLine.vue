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
              <label>{{ getPlayerScore }}</label>
            </b-col>
            <b-col sm="3">
              <label>{{ getIa1Score }}</label>
            </b-col>
            <b-col sm="3">
              <label>{{ getIa2Score }}</label>
            </b-col>
          </b-row>
        </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TotalLine',
  /* props: propriétés qui peuvent être envoyées par le parent */
  props: {
    index: Number,
    line: Object,
    readOnly: Boolean
  },
  computed: {
    getPlayerScore: function () {
      return this.line.player
    },
    getIa1Score: function () {
      return this.line.ia1
    },
    getIa2Score: function () {
      return this.line.ia2
    },
    getTitle: function () {
      return this.line.title
    }
  }
}
</script>

<style scoped>
</style>
