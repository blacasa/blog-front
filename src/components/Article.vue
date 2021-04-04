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
        <div class="card-image-div">
          <img v-if="image !== null" v-bind:src="image" class="card-image"/>
        </div>
        <p v-html="content" v-on:click="readArticle"></p>
        <p class="see-more">
        <b-link :to="{ name: 'Article', params: { id: article.codeUrl ? article.codeUrl : article.id, article: article} }">Lire la suite</b-link>
        </p>
      </b-card-text>

      <template #footer>
        <b-row>
          <b-col cols="6" class="footer-categories">
            <small>{{ categoriesLabel() }}</small>
            <span v-for="(cat, index) in catLibelles" :key="cat.code">
              <small>
                <b-link v-if="!showCategories" :to="{ name: 'Archives', params: { categorie: cat.code} }" class="cat-link">{{ cat.libelle }}<span v-if="index !== catLibelles.length-1">, </span></b-link>
                <span v-if="showCategories">{{ cat.libelle }}&nbsp;</span>
              </small>
            </span>
          </b-col>
          <b-col cols="6" class="published-date">
            <small>{{ publishedDate() }}</small>
          </b-col>
        </b-row>
      </template>
    </b-card>
  </div>
</template>

<script>
import moment from 'moment'
import constants from '../globals'
import router from '../router/index'

export default {
  name: 'Article',
  props: {
    article: {},
    idx: Number,
    mode: String,
    showCategories: Boolean
  },
  data: function () {
    return {
      catLibelles: null
    }
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
      const img = this.article.jeu !== null && this.article.jeu.image !== null
        ? constants.imagesURL + this.article.jeu.image
        : null

      return img
    }
  },
  methods: {
    headerCard: function () {
      let headerTitle = ''
      if (this.article.jeu !== null) {
        headerTitle += this.article.jeu.nom + ' - '
      }
      headerTitle += this.article.titre

      return headerTitle
    },
    publishedDate: function () {
      return 'Publié le ' + moment(this.article.datePublication).format('DD/MM/yyyy')
    },
    categoriesLabel: function () {
      if (this.catLibelles !== null) {
        return 'Categorie' + (this.catLibelles.length > 1 ? 's' : '') + ': '
      }
      const catCodes = this.article.categories ? this.article.categories.split('|') : null
      if (catCodes !== null) {
        const references = JSON.parse(localStorage.getItem('references'))
        const referenceCatagories = references.categories
        this.catLibelles = catCodes.map(categorieCode => {
          const foundedCat = referenceCatagories.filter(refCategorie => {
            return refCategorie.code === categorieCode
          })
          if (foundedCat) {
            return foundedCat[0]
          }
        })
        return 'Categorie' + (this.catLibelles.length > 1 ? 's' : '') + ': '
      }
      return ''
    },
    readArticle: function () {
      router.push({
        name: 'Article',
        params: {
          id: this.article.codeUrl ? this.article.codeUrl : this.article.id,
          article: this.article
        }
      })
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
    background-image: url('/images/flag_01_03.webp');
    background-size: 100% 100%;
    border-bottom: none;
  }
  .bla-list-card-footer {
    background-color: rgba(0, 0, 0, 0);
    background-image: url('/images/flag_01_02.webp');
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
  width: 250px;
  height: 178px;
  object-fit: contain;
}
.card-image-div {
  float: left;
  margin-right: 10px;
}
.footer-categories {
  padding-left: 7%;
  text-align: left;
}
.cat-link {
  padding-top: 0;
}
.div-article{
  margin-bottom: 10px;
  margin-top: 10px;
}
.published-date {
  padding-right: 7%;
  text-align: right;
}
.see-more {
  text-align: right;
}
</style>
