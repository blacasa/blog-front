<template>
  <div class="div-jeu">
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="3">
          <img v-if="typeof jeu !== 'undefined' && jeu.image !== null" v-bind:src="couverture" class="header-card-image"/>
        </b-col>
        <b-col cols="9">
          <ul v-if="jeu">
            <li>{{ getTitre }} {{ getAnnee }}</li>
            <li>{{ getNbJoueurs }}</li>
            <li>{{ getDuree }}</li>
            <li>{{ getAuteurs }}</li>
            <li>{{ getIllustrateurs }}</li>
            <li>{{ getEditeurs }}</li>
          </ul>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import constants from '../static/globals'

export default {
  name: 'Jeu',
  props: {
    jeu: {}
  },
  computed: {
    couverture: function () {
      const img = constants.imagesURL + this.jeu.image
      return img
    },
    getAnnee: function () {
      return this.jeu.annee ? '(' + this.jeu.annee + ')' : ''
    },
    getAuteurs: function () {
      const authors = []
      this.jeu.personnalites.auteurs.forEach(perso => {
        authors.push(perso.nom + ' ' + perso.prenom)
      })
      return 'Créé par ' + authors.join(', ')
    },
    getDuree: function () {
      let durationText = ''
      if (this.jeu.dureeMin === this.jeu.dureeMax) {
        durationText += this.jeu.dureeMin + ' minutes de jeu'
      } else {
        durationText += 'De ' + this.jeu.dureeMin + ' à ' + this.jeu.dureeMax + ' minutes'
      }
      if (this.jeu.dureePartie) {
        durationText += ' (environ ' + this.jeu.dureePartie + ' minutes en solo)'
      }

      return durationText
    },
    getEditeurs: function () {
      const editors = []
      this.jeu.editeurs.forEach(editor => {
        editors.push(editor.libelle)
      })
      return 'Edité par ' + editors.join(', ')
    },
    getIllustrateurs: function () {
      const illus = []
      this.jeu.personnalites.illustrateurs.forEach(perso => {
        illus.push(perso.nom + ' ' + perso.prenom)
      })
      return 'Illustré par ' + illus.join(', ')
    },
    getNbJoueurs: function () {
      if (this.jeu.jMin === this.jeu.jMax) {
        let pluriel = ''
        if (this.jeu.jMin > 1) {
          pluriel = 's'
        }
        return 'Pour ' + this.jeu.jMin + ' joueur' + pluriel
      } else {
        return 'Pour ' + this.jeu.jMin + ' à ' + this.jeu.jMax + ' joueurs'
      }
    },
    getTitre: function () {
      return this.jeu.nom
    }
  }
}
</script>
<style scoped>
li {
  list-style: none;
}
.div-jeu {
  text-align: left;
}
.header-card-image {
  display: block;
  max-height: 9em;
  margin-left: auto;
  max-width: 100%;
}
.div-article{
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
