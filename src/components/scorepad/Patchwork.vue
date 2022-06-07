<template>
  <div class="home">
    <!-- Titre -->
    <h3>Scorepad Patchwork</h3>
    <!-- Scorepad -->
    <b-container fluid>
      <b-row class="my-1">
        <b-col sm="4">
        </b-col>
        <b-col sm="4">
          <label>Joueur</label>
        </b-col>
        <b-col sm="4">
          <label>Automa</label>
        </b-col>
      </b-row>
    </b-container>
    <!-- Choix du niveau de l'IA -->
    <AutomaLevel
      title="Niveau de l'Automa"
      :levels="levels"
      default="intern"
      v-on:ia-level-event="updateLevel"
    />
    <!-- Radio bouton 7x7 -->
    <Radio7
      title="7x7"
      v-on:player-7-event="updatePlayer7"
      v-on:ia-7-event="updateIa7"
    />
    <!-- Nb de boutons -->
    <ScoreLine2
      type="nbBtn"
      title="Nombre de Bouton"
      :hidePlayer="false"
      :hideIa="!showNbBtn"
      :readOnly="false"
      v-on:player-score-event="updatePlayerScore"
      v-on:ia-score-event="updateIaScore"
    />
    <!-- Nb de cases vides -->
    <ScoreLine2
      type="nbCVide"
      title="Nombre de Cases Vides"
      :hidePlayer="false"
      :hideIa="true"
      :readOnly="false"
      v-on:player-score-event="updatePlayerScore"
      v-on:ia-score-event="updateIaScore"
    />
    <!-- Tissu avec bouton -->
    <ScoreLine2
      v-if="showTBtn"
      type="tBtn"
      title="Nombre de Tissu avec Bouton"
      :hidePlayer="true"
      :hideIa="false"
      :readOnly="false"
      v-on:player-score-event="updatePlayerScore"
      v-on:ia-score-event="updateIaScore"
    />
    <!-- Boutons sur les tissus -->
    <ScoreLine2
      v-if="showBtnT"
      type="BtnT"
      title="Nombre de Bouton sur les Tissus"
      :hidePlayer="true"
      :hideIa="false"
      :readOnly="false"
      v-on:player-score-event="updatePlayerScore"
      v-on:ia-score-event="updateIaScore"
    />
    <!-- Total -->
    <TotalLine2
      title="Total"
      :player="scores.player.total"
      :ia="scores.ia.total"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import AutomaLevel from '@/components/scorepad/patchwork/AutomaLevel.vue'
import Radio7 from '@/components/scorepad/patchwork/Radio7.vue'
import ScoreLine2 from '@/components/scorepad/patchwork/ScoreLine2.vue'
import TotalLine2 from '@/components/scorepad/patchwork/TotalLine2.vue'

export default {
  name: 'Patchwork',
  components: {
    AutomaLevel,
    Radio7,
    ScoreLine2,
    TotalLine2
  },
  data: function () {
    return {
      levels: [
        { code: 'intern', label: 'I- Intern' },
        { code: 'apprentice', label: 'II- Apprentice' },
        { code: 'fellow', label: 'III- Fellow' },
        { code: 'master', label: 'IV- Master' },
        { code: 'legend', label: 'V- Legend' }
      ],
      selectedLevel: 'apprentice',
      scores: {
        player: {
          bonus7: 0,
          nbBtn: 0,
          nbCVide: 0,
          tBtn: 0,
          BtnT: 0,
          total: 0
        },
        ia: {
          bonus7: 0,
          nbBtn: 0,
          nbCVide: 0,
          tBtn: 0,
          BtnT: 0,
          total: 0
        }
      },
      showNbBtn: false,
      showTBtn: false,
      showBtnT: false
    }
  },
  methods: {
    updateLevel: function (selected) {
      this.selectedLevel = selected
      switch (selected) {
        case 'intern':
          this.showNbBtn = false
          this.showTBtn = false
          this.showBtnT = false
          this.scores.ia.nbBtn = 0
          this.scores.ia.tBtn = 0
          this.scores.ia.BtnT = 0
          break
        case 'apprentice':
          this.showNbBtn = true
          this.showTBtn = false
          this.showBtnT = false
          this.scores.ia.tBtn = 0
          this.scores.ia.BtnT = 0
          break
        case 'fellow':
          this.showNbBtn = true
          this.showTBtn = true
          this.showBtnT = false
          this.scores.ia.BtnT = 0
          break
        case 'master':
          this.showNbBtn = true
          this.showTBtn = false
          this.showBtnT = true
          this.scores.ia.tBtn = 0
          break
        case 'legend':
          this.showNbBtn = true
          this.showTBtn = true
          this.showBtnT = true
          break
        default:
          break
      }
      this.updateTotal()
    },
    updatePlayer7: function (selected) {
      if (selected === 'player') {
        this.scores.player.bonus7 = 7
        this.scores.ia.bonus7 = 0
      } else {
        this.scores.player.bonus7 = 0
      }
      this.updateTotal()
    },
    updateIa7: function (selected) {
      if (selected === 'ia') {
        this.scores.ia.bonus7 = 7
        this.scores.player.bonus7 = 0
      } else {
        this.scores.ia.bonus7 = 0
      }
      this.updateTotal()
    },
    updatePlayerScore: function (score, type) {
      this.scores.player[type] = score
      this.updateTotal()
    },
    updateIaScore: function (score, type) {
      this.scores.ia[type] = score
      this.updateTotal()
    },
    updateTotal: function () {
      // Player
      let newTotal = 0
      // 7x7
      newTotal += this.scores.player.bonus7
      // Btn
      newTotal += parseInt(!Number.isNaN(parseInt(this.scores.player.nbBtn)) ? this.scores.player.nbBtn : 0)
      // nbCVide
      newTotal -= 2 * parseInt(!Number.isNaN(parseInt(this.scores.player.nbCVide)) ? this.scores.player.nbCVide : 0)
      this.scores.player.total = newTotal

      // IA
      newTotal = 0

      // 7x7
      newTotal += this.scores.ia.bonus7
      // Btn
      newTotal += parseInt(!Number.isNaN(parseInt(this.scores.ia.nbBtn)) ? this.scores.ia.nbBtn : 0)
      // tBtn
      newTotal += parseInt(!Number.isNaN(parseInt(this.scores.ia.tBtn)) ? this.scores.ia.tBtn : 0)
      // BtnT
      newTotal += parseInt(!Number.isNaN(parseInt(this.scores.ia.BtnT)) ? this.scores.ia.BtnT : 0)
      this.scores.ia.total = newTotal
    }
  }
}
</script>

<style scoped>
</style>
