<template>
  <!-- Page listant les articles -->
  <div>
    <!-- Afficher la liste des catégories -->
    <b-form-group v-if="showCategories" class="categories">
      <b-form-radio-group
        id="btn-radios-2"
        v-model="categorie"
        :options="categories"
        text-field='libelle'
        value-field='code'
        button-variant="outline-primary"
        size="sm"
        name="radio-btn-outline"
        buttons
        v-on:change="categorieSelected"
      ></b-form-radio-group>
    </b-form-group>

    <div v-if="articlesToShow.length === 0">
      Désolé, il n'y a pas encore d'article dans cette catégorie :(
    </div>

    <!-- Afficher la pagination -->
    <div class="top-pagination">
      <b-pagination
        v-if="articlesToShow.length > perPage"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="articles-list"
        pills
        align="center"
        size="sm"
      >
      </b-pagination>
    </div>

    <div id="articles-list">
      <Article
        v-for="(article, index) in currentPageItems"
        :key="article.id"
        v-bind:article="article"
        v-bind:idx="index"
        v-bind:mode="mode"
        :per-page="perPage"
        :current-page="currentPage"
        :showCategories="showCategories"
      />
    </div>

    <b-pagination
      v-if="articlesToShow.length > perPage"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="articles-list"
      pills
      align="center"
      size="sm"
    >
    </b-pagination>
  </div>
</template>

<script>
// import Article from '@/components/Article.vue'
import constants from '../static/globals'

export default {
  name: 'Articles',
  components: {
    //Article
  },
  props: {
    articles: Array,
    limit: Number,
    showCategories: Boolean
  },
  mounted: function () {
    this.currentPage = this.$route.params && this.$route.params.page ? this.$route.params.page : 1
    this.categorie = this.$route.params && this.$route.params.categorie ? this.$route.params.categorie : 'ALL'

    this.updateArticles()
  },
  data: function () {
    return {
      isLoading: true,
      mode: 'light',
      perPage: constants.nbArticlesParPage,
      currentPage: 1,
      categorie: null,
      categories: [],
      articleByCategorie: {},
      articlesToShow: []
    }
  },
  computed: {
    rows () {
      return this.articles.length
    },
    currentPageItems () {
      const lengthAll = this.articlesToShow.length
      const paginatedArticles = []
      let nbPages = 0
      for (let i = 0; i < lengthAll; i = i + this.perPage) {
        paginatedArticles[nbPages] = this.articlesToShow.slice(
          i,
          i + this.perPage
        )
        nbPages++
      }
      return paginatedArticles[this.currentPage - 1]
    }
  },
  methods: {
    categorieSelected: function (selectedCategorie) {
      this.articlesToShow = this.articleByCategorie[selectedCategorie]
      this.currentPage = 1
    },
    updateArticles: function () {
      const references = JSON.parse(localStorage.getItem('references'))
      const referenceCatagories = references.categories
      this.categories = JSON.parse(JSON.stringify(referenceCatagories))
      this.articleByCategorie = {}

      this.categories.forEach(categorie => {
        const articlesForCat = this.articles.filter(article => {
          return article.categories ? article.categories.includes(categorie.code) : false
        })
        this.articleByCategorie[categorie.code] = JSON.parse(JSON.stringify(articlesForCat))
        categorie.libelle += ' (' + this.articleByCategorie[categorie.code].length + ')'
      })
      this.categories.push({
        id: 0, code: 'ALL', libelle: 'Tous (' + this.articles.length + ')'
      })
      this.categories.sort((first, second) => {
        if (first.id < second.id) return -1
        else if (first.id < second.id) return 1
        return 0
      })
      this.articleByCategorie.ALL = this.articles
      this.articlesToShow = this.articleByCategorie[this.categorie]
    }
  },
  watch: {
    articles: function (val, oldVal) {
      this.updateArticles()
    }
  }
}
</script>

<style >
.categories {
  margin-top: 15px;
}
.top-pagination {
  margin-top: 10px;
}
</style>
