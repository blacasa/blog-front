<template>
  <div class="home">
    <div v-if="isLoading" class="d-flex justify-content-center mb-3 bla-spinner">
      <b-spinner label="Chargement..."></b-spinner>
    </div>
    <!-- Liste articles -->
    <Articles :articles="this.articles"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Articles from '@/components/Articles.vue'
import syncService from '../services/sync.service.js'

export default {
  name: 'Home',
  components: {
    Articles
  },
  data: function () {
    return {
      articles: [],
      isLoading: false
    }
  },
  mounted: function () {
    this.fetchData()
  },
  methods: {
    fetchData: function () {
      this.isLoading = true
      syncService.getArticles().then(function (data) {
        this.articles = data
        this.isLoading = false
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
