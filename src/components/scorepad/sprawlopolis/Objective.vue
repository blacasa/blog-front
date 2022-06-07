<template>
  <b-col>
    <label>{{ getTitle }}</label>
    <b-form-select
      id="objective-select"
      v-model="selectedObjective"
      :options="list"
      class="mb-3"
      value-field="code"
      text-field="label"
      v-on:change="objectiveSelected">
    </b-form-select>
    <b-form-input v-model="score" @update="updateScore" type="number" :min="0"></b-form-input>
  </b-col>
</template>

<script>
export default {
  name: 'Objective',
  /* props: propriétés qui peuvent être envoyées par le parent */
  props: {
    list: Array,
    number: String
  },
  data: function () {
    return {
      selectedObjective: null,
      score: null
    }
  },
  computed: {
    getTitle: function () {
      let title = 'Objectif '
      if (this.selectedObjective) {
        title += this.selectedObjective
      }

      return title
    }
  },
  methods: {
    objectiveSelected: function () {
      this.$emit('objective-selected-event', this.number, this.selectedObjective)
    },
    updateScore: function () {
      this.$emit('objective-score-event', this.number, this.score)
    }
  }
}
</script>

<style scoped>
</style>
