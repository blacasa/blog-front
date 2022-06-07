<template>
  <div class="home">
    <!-- Titre -->
    <h3>Scorepad Générique</h3>
    <!-- Scorepad -->
    <b-container fluid>
      <b-row class="my-1">
        <b-col sm="3">
        </b-col>
        <b-col sm="3">
          <label>Joueur</label>
        </b-col>
        <b-col sm="3">
          <label>IA 1</label>
        </b-col>
        <b-col sm="3">
          <label>IA 2</label>
        </b-col>
      </b-row>
    </b-container>
    <ScoreLine
      v-for="(line, index) in rows"
      :key="index"
      v-bind:line="line"
      v-bind:index="index"
      v-bind:readOnly="false"
      v-on:player-score-event="updatePlayerScore"
      v-on:ia1-score-event="updateIa1Score"
      v-on:ia2-score-event="updateIa2Score"
    />
    <TotalLine
      v-bind:line="totalLine"
      :index="0"
      :readOnly="true"
    />
    <button v-on:click="addNewRow">Ajouter une ligne</button>
  </div>
</template>

<script>
// @ is an alias to /src
import ScoreLine from '@/components/scorepad/ScoreLine.vue'
import TotalLine from '@/components/scorepad/TotalLine.vue'

export default {
  name: 'Generic',
  components: {
    ScoreLine,
    TotalLine
  },
  mounted: function () {
    this.addNewRow()
  },
  data: function () {
    return {
      emptyRow: {
        title: 'item ',
        player: 0,
        ia1: 0,
        ia2: 0
      },
      rows: [],
      totalLine: {
        title: 'Total',
        player: 0,
        ia1: 0,
        ia2: 0
      }
    }
  },
  methods: {
    addNewRow: function () {
      const newRow = JSON.parse(JSON.stringify(this.emptyRow))
      newRow.title += this.rows.length + 1
      this.rows.push(newRow)
    },
    updatePlayerScore: function (newScore, index) {
      this.rows[index].player = newScore
      this.updateTotal()
    },
    updateIa1Score: function (newScore, index) {
      this.rows[index].ia1 = newScore
      this.updateTotal()
    },
    updateIa2Score: function (newScore, index) {
      this.rows[index].ia2 = newScore
      this.updateTotal()
    },
    updateTotal: function () {
      this.totalLine = {
        title: 'Total',
        player: 0,
        ia1: 0,
        ia2: 0
      }
      this.rows.forEach(row => {
        this.totalLine.player += parseInt(!Number.isNaN(parseInt(row.player)) ? row.player : 0)
        this.totalLine.ia1 += parseInt(!Number.isNaN(parseInt(row.ia1)) ? row.ia1 : 0)
        this.totalLine.ia2 += parseInt(!Number.isNaN(parseInt(row.ia2)) ? row.ia2 : 0)
      })
    }
  }
}
</script>

<style scoped>
</style>
