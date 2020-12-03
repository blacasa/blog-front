<template>
  <div id="app">
    <haut
      v-bind:adminMode="adminMode"
      v-on:update-menu="showAdmin"
      v-on:search="search"/>
    <router-view v-on:update-menu="showAdmin"/>
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
  },
  data () {
    return {
      adminMode: false,
      jeux: []
    }
  },
  methods: {
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 5px 5px auto 5px;
  background-color: rgb(240, 235, 235);
}
</style>
