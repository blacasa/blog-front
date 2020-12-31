<template>
  <div class="home">
    <div v-if="isLoading" class="d-flex justify-content-center mb-3 bla-spinner">
      <b-spinner label="Chargement..."></b-spinner>
    </div>
    <!-- Liste articles -->
    <Articles :limit="this.limit" :articles="this.articles"/>
    <!-- Voir plus d'articles -->
    <div v-if="showNextPage"><b-link :to="{ name: 'Archives', params: { page: 2 } }">Voir plus d'articles</b-link></div>
  </div>
</template>

<script>
// @ is an alias to /src
import Articles from '@/components/Articles.vue'
import constants from '../globals'
import syncService from '../services/sync.service.js'

export default {
  name: 'Home',
  components: {
    Articles
  },
  data: function () {
    return {
      articles: [],
      publishedArticles: 0,
      isLoading: false,
      limit: constants.nbArticles,
      showNextPage: false
    }
  },
  mounted: function () {
    this.fetchData()
  },
  methods: {
    fetchData: function () {
      this.isLoading = true
      syncService.getReferences().then(data => {
        this.publishedArticles = data.nbPublishedArticles
        syncService.getArticles(this.limit).then(function (data) {
          this.articles = data
          this.isLoading = false
          this.showNextPage = this.publishedArticles > this.limit
        }.bind(this)).catch(() => {
          this.isLoading = false
          this.showNextPage = false
          this.displayError()
        })
      }).catch(() => {
        this.isLoading = false
        this.showNextPage = false
        this.displayError()
      })
    },
    displayError: function () {
      this.$bvToast.toast('Le serveur n\'a pu être contacté. Merci de ré-essayer ultérieurement.', {
        title: 'Erreur',
        autoHideDelay: 5000,
        solid: true,
        toaster: 'b-toaster-top-center',
        variant: 'danger'
      })
    }
  }
}
</script>

<style scoped>
.bla-spinner{
  margin-top: 5%;
}
</style>
