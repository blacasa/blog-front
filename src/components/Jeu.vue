<template>
  <div class="div-jeu">
    <img v-if="image" v-bind:src="couverture" class="card-image"/>
    <div>
      <ul v-if="jeu">
        <li>{{ getTitre }} {{ getAnnee }}</li>
        <li>{{ getNbJoueurs }}</li>
        <li>{{ getDuree }}</li>
        <li>{{ getAuteurs }}</li>
        <li>{{ getIllustrateurs }}</li>
        <li>{{ getEditeurs }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Jeu',
  props: {
    jeu: {},
    image: String
  },
  computed: {
    couverture: function () {
      const img = this.image
      return img
    },
    getAnnee: function () {
      return this.jeu.annee ? '(' + this.jeu.annee + ')' : ''
    },
    getAuteurs: function () {
      const authors = []
      this.jeu.personnalites.auteurs.forEach(perso => {
        authors.push(perso.personnalite.nom + ' ' + perso.personnalite.prenom)
      })
      return 'Créé par ' + authors.join(', ')
    },
    getDuree: function () {
      if (this.jeu.dureeMin === this.jeu.dureeMax) {
        return this.jeu.dureeMin + ' minutes de jeu'
      } else {
        return 'De ' + this.jeu.dureeMin + ' à ' + this.jeu.dureeMax + ' minutes'
      }
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
        illus.push(perso.personnalite.nom + ' ' + perso.personnalite.prenom)
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
.card-image {
  float: left;
  margin-right: 2%;
  height: 9em;
}
.div-article{
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
