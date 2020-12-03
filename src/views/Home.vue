<template>
  <div class="home">
    <div v-if="isLoading" class="d-flex justify-content-center mb-3 bla-spinner">
      <b-spinner label="Chargement..."></b-spinner>
    </div>
    <!-- Liste articles -->
    <Articles :limit="this.limit" :articles="this.articles"/>
    <!-- Voir plus d'articles -->
    <b-link :v-if="this.showNextPage" :to="{ name: 'Archives', params: { page: 2 } }">Voir plus d'article</b-link>
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
      syncService.getArticles(this.limit).then(function (data) {
        this.articles = data
        this.isLoading = false
        this.showNextPage = this.articles.length > this.limit
      }.bind(this))
    }
  }
}
</script>

<style scoped>
.bla-spinner{
  margin-top: 5%;
}
</style>
