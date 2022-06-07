<template>
  <b-col :class="[color]">
    <label>{{ getTitle }}</label>
    <b-form-input v-model="score" @update="updateScore" type="number" :min="0"></b-form-input>
  </b-col>
</template>

<script>
export default {
  name: 'Zone',
  /* props: propriétés qui peuvent être envoyées par le parent */
  props: {
    color: String,
    type: String
  },
  data: function () {
    return {
      score: null
    }
  },
  computed: {
    getTitle: function () {
      let title = 'Zone '
      switch (this.type) {
        case 'commercial':
          title += 'Commerciale'
          break
        case 'industrial':
          title += 'Industrielle'
          break
        case 'park':
          title += 'de Parcs'
          break
        case 'residential':
          title += 'Résidentielle'
          break
        default:
          break
      }
      return title
    }
  },
  methods: {
    updateScore: function () {
      this.$emit('zone-score-event', this.type, this.score)
    }
  }
}
</script>

<style scoped>
.blue {
  background-color: deepskyblue;
  padding: 5px;
}
.green {
  background-color: forestgreen;
  padding: 5px;
}
.grey {
  background-color: darkgrey;
  padding: 5px;
}
.orange {
  background-color: chocolate;
  padding: 5px;
}
</style>
