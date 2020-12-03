<template>
  <div class="home">
    <!-- Liste articles -->
    <Articles :limit="this.limit" />
    <!-- Voir plus d'articles -->
    <b-link :to="{ name: 'Archives', params: { page: 2 } }">Voir plus d'article</b-link>
  </div>
</template>

<script>
// @ is an alias to /src
import Articles from '@/components/Articles.vue'
import constants from '../globals'

export default {
  name: 'Home',
  components: {
    Articles
  },
  data: function () {
    return {
      limit: constants.nbArticles
    }
  }
}
</script>
