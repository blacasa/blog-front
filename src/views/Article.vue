<template>
  <div>
    <div v-if="isLoading" class="d-flex justify-content-center mb-3 bla-spinner">
      <b-spinner label="Chargement..."></b-spinner>
    </div>
    <!-- Détail Article id: {{ id }} -->
    <b-card
      header-tag="header"
      header-class="bla-card-header"
      footer-class="bla-card-footer"
      :title="article.titre"
      tag="article"
      class="mb-2 bla-card"
    >
      <template #header>
        <Jeu :jeu="article.jeu" :image="article.image"/>
      </template>
      <b-card-text v-html="content" class="bla-card-content">
      </b-card-text>
      <template #footer>
        <small>{{ publishedDate() }}</small>
      </template>
    </b-card>
  </div>
</template>

<script>
import syncService from '../services/sync.service.js'
import Jeu from '../components/Jeu'
import moment from 'moment'

export default {
  name: 'Article',
  components: {
    Jeu
  },
  data: function () {
    return {
      id: null,
      article: {},
      isLoading: true
    }
  },
  mounted: function () {
    this.isLoading = true
    const id = this.$route.params ? this.$route.params.id : -1
    this.setId(id)
    const paramArticle = this.$route.params && this.$route.params.article ? this.$route.params.article : null
    if (paramArticle === null) {
      syncService.getArticle(this.id).then(function (data) {
        this.setArticle(data)
        this.isLoading = false
      }.bind(this))
    } else {
      this.setArticle(paramArticle)
      this.isLoading = false
    }
  },
  computed: {
    content: function () {
      const updatedContent = this.article.contenu ? this.article.contenu
        .replace('[img]', '<div class="centered-img">')
        .replace('[/img]', '</div>') : this.article.contenu
      return updatedContent
    }
  },
  methods: {
    setId: function (newId) {
      this.id = newId
    },
    setArticle: function (newArticle) {
      this.article = newArticle
    },
    publishedDate: function () {
      return 'Publié le ' + moment(this.article.datePublication).format('DD/MM/yyyy')
    }
  }
}
</script>
<style>
.bla-spinner{
  margin-top: 5%;
}
.card-image {
  float: left;
  margin-right: 2%;
  width: 20%;
}
.bla-card-header {
  background-color: #A406DB;
  color: rgb(240, 235, 235);
}
.bla-card {
  background-color: rgb(240, 235, 235);
  border: #A406DB solid ;
  margin: 5% auto;
  width: 90%;
}
.bla-card-content {
  margin: 5%;
  text-align: left;
}
.bla-card-footer {
  background-color: #5F8F00;
  color: rgb(240, 235, 235);
}
.centered-img {
  font-size: 0.8em;
  text-align: center;
}
</style>
