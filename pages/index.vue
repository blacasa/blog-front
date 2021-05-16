<template>
  <div class="home">
    <div v-if="isLoading" class="d-flex justify-content-center mb-3 bla-spinner">
      <b-spinner label="Chargement..."></b-spinner>
    </div>
    <!-- Liste articles -->
    <Articles :limit="limit" :articles="articles" :showCategories="false"/>
    <!-- Voir plus d'articles -->
    <div v-if="showNextPage"><b-link :to="{ name: 'articles', params: { page: 2 } }">Voir plus d'articles</b-link></div>
  </div>
</template>

<script lang="ts">
import constants from '../static/globals'
import Vue from 'vue'
//*
export default {
  layout: ({ $device }) => $device?.isMobile ? 'mobile' : 'default',
  //*
  async asyncData({ $apiService }) {
    const references = await $apiService.getReferences()
    // localStorage.setItem('references', JSON.stringify(references))
    const articles = await $apiService.getArticles(constants.nbArticles)
  
    return {
      references,
      articles,
      isLoading: false,
      publishedArticles: references.nbPublishedArticles,
      showNextPage: references.nbPublishedArticles > constants.nbArticles
    }
  },
  //*/
  data: function () {
    return {
      articles: [],
      publishedArticles: 0,
      isLoading: false,
      limit: constants.nbArticles,
      showNextPage: false
    }
  },
  methods: {
    fetchData: function () {
      /*
      this.isLoading = true
      syncService.getReferences().then(references => {
        localStorage.setItem('references', JSON.stringify(references))
        this.publishedArticles = references.nbPublishedArticles
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
      //*/
    },
    displayError: function () {
      /*
      this.$bvToast.toast('Le serveur n\'a pu être contacté. Merci de vérifier votre connexion et de ré-essayer ultérieurement.', {
        title: 'Erreur',
        autoHideDelay: 5000,
        solid: true,
        toaster: 'b-toaster-top-center',
        variant: 'danger'
      })
      // */
    }
  }
}
//*/
/*
export default {
  layout: (context) => context?.$device?.isMobile ? 'mobile' : 'default',
  mounted() {
    console.log('coucou', this.$device.isMobile)
  }
}
//*/
</script>

<style>
.container {
  margin: 0 auto;
  /*min-height: 100vh;*/
  display: flex;
  justify-content: center;
  align-items: center;
  /*text-align: center;*/
}

.title {
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

<style scoped>
.bla-spinner{
  margin-top: 5%;
}
</style>
