<template>
  <!-- Page listant les articles -->
  <div>
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
import constants from '../globals'

export default {
  name: 'Articles',
  components: {
    Article
  },
  props: {
    articles: Array,
    limit: Number
  },
  mounted: function () {
    this.currentPage = this.$route.params && this.$route.params.page ? this.$route.params.page : 1
  },
  data: function () {
    return {
      isLoading: true,
      mode: 'light',
      perPage: constants.nbArticlesParPage,
      currentPage: 1
    }
  },
  computed: {
    rows () {
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
  }
}
</script>
