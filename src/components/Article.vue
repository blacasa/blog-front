<template>
  <div class="div-article">
    <b-card
      :header="this.headerCard()"
      header-class="bla-card-header"
      tag="article"
      class="mb-2 bla-card"
      footer-tag="footer"
      footer-class="bla-card-footer"
    >
      <b-card-text class="bla-card-content">
        <img v-if="article.image !== null" v-bind:src="article.image" class="card-image"/>
        <p v-html="content"></p>
        <p class="see-more">
        <b-link :to="{ name: 'Article', params: { id: article.id, article: article} }">Lire la suite</b-link>
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
        return this.article.contenu.substring(0, 200) + '...'
      } else {
        return this.article.contenu
      }
    },
    image: function () {
      const img = this.article.image
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
  border: #A406DB solid ;
  margin: 5% auto;
  width: 90%;
}
.bla-card-header {
  background-color: #A406DB;
  color: rgb(240, 235, 235);
}
.bla-card-content {
  background-color: rgb(240, 235, 235);
  text-align: left;
}
.bla-card-footer {
  background-color: #5F8F00;
  color: rgb(240, 235, 235);
}
.card-image {
  float: left;
  margin-right: 2%;
  width: 20%;
}
.div-article{
  margin-bottom: 10px;
  margin-top: 10px;
}
.see-more {
  text-align: right;
}
</style>
