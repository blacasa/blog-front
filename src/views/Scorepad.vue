<template>
  <div class="home scorepad-page-container">
    <!-- Titre -->
    <h2>{{ title }}</h2>
    <!-- Liste déroulante de scorepad disponibles -->
    <b-form-select
      id="scorepad-select"
      v-model="selectedScorepad"
      :options="scorepadList"
      class="mb-3"
      value-field="code"
      text-field="label"
      v-on:change="scorepadSelected">
    </b-form-select>
    <!-- Bouton de réinitialisation des scorepad -->
    <!-- Scorepad -->
    <div v-if="selectedScorepad === 'generic'">
      <Generic />
    </div>
    <div v-else-if="selectedScorepad === 'patchwork'">
      <Patchwork />
    </div>
    <div v-else-if="selectedScorepad === 'sprawlopolis'">
      <Sprawlopolis />
    </div>
  </div>
</template>

<script>
import syncService from '@/services/sync.service'
import Generic from '@/components/scorepad/Generic.vue'
import Patchwork from '@/components/scorepad/Patchwork.vue'
import Sprawlopolis from '@/components/scorepad/Sprawlopolis.vue'

export default {
  name: 'Home',
  components: {
    Generic,
    Patchwork,
    Sprawlopolis
  },
  data: function () {
    return {
      selectedScorepad: 'generic',
      scorepadList: [
        {
          code: 'generic',
          label: 'Scorepad générique'
        },
        {
          code: 'patchwork',
          label: 'Patchwork'
        },
        {
          code: 'sprawlopolis',
          label: 'Sprawlopolis'
        }
      ],
      title: 'Scorepad'
    }
  },
  mounted: function () {
    document.title = 'Scorepad jeux solo'
    document.querySelector('meta[name="description"]').setAttribute('content', 'Scorepad pour les jeux solo - 13jeuxsolo.fr')
    // Appel au back pour historiser l'accès à la page
    syncService.addVisit('scorepad')
  },
  methods: {
    scorepadSelected: function () {
      // Appel au back pour historiser l'accès à un scorepad spécifique
      syncService.addVisit('scorepad-' + this.selectedScorepad)
    }
  }
}
</script>

<style scoped>
.scorepad-page-container {
  padding: 20px;
}
</style>
