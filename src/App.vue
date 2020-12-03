<template>
  <div id="app">
    <haut
      v-bind:adminMode="adminMode"
      v-on:update-menu="showAdmin"/>
    <router-view v-on:update-menu="showAdmin"/>
    <bas />
  </div>
</template>

<script>
import router from './router/index'
import haut from './components/Header'
import bas from './components/Footer'

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
      adminMode: false
    }
  },
  methods: {
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
