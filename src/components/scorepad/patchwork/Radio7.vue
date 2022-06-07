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
                <b-form-checkbox
                  id="checkbox-1"
                  v-model="player7"
                  name="checkbox-1"
                  value="player"
                  unchecked-value="none"
                  v-on:change="updatePlayer"
                >
                </b-form-checkbox>
              </b-col>
              <b-col sm="4">
                <b-form-checkbox
                  id="checkbox-2"
                  v-model="ia7"
                  name="checkbox-2"
                  value="ia"
                  unchecked-value="none"
                  v-on:change="updateIa"
                >
                </b-form-checkbox>
              </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Radio7',
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
      player7: null,
      ia7: null,
      selected: null
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
    updatePlayer: function () {
      if (this.player7 === 'player') {
        this.ia7 = 'none'
      }
      this.$emit('player-7-event', this.player7)
    },
    updateIa: function () {
      if (this.ia7 === 'ia') {
        this.player7 = 'none'
      }
      this.$emit('ia-7-event', this.ia7)
    }
  }
}
</script>

<style scoped>
</style>
