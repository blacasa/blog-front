<template>
  <div id="app">
    <haut
      v-bind:adminMode="adminMode"
      v-on:update-menu="showAdmin"
      v-on:search="search"/>
      <h1>13 jeux solo</h1>
    <div site="site-content">
      <router-view v-on:update-menu="showAdmin"/>
    </div>
    <bas />
  </div>
</template>

<script>
import router from './router/index'
import haut from './components/Header'
import bas from './components/Footer'
import syncService from './services/sync.service.js'
import store from './store'

export default {
  components: {
    haut,
    bas
  },
  mounted: function () {
    this.showAdmin()
    // const stats = localStorage.getItem('stats')
    // console.log('stats', stats)
    /*
    if (stats === null) {
      this.getLocalisation()
    }
    // */
    const references = localStorage.getItem('references')
    // console.log('stats', stats)
    if (references === null) {
      this.getReferences()
    }
  },
  data () {
    return {
      adminMode: false,
      jeux: []
    }
  },
  methods: {
    /*
    getLocalisation: function () {
      console.log('getLocalisation')
      syncService.getLocalisation()
        .then(localisation => {
          console.log('fin getLocalisation', localisation)
          const location = {
            country: localisation.country,
            region: localisation.region,
            city: localisation.city
          }
          localStorage.setItem('stats', JSON.stringify(location))
        })
    },
    // */
    getReferences: function () {
      syncService.getReferences().then(references => {
        localStorage.setItem('references', JSON.stringify(references))
      })
    },
    search: function (search) {
      syncService.getJeux(search).then(function (data) {
        store.commit('setGames', data)
        if (this.$route.name !== 'Jeux') {
          store.commit('setFromSearch', true)
          router.push({ name: 'Jeux' })
        }
      }.bind(this))
    },
    showAdmin: function () {
      this.adminMode = typeof localStorage.getItem('user-token') !== 'undefined' &&
      localStorage.getItem('user-token') !== null
      return this.adminMode
    }
  }
}
</script>

<style>
#app {
  font-family: 'Cabin', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 5px 5px auto 5px;
  background-color: rgb(240, 235, 235);
}
html {
  background-color: rgb(240, 235, 235);
}
body {
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: rgb(240, 235, 235) !important;
}
h1 {
  font-family: 'Lobster', cursive;
}
.site-content {
  flex: 1;
}
</style>
