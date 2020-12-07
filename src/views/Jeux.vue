<template>
  <div class="home">
    <div v-if="isLoading" class="d-flex justify-content-center mb-3 bla-spinner">
      <b-spinner label="Chargement..."></b-spinner>
    </div>
    <!-- Liste jeux -->
    <b-pagination
      v-if="jeux.length > perPage"
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
            <b-link :to="{ name: 'Article', params: { id: art.id } }" class="link-article">{{ art.titre }}</b-link>
            &nbsp;({{ art.datePublication | moment('DD/MM/YYYY')}})
          </div>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import constants from '../globals'
import syncService from '../services/sync.service.js'
import store from '../store'

export default {
  name: 'Jeux',
  mounted: function () {
    this.$store.subscribe((action) => {
      if (action.type === 'setGames') {
        // ici
        this.jeux = store.state.games
        this.isLoading = false
      }
    }).bind(this)
    this.fetchData()
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
          key: 'annee',
          sortable: true
        },
        {
          key: 'jMin',
          sortable: true,
          sortByFormatted: true,
          label: 'Joueur(s)',
          formatter: function (jMin, key, jeu) {
            if (jeu.jMin === jeu.jMax) {
              return jeu.jMin
            } else {
              return jeu.jMin + ' à ' + jeu.jMax
            }
          }
        },
        {
          key: 'dureeMin',
          sortable: true,
          sortByFormatted: true,
          label: 'Durée',
          formatter: function (dureeMin, key, jeu) {
            if (jeu.dureeMin === jeu.dureeMax) {
              return jeu.dureeMin + '\''
            } else {
              return jeu.dureeMin + '\' à ' + jeu.dureeMax + '\''
            }
          }
        },
        {
          key: 'editeurs',
          sortable: true,
          label: 'Editeur(s)',
          formatter: function (editeurs) {
            const editors = []
            editeurs.forEach(editor => {
              editors.push(editor.libelle)
            })
            return editors.join(', ')
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
  },
  methods: {
    fetchData: function () {
      if (!store.state.fromSearch) {
        this.isLoading = true
        syncService.getJeux().then(function (data) {
          this.jeux = data
          this.isLoading = false
        }.bind(this))
      } else {
        this.jeux = store.state.games
        this.isLoading = false
      }
      store.commit('setFromSearch', false)
    }
  }
}
</script>

<style>
.bla-spinner{
  margin-top: 5%;
}
.border {
  border: 1px solid #6C028F !important;
}
.jeu-row > td > div > a {
  color: #5F8F00;
}
.jeu-header > table > thead {
  background-color: #6C028F;
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
