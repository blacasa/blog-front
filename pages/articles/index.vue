<template>
  <div class="home">
    <!-- Liste articles -->
    <Articles :articles="this.articles"  :showCategories="true"/>
  </div>
</template>

<script>
import constants from '../../static/globals'
import moment from 'moment'

export default {
  layout: ({ $device }) => $device?.isMobile ? 'mobile' : 'default',
  async asyncData({ route, $apiService }) {
    const articles = await $apiService.getArticles()

    return {
      articles: articles
    }
  },
  data: function ()  {
    return {
      articles: []
    }
  }
}
</script>
