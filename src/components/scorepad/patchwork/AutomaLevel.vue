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
              </b-col>
              <b-col sm="4">
                <b-form-select
                  id="ia-level-select"
                  v-model="selected"
                  :options="levels"
                  class="mb-3"
                  value-field="code"
                  text-field="label"
                  v-on:change="levelSelected">
                </b-form-select>
              </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AutomaLevel',
  /* props: propriétés qui peuvent être envoyées par le parent */
  props: {
    default: String,
    title: String,
    levels: Array
  },
  /* data: propriétés locales au component */
  data: function () {
    return {
      selected: this.default
    }
  },
  computed: {
    getTitle: function () {
      return this.title
    }
  },
  methods: {
    levelSelected: function () {
      this.$emit('ia-level-event', this.selected)
    }
  }
}
</script>

<style scoped>
</style>
