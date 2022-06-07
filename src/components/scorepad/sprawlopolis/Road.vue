<template>
  <b-col>
    <label>Nb de Routes</label>
    <b-form-input class="road" v-model="score" @update="updateScore" type="number" :min="0"></b-form-input>
    <b-form-input v-model="roadScore" disabled type="number"></b-form-input>
  </b-col>
</template>

<script>
export default {
  name: 'Road',
  data: function () {
    return {
      score: null,
      roadScore: null
    }
  },
  methods: {
    updateScore: function () {
      this.roadScore = -1 * this.score
      this.$emit('road-score-event', this.score)
    }
  }
}
</script>

<style scoped>
.road {
    margin-bottom: 16px;
}
</style>
