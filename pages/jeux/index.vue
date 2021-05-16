<template>
  <div class="home">
    <div v-if="isLoading" class="d-flex justify-content-center mb-3 bla-spinner">
      <b-spinner label="Chargement..."></b-spinner>
    </div>
    <!-- Liste jeux -->
    <b-pagination
      v-if="jeux && jeux.length > perPage"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="list-jeux"
      pills
      align="center"
      size="sm"
    >
    </b-pagination>
    <div id="list-jeux">
      <b-table
        :items="jeux"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        responsive
        outlined
        class="jeu-header"
        tbody-tr-class="jeu-row">
        <template #cell(article)="row">
          <div
            v-for="art in row.item.articles"
            :key="art.id">
            <b-link :to="{ name: 'article-id', params: { id: art.codeUrl ? art.codeUrl : art.id} }" class="link-article">{{ art.titre }}</b-link>
            &nbsp;({{ $moment(art.datePublication).format('DD/MM/YYYY')}})
          </div>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import constants from '../../static/globals'
// => Mettre le fichier globals accessible comme un service?
// ==> NON, voir https://fr.nuxtjs.org/blog/moving-from-nuxtjs-dotenv-to-runtime-config/

export default {
  name: 'Jeux',
  layout: (context) => context.$device.isMobile ? 'mobile' : 'default',
  async asyncData({ params, $axios, $apiService }) {
    const jeux = await $apiService.getJeux()
    return { jeux, isLoading: false }
  },
  head() {
    return {
      title: 'Jeux solo',
      meta: [
        // `hid` est un identifiant unique. N'utilisez pas `vmid` pour cela car cela ne marchera pas.
        {
          hid: 'description',
          name: 'description',
          content: 'Liste des jeux solo'
        }
      ]
    }
  },
  data: function () {
    return {
      jeux: [],
      fields: [
        {
          key: 'nom',
          sortable: true,
          label: 'Titre'
        },
        {
          key: 'types',
          sortable: true,
          label: 'Type de solo',
          formatter: function (types) {
            const soloType = []
            types.forEach(type => {
              soloType.push(type.libelle)
            })
            return soloType.join(', ')
          }
        },
        {
          key: 'article',
          label: 'Article(s)'
        }
      ],
      isLoading: true,
      perPage: constants.nbJeuxParPage,
      currentPage: 1
    }
  },
  computed: {
    rows () {
      return this.jeux.length
    },
    currentPageItems () {
      const lengthAll = this.jeux.length
      const paginatedJeux = []
      let nbPages = 0
      for (let i = 0; i < lengthAll; i = i + this.perPage) {
        paginatedJeux[nbPages] = this.jeux.slice(
          i,
          i + this.perPage
        )
        nbPages++
      }
      return paginatedJeux[this.currentPage - 1]
    }
  }
}
</script>

<style>
.bla-spinner{
  margin-top: 5%;
}
.border {
  /*border: 1px solid #6C028F !important;*/
}
.jeu-row > td > div > a {
  color: #5F8F00;
}
.jeu-header > table > thead {
  background-color: #A406DB;
  color: rgb(240, 235, 235) !important;
}
.jeu-header > table > thead > tr > th > span{
  background-color: rgb(240, 235, 235) !important;
}
.jeu-row > td {
  border-bottom: 1px solid #6C028F !important;
}
#list-jeux {
  margin: 5%;
}
</style>
