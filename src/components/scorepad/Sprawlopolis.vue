<template>
  <div class="home">
    <!-- Titre -->
    <h3>Scorepad Sprawlopolis</h3>
    <!-- Scorepad -->
    <b-container fluid>
      <b-row>
        <!-- 4 zones: 1 par couleur avec 1 zone de saisie, nombre >=0 -->
        <Zone color="blue" type="commercial" v-on:zone-score-event="updateZone"/>
        <Zone color="grey" type="industrial" v-on:zone-score-event="updateZone"/>
        <Zone color="green" type="park" v-on:zone-score-event="updateZone"/>
        <Zone color="orange" type="residential" v-on:zone-score-event="updateZone"/>
      </b-row>
    </b-container>
    <b-container fluid>
      <b-row>
        <!-- Routes: 1 zone de saisie, nombre >=0 (ce nombre sera mis en négatif dans le calcul du total) -->
        <Road v-on:road-score-event="updateRoad"/>
        <!-- 3 Objectifs: 1 liste déroulante, 1 zone de saisie -->
        <Objective
          number="1"
          :list="objectiveList1"
          v-on:objective-selected-event="objectiveSelected"
          v-on:objective-score-event="updateObjective"
        />
        <Objective
          number="2"
          :list="objectiveList2"
          v-on:objective-selected-event="objectiveSelected"
          v-on:objective-score-event="updateObjective"
        />
        <Objective
          number="3"
          :list="objectiveList3"
          v-on:objective-selected-event="objectiveSelected"
          v-on:objective-score-event="updateObjective"
        />
      </b-row>
    </b-container>
    <!-- Résultat: 1 zone avec le score objectif, 1 zone avec le score obtenu et affichage du résultat (gagné ou perdu) -->
    <b-container fluid>
      <b-row>
        <Result :playerScore="this.scores.total" :gameScore="scores.gameObjective"/>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Objective from '@/components/scorepad/sprawlopolis/Objective.vue'
import Result from '@/components/scorepad/sprawlopolis/Result.vue'
import Road from '@/components/scorepad/sprawlopolis/Road.vue'
import Zone from '@/components/scorepad/sprawlopolis/Zone.vue'

export default {
  name: 'Sprawlopolis',
  components: {
    Objective,
    Result,
    Road,
    Zone
  },
  mounted: function () {
    for (let i = 1; i <= 18; i++) {
      this.objectiveList1.push(i)
      this.objectiveList2.push(i)
      this.objectiveList3.push(i)
    }
  },
  data: function () {
    return {
      objectiveList1: [],
      objectiveList2: [],
      objectiveList3: [],
      objective1: 0,
      objective2: 0,
      objective3: 0,
      scores: {
        commercial: null,
        industrial: null,
        park: null,
        residential: null,
        road: null,
        objective1: null,
        objective2: null,
        objective3: null,
        gameObjective: null,
        total: null
      }
    }
  },
  methods: {
    objectiveSelected: function (number, objective) {
      switch (number) {
        case '1':
          this.objective1 = objective
          break
        case '2':
          this.objective2 = objective
          break
        case '3':
          this.objective3 = objective
          break
        default:
          break
      }
      this.scores.gameObjective = this.objective1 + this.objective2 + this.objective3
      this.objectiveList1 = []
      this.objectiveList2 = []
      this.objectiveList3 = []
      for (let i = 1; i <= 18; i++) {
        // MAJ list 1
        if (i !== this.objective2 && i !== this.objective3) this.objectiveList1.push(i)
        // MAJ list 2
        if (i !== this.objective1 && i !== this.objective3) this.objectiveList2.push(i)
        // MAJ list 3
        if (i !== this.objective1 && i !== this.objective2) this.objectiveList3.push(i)
      }
    },
    updateObjective: function (number, newScore) {
      switch (number) {
        case '1':
          this.scores.objective1 = newScore
          break
        case '2':
          this.scores.objective2 = newScore
          break
        case '3':
          this.scores.objective3 = newScore
          break
        default:
          break
      }
      this.updateTotal()
    },
    updateRoad: function (newScore) {
      this.scores.road = newScore
      this.updateTotal()
    },
    updateZone: function (type, newScore) {
      switch (type) {
        case 'commercial':
          this.scores.commercial = newScore
          break
        case 'industrial':
          this.scores.industrial = newScore
          break
        case 'park':
          this.scores.park = newScore
          break
        case 'residential':
          this.scores.residential = newScore
          break
        default:
          break
      }
      this.updateTotal()
    },
    updateTotal: function () {
      let newTotal = 0
      // Les Zones
      newTotal += parseInt(!Number.isNaN(parseInt(this.scores.commercial)) ? this.scores.commercial : 0)
      newTotal += parseInt(!Number.isNaN(parseInt(this.scores.industrial)) ? this.scores.industrial : 0)
      newTotal += parseInt(!Number.isNaN(parseInt(this.scores.park)) ? this.scores.park : 0)
      newTotal += parseInt(!Number.isNaN(parseInt(this.scores.residential)) ? this.scores.residential : 0)
      // Les Routes
      newTotal -= parseInt(!Number.isNaN(parseInt(this.scores.road)) ? this.scores.road : 0)
      // Les Objectifs
      newTotal += parseInt(!Number.isNaN(parseInt(this.scores.objective1)) ? this.scores.objective1 : 0)
      newTotal += parseInt(!Number.isNaN(parseInt(this.scores.objective2)) ? this.scores.objective2 : 0)
      newTotal += parseInt(!Number.isNaN(parseInt(this.scores.objective3)) ? this.scores.objective3 : 0)

      this.scores.total = newTotal
    }
  }
}
</script>

<style scoped>
</style>
