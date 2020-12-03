import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    games: [],
    fromSearch: false
  },
  mutations: {
    setGames (state, games) {
      state.games = games
    },
    setFromSearch (state, fromSearch) {
      state.fromSearch = fromSearch
    }
  },
  actions: {
    setGames ({ commit }) {
      commit('setGames')
    }
  },
  modules: {
  }
})
