<template>
    <div>
      <b-navbar type="dark" variant="info">
        <b-navbar-brand to="/">13 jeux solo</b-navbar-brand>
        <b-navbar-nav>
          <!--<b-nav-item to="/">Accueil</b-nav-item>-->
          <b-nav-item to="/articles">Articles</b-nav-item>
          <b-nav-item to="/jeux">Jeux</b-nav-item>
          <b-nav-item to="/about">A propos</b-nav-item>
          <b-nav-item to="/adm" v-if="adminMode">Adm</b-nav-item>
          <b-nav-item to="/login" v-if="false">Connexion</b-nav-item>
          <b-nav-text v-if="adminMode" v-on:click="logout">Déconnexion</b-nav-text>
        </b-navbar-nav>
      </b-navbar>
    </div>
</template>

<script>
import router from '../router/index'

export default {
  name: 'Header',
  components: {

  },
  /* props: propriétés qui peuvent être envoyées par le parent */
  props: {
    adminMode: Boolean
  },
  methods: {
    logout: function () {
      console.log('logout')
      localStorage.removeItem('user-token')
      this.$emit('update-menu')
      if (this.$route.name !== 'Home') {
        router.push({ name: 'Home' })
      }
    }
  }
}
</script>

<style scoped>
.bg-info {
  background-color: #6C028F !important;
}
.nav-item.nav-item.nav-item a {
  color: rgb(240, 235, 235);
}
</style>
