<template>
  <!-- Composant affichant un Article en mode liste -->
  <div class="div-article">
    <b-card
      :header="this.headerCard()"
      header-class="bla-list-card-header"
      tag="article"
      class="mb-2 bla-card"
      footer-tag="footer"
      footer-class="bla-list-card-footer"
    >
      <b-card-text class="bla-card-content">
        <img v-if="article.jeu.image !== null" v-bind:src="article.jeu.image" class="card-image"/>
        <p v-html="content"></p>
        <p class="see-more">
        <b-link :to="{ name: 'Article', params: { id: article.codeUrl ? article.codeUrl : article.id, article: article} }">Lire la suite</b-link>
        </p>
      </b-card-text>

      <template #footer>
        <small>{{ publishedDate() }}</small>
      </template>
    </b-card>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Article',
  props: {
    article: {},
    idx: Number,
    mode: String
  },
  computed: {
    content: function () {
      if (this.mode === 'light') {
        return this.article.contenu.substring(0, 800) + '...'
      } else {
        return this.article.contenu
      }
    },
    image: function () {
      const img = this.article.jeu.image
      return img
    }
  },
  methods: {
    headerCard: function () {
      return this.article.jeu.nom + ' - ' + this.article.titre
    },
    publishedDate: function () {
      return 'Publié le ' + moment(this.article.datePublication).format('DD/MM/yyyy')
    }
  }
}
</script>
<style scoped>
.bla-card {
  background-color: rgb(240, 235, 235);
  /*border: #A406DB solid ;*/
  border: none;
  margin: 5% auto;
  width: 90%;
}
.bla-card-content {
  background-color: rgb(240, 235, 235);
  text-align: left;
}
@media screen and (min-width: 800px) {
  .bla-list-card-header {
    color: rgb(240, 235, 235);
    background-color: rgba(0, 0, 0, 0);
    background-image: url('/images/flag_01_03.png');
    background-size: 100% 100%;
    border-bottom: none;
  }
  .bla-list-card-footer {
    background-color: rgba(0, 0, 0, 0);
    background-image: url('/images/flag_01_02.png');
    background-size: 100% 100%;
    border-top: none;
    color: #A406DB;
  }
}
@media screen and (max-width: 799px) {
  .bla-list-card-header {
    background-color: #A406DB;
    color: rgb(240, 235, 235);
    border-bottom: none;
  }
  .bla-list-card-footer {
    background-color: #5F8F00;
    border-top: none;
    color: rgb(240, 235, 235);
  }
}
.card-image {
  float: left;
  margin-right: 2%;
  width: 20%;
  max-width: 200px;
}
.div-article{
  margin-bottom: 10px;
  margin-top: 10px;
}
.see-more {
  text-align: right;
}
</style>
