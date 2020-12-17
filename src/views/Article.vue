<template>
  <!-- Page affichant le détail d'un Article -->
  <div>
    <div v-if="isLoading" class="d-flex justify-content-center mb-3 bla-spinner">
      <b-spinner label="Chargement..."></b-spinner>
    </div>
    <b-card
      header-tag="header"
      header-class="bla-detail-card-header"
      footer-class="bla-detail-card-footer"
      :title="article.titre"
      tag="article"
      class="mb-2 bla-detail-card"
    >
      <template #header>
        <Jeu :jeu="article.jeu"/>
      </template>
      <b-card-text v-html="content" class="bla-detail-card-content">
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
      return this.article.datePublication ? 'Publié le ' + moment(this.article.datePublication).format('DD/MM/yyyy') : ''
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
@media screen and (min-width: 800px) {
  .bla-detail-card-header {
    color: rgb(240, 235, 235);
    background-color: rgba(0, 0, 0, 0);
    background-image: url('/images/flag_01_03.png');
    background-size: 100% 100%;
    border-bottom: none;
  }
  .bla-detail-card-footer {
    background-color: rgba(0, 0, 0, 0);
    background-image: url('/images/flag_01_02.png');
    background-size: 100% 100%;
    border-top: none;
    color: #A406DB;
  }
}
@media screen and (max-width: 799px) {
  .bla-detail-card-header {
    background-color: #A406DB;
    color: rgb(240, 235, 235);
    border-bottom: none;
  }
  .bla-detail-card-footer {
    background-color: #5F8F00;
    border-top: none;
    color: rgb(240, 235, 235);
  }
}
.bla-detail-card-header > div {
  margin-top: 1.3em;
}
.bla-detail-card {
  background-color: rgb(240, 235, 235);
  /*border: #A406DB solid ;*/
  border: none;
  margin: 5% auto;
  width: 90%;
}
.bla-detail-card-content {
  margin: 5%;
  text-align: left;
}
.centered-img {
  font-size: 0.8em;
  text-align: center;
}
</style>
