<template>
  <div>
    <div v-if="isLoading" class="d-flex justify-content-center mb-3">
      <b-spinner label="Chargement..."></b-spinner>
    </div>
    <b-pagination
      v-if="articles.length > perPage"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="articles-list"
      pills
      align="center"
      size="sm"
    >
    </b-pagination>

    <div id="articles-list">
      <Article
        v-for="(article, index) in currentPageItems"
        :key="article.id"
        v-bind:article="article"
        v-bind:idx="index"
        v-bind:mode="mode"
        :per-page="perPage"
        :current-page="currentPage"
      />
    </div>

    <b-pagination
      v-if="articles.length > perPage"
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
import Article from '@/components/Article.vue'
import syncService from '../services/sync.service.js'
import constants from '../globals'

export default {
  name: 'Articles',
  components: {
    Article
  },
  props: {
    limit: Number
  },
  mounted: function () {
    this.currentPage = this.$route.params && this.$route.params.page ? this.$route.params.page : 1
    this.fetchData()
  },
  data: function () {
    return {
      articles: [],
      isLoading: true,
      mode: 'light',
      perPage: constants.nbArticlesParPage,
      currentPage: 1
    }
  },
  computed: {
    rows () {
      console.log('nb articles:', this.articles.length)
      return this.articles.length
    },
    currentPageItems () {
      const lengthAll = this.articles.length
      const paginatedArticles = []
      let nbPages = 0
      for (let i = 0; i < lengthAll; i = i + this.perPage) {
        paginatedArticles[nbPages] = this.articles.slice(
          i,
          i + this.perPage
        )
        nbPages++
      }
      return paginatedArticles[this.currentPage - 1]
    }
  },
  methods: {
    fetchData: function () {
      this.isLoading = true
      // console.log('limit - fetchData', this.limit)
      syncService.getArticles(this.limit).then(function (data) {
        this.articles = data
        this.isLoading = false
      }.bind(this))
    }
  }
}
</script>
