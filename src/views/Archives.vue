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
      }.bind(this)).catch(() => {
        this.isLoading = false
        this.showNextPage = false
        this.$bvToast.toast('Le serveur n\'a pu être contacté. Merci de ré-essayer ultérieurement.', {
          title: 'Erreur',
          autoHideDelay: 5000,
          solid: true,
          toaster: 'b-toaster-top-center',
          variant: 'danger'
        })
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
