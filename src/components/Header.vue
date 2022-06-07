<template>
    <div>
      <b-navbar type="dark" variant="info">
        <b-navbar-brand to="/"><img src="/images/dragon.webp" alt="13" class="bla-brand-icon">13 jeux solo</b-navbar-brand>
        <div class="menu-div">
          <b-navbar-nav>
            <!--<b-nav-item to="/">Accueil</b-nav-item>-->
            <b-nav-item to="/articles">Articles</b-nav-item>
            <!--<b-nav-item to="/categories">Catégories</b-nav-item>-->
            <b-nav-item to="/jeux">Jeux</b-nav-item>
            <b-nav-item to="/ressources">Ressources</b-nav-item>
            <b-nav-item to="/scorepad">Scorepad</b-nav-item>
            <b-nav-item to="/contact">Contact</b-nav-item>
            <b-nav-item to="/about">A propos</b-nav-item>
            <b-nav-item to="/adm" v-if="adminMode">Adm</b-nav-item>
            <b-nav-item to="/login" v-if="false">Connexion</b-nav-item>
            <b-nav-text v-if="adminMode" v-on:click="logout">Déconnexion</b-nav-text>
          </b-navbar-nav>
          <!--
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input v-model="searchGame" @keyup.enter="search()" size="sm" class="mr-sm-2" placeholder="Recherche"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0 btn-search" v-on:click="clearSearch"><b-icon icon="x-circle" aria-hidden="true"></b-icon></b-button>
              <b-button size="sm" class="my-2 my-sm-0 btn-search" v-on:click="search"><b-icon icon="search" aria-hidden="true"></b-icon></b-button>
            </b-nav-form>
          </b-navbar-nav>
          -->
        </div>
        <div class="burger-div">
          <Slide right :closeOnNavigation="true">
            <b-nav-item to="/articles">Articles</b-nav-item>
            <b-nav-item to="/jeux">Jeux</b-nav-item>
            <b-nav-item to="/ressources">Ressources</b-nav-item>
            <b-nav-item to="/scorepad">Scorepad</b-nav-item>
            <b-nav-item to="/contact">Contact</b-nav-item>
            <b-nav-item to="/about">A propos</b-nav-item>
          </Slide>
        </div>
      </b-navbar>
    </div>
</template>

<script>
import router from '../router/index'
import { Slide } from 'vue-burger-menu'

export default {
  name: 'Header',
  components: {
    Slide
  },
  data () {
    return {
      searchGame: ''
    }
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
    },
    clearSearch: function () {
      console.log('clearSearch')
      this.searchGame = ''
      this.$emit('search', this.searchGame)
    },
    search: function () {
      this.$emit('search', this.searchGame)
      // this.searchGame = ''
    }
  }
}
</script>

<style scoped>
.bg-info {
  background-color: #6C028F !important;
}
.bla-brand-icon {
  height: 40px;
  width: 40px;
}
.btn-search {
  background-color: #6C028F !important;
  border: none;
}
.nav-item.nav-item.nav-item a {
  color: rgb(240, 235, 235);
}
@media screen and (min-width: 600px) {
  .burger-div {
    display: none
  }
}
@media screen and (max-width: 599px) {
  .menu-div {
    display: none
  }
}
</style>
<style>
.bm-burger-button {
  position: absolute !important;
  width: 36px !important;
  height: 30px !important;
  left: auto !important;
  top: 18px !important;
  cursor: pointer !important;
}
.bm-burger-bars {
  background-color: rgb(240, 235, 235) !important;
}
.bm-menu {
  background-color: #6C028F !important;
  color: rgb(240, 235, 235) !important;
}
</style>
