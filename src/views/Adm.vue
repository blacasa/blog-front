<template>
  <div class="admin-editor">
    <b-row>
      <b-button-group class="row-btn">
        <b-button v-b-toggle="'collapse-editeur'" variant="info">Editeur</b-button>
        <b-button v-b-toggle="'collapse-personnalite'">Personnalité</b-button>
        <b-button v-b-toggle="'collapse-jeu'" variant="info">Jeu</b-button>
        <b-button v-b-toggle="'collapse-article'">Article</b-button>
      </b-button-group>
    </b-row>

    <!-- Elements to collapse -->
    <b-collapse id="collapse-editeur" accordion="my-accordion" class="mt-2">
      <b-card title="Ajout d'un éditeur">
        <b-form >
          <b-form-group
            id="input-group-1"
            label="Code de l'éditeur:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="formEditeur.code"
              type="text"
              required
              placeholder="Code"
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-2"
            label="Nom de l'éditeur:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="formEditeur.libelle"
              type="text"
              required
              placeholder="Nom"
            >
            </b-form-input>
          </b-form-group>
          <button v-on:click="validateEditeur">Ajouter l'éditeur</button>
        </b-form>
      </b-card>
    </b-collapse>
    <b-collapse id="collapse-personnalite" accordion="my-accordion" class="mt-2">
      <b-card title="Ajout d'une personnalité">
        <b-form >
          <b-form-group
            id="perso-input-group-1"
            label="Nom de la personne:"
            label-for="perso-input-1"
          >
            <b-form-input
              id="perso-input-1"
              v-model="formPerso.nom"
              type="text"
              required
              placeholder="Nom"
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
            id="perso-input-group-2"
            label="Prenom de la personne:"
            label-for="perso-input-2"
          >
            <b-form-input
              id="perso-input-2"
              v-model="formPerso.prenom"
              type="text"
              required
              placeholder="Prenom"
            >
            </b-form-input>
          </b-form-group>
          <button v-on:click="validatePersonnalite">Ajouter la personne</button>
        </b-form>
      </b-card>
    </b-collapse>
    <b-collapse id="collapse-jeu" accordion="my-accordion" class="mt-2">
      <b-card title="Ajout d'un Jeu">
        <b-form >
          <b-form-group
            id="jeu-input-group-jeu"
            label="Jeu:"
            label-for="jeu-input-jeu"
            label-cols="4"
          >
            <b-form-select
              id="jeu-input-jeu"
              v-model="formJeu.jeu"
              :options="jeux"
              class="mb-3"
              value-field="id"
              text-field="nom"
              v-on:change="jeuSelected"></b-form-select>
          </b-form-group>
        <div class="image-div">Couverture
          <input @change="handleImage" class="custom-input" type="file" accept="image/*"/>
          <img style="" :src="formJeu.image" alt="">
        </div>
          <b-form-group
            id="jeu-input-group-editeur"
            label="Editeur:"
            label-for="jeu-input-editeur"
            label-cols="4"
          >
            <b-form-select
              id="jeu-input-editeur"
              v-model="formJeu.editeur"
              :options="editeurs"
              class="mb-3"
              value-field="id"
              text-field="libelle"
              multiple></b-form-select>
          </b-form-group>
          <b-form-group
            id="jeu-input-group-auteur"
            label="Auteur(s):"
            label-for="jeu-input-auteur"
            label-cols="4"
          >
            <b-form-select
              id="jeu-input-auteur"
              v-model="formJeu.auteurs"
              :options="personnalites"
              class="mb-3"
              value-field="id"
              text-field="fullName"
              multiple></b-form-select>
          </b-form-group>
          <b-form-group
            id="jeu-input-group-illus"
            label="Illustrateur(s):"
            label-for="jeu-input-illus"
            label-cols="4"
          >
            <b-form-select
              id="jeu-input-illus"
              v-model="formJeu.illustrateurs"
              :options="personnalites"
              class="mb-3"
              value-field="id"
              text-field="fullName"
              multiple></b-form-select>
          </b-form-group>
          <b-form-group
            label-cols-lg="3"
            label="Jeu"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              id="jeu-input-group-nom"
              label-cols-sm="3"
              label="Nom:"
              label-for="jeu-input-nom"
              label-align-sm="right"
            >
              <b-form-input
                id="jeu-input-nom"
                v-model="formJeu.nom"
                type="text"
                required
                placeholder="Nom"></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Année:"
              label-align-sm="right"
              label-for="jeu-annee"
            >
              <b-form-input
                id="jeu-annee"
                v-model="formJeu.annee"
                type="number"
                required></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Joueur mini.:"
              label-align-sm="right"
              label-for="jeu-j-min"
            >
              <b-form-input
                id="jeu-j-min"
                v-model="formJeu.jMin"
                type="number"
                required></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Joueur maxi.:"
              label-align-sm="right"
              label-for="jeu-j-max"
            >
              <b-form-input
                id="jeu-j-max"
                v-model="formJeu.jMax"
                type="number"
                required></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Durée mini.:"
              label-align-sm="right"
              label-for="jeu-d-min"
            >
              <b-form-input
                id="jeu-d-min"
                v-model="formJeu.dureeMin"
                type="number"
                required></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Durée maxi.:"
              label-align-sm="right"
              label-for="jeu-d-max"
            >
              <b-form-input
                id="jeu-d-max"
                v-model="formJeu.dureeMax"
                type="number"
                required></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Durée jouée:"
              label-align-sm="right"
              label-for="jeu-d-joue"
            >
              <b-form-input
                id="jeu-d-joue"
                v-model="formJeu.dureePartie"
                type="number"
                required></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Envie:"
              label-align-sm="right"
              label-for="jeu-envie"
            >
              <b-form-input
                id="jeu-envie"
                v-model="formJeu.envie"
                type="text"></b-form-input>
            </b-form-group>
          </b-form-group>
          <button v-on:click="validateJeu">Ajouter le jeu</button>
        </b-form>
      </b-card>
    </b-collapse>
    <b-collapse id="collapse-article" accordion="my-accordion" class="mt-2">
      <!-- Gestion de l'article -->
      <b-card>
        <b-form-group
          id="article-input-group-jeu"
          label="Jeu:"
          label-for="article-input-jeu"
          label-cols="4"
        >
          <b-form-select
            id="article-input-jeu"
            v-model="formArticle.jeu"
            :options="jeux"
            class="mb-3"
            value-field="id"
            text-field="nom"
            v-on:change="jeuSelected"></b-form-select>
        </b-form-group>
        <b-form-group
          id="article-input-group-article"
          label="Article:"
          label-for="article-input-article"
          label-cols="4"
          v-if="existingArticles.length > 0"
        >
          <b-form-select
            id="article-input-article"
            v-model="selectedArticleId"
            :options="existingArticles"
            class="mb-3"
            value-field="id"
            text-field="fullTitre"
            v-on:change="articleSelected"></b-form-select>
        </b-form-group>
        <div>
          <b-form-input v-model="formArticle.titre" placeholder="Titre"></b-form-input>
        </div>
        <div class="image-div">
          <input @change="handleImage" class="custom-input" type="file" accept="image/*"/>
          <img style="" :src="formArticle.image" alt="">
        </div>
        <!-- editeur -->
        <editor
          ref="toastuiEditor"
          initialEditType="wysiwyg"
          :initialValue="editorContent"
          :options="editorOptions"/>
        <div class="positif-div">
          <b-form-textarea
            id="textarea-positif"
            v-model="formArticle.positif"
            placeholder="Points positifs (séparateur: ;)"
            rows="3"
          ></b-form-textarea>
        </div>
        <div class="negatif-div">
          <b-form-textarea
            id="textarea-negatif"
            v-model="formArticle.negatif"
            placeholder="Points negatifs (séparateur: ;)"
            rows="3"
          ></b-form-textarea>
        </div>
        <b-form-group
          id="article-input-group-datepicker"
          label="Date de publication:"
          label-for="publication-datepicker"
          label-cols="4"
        >
          <b-form-datepicker id="publication-datepicker" v-model="formArticle.datePublication" class="mb-2"></b-form-datepicker>
        </b-form-group>
        <button v-on:click="validateArticle">Ajouter l'article</button>
        <br>
        <!--
        <hr>
        {{ html }}
        <hr>
        -->
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
import syncService from '../services/sync.service.js'
import moment from 'moment'
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/vue-editor'

import 'tui-color-picker/dist/tui-color-picker.css'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'

export default {
  components: {
    editor: Editor
  },
  data () {
    return {
      html: 'Update content to see changes',
      editorContent: 'Bla bla bla',
      editorOptions: {
        usageStatistics: false,
        plugins: [colorSyntax],
        toolbarItems: [
          'heading',
          'bold',
          'italic',
          'strike',
          'divider',
          'hr',
          'quote',
          'divider',
          'ul',
          'ol',
          'task',
          'indent',
          'outdent',
          'divider',
          'table',
          'image',
          'link',
          'divider',
          'code',
          'codeblock'
        ]
      },
      articles: [],
      existingArticles: [],
      selectedArticleId: {},
      selectedArticle: {},
      editeurs: [],
      personnalites: [],
      roles: [],
      jeux: [],
      formArticle: {
        titre: '',
        image: null,
        positif: '',
        negatif: '',
        datePublication: null,
        jeu: null
      },
      formEditeur: {
        libelle: '',
        code: ''
      },
      formPerso: {
        nom: '',
        prenom: ''
      },
      formJeu: {
        nom: '',
        annee: 0,
        jMin: 1,
        jMax: 1,
        dureeMin: 0,
        dureeMax: 0,
        dureePartie: 0,
        envie: '',
        editeur: [],
        auteurs: [],
        illustrateurs: [],
        jeu: {}
      }
    }
  },
  mounted: function () {
    this.fetchData()
  },
  methods: {
    handleImage: function (e) {
      const selectedImage = e.target.files[0] // get first file
      this.createBase64Image(selectedImage)
    },
    createBase64Image: function (fileObject) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.formArticle.image = e.target.result
        this.formJeu.image = e.target.result
        // console.log(this.formArticle.image)
        // this.uploadImage();
      }
      reader.readAsDataURL(fileObject)
    },
    articleSelected: function () {
      console.log('ID article sélectionné: ', this.selectedArticleId)
      const idArticleSelected = this.selectedArticleId
      this.selectedArticle = {}
      this.existingArticles.map(function (article) {
        console.log(article.id, idArticleSelected)
        if (article.id === idArticleSelected) {
          this.selectedArticle = article
        }
      }.bind(this))
      console.log('article sélectionné: ', this.selectedArticle.id, this.selectedArticle.titre)
      this.formArticle = {
        id: this.selectedArticle.id,
        titre: this.selectedArticle.titre,
        image: this.selectedArticle.image,
        positif: this.selectedArticle.positif,
        negatif: this.selectedArticle.negatif,
        datePublication: this.selectedArticle.datePublication,
        jeu: this.selectedArticle.jeu.id
      }
      // this.editorContent = this.selectedArticle.contenu
      this.$refs.toastuiEditor.invoke('setHtml', this.selectedArticle.contenu)
      console.log(this.selectedArticle.contenu)
    },
    fetchData: function () {
      console.log('fetchData: editeur, personnalites, roles, articles')
      syncService.getEditeurs().then(function (response) {
        this.editeurs = response
        this.formatSortEditeurs()
      }.bind(this))
      syncService.getPersonnalites().then(function (response) {
        this.personnalites = response
        this.formatSortPersonnalites()
      }.bind(this))
      syncService.getRoles().then(function (response) {
        this.roles = response
        this.formatSortRoles()
      }.bind(this))
      syncService.getJeux().then(function (response) {
        this.jeux = response
        this.formatSortJeux()
      }.bind(this))
      // Récupérer les articles existants (même ceux non publiés => pour MAJ)
      syncService.getAllArticles().then(function (response) {
        this.articles = response
        this.formatSortArticles()
      }.bind(this))
    },
    formatSortArticles: function () {
      this.articles.map(function (article) {
        const date = moment(article.datePublication).format('DD/MM/yyyy')
        article.fullTitre = article.titre + ' (' + date + ')'
      })
      this.articles.sort(function (first, second) {
        if (first.jeu.nom > second.jeu.nom) return 1
        else if (first.jeu.nom < second.jeu.nom) return -1
        else return 0
      })
      // console.log(this.editeurs)
    },
    formatSortEditeurs: function () {
      this.editeurs.sort(function (first, second) {
        if (first.libelle > second.libelle) return 1
        else if (first.libelle < second.libelle) return -1
        else return 0
      })
      // console.log(this.editeurs)
    },
    formatSortJeux: function () {
      this.jeux.sort(function (first, second) {
        if (first.nom > second.nom) return 1
        else if (first.nom < second.nom) return -1
        else return 0
      })
      // console.log(this.editeurs)
    },
    formatSortPersonnalites: function () {
      this.personnalites.map(function (pers) {
        pers.fullName = pers.nom + ' ' + pers.prenom
      })
      this.personnalites.sort(function (first, second) {
        if (first.fullName > second.fullName) return 1
        else if (first.fullName < second.fullName) return -1
        else return 0
      })
      // console.log(this.personnalites)
    },
    formatSortRoles: function () {
      this.roles.sort(function (first, second) {
        if (first.libelle > second.libelle) return 1
        else if (first.libelle < second.libelle) return -1
        else return 0
      })
      // console.log(this.roles)
    },
    jeuSelected: function () {
      console.log('Jeu sélectionné: ', this.formArticle.jeu)
      console.log('Jeu sélectionné: ', this.formJeu.jeu)
      const idJeuSelected = this.formArticle.jeu || this.formJeu.jeu
      this.existingArticles = []
      if (this.articles) {
        this.articles.map(function (article) {
          if (article.jeu.id === idJeuSelected) {
            this.existingArticles.push(article)
          }
        }.bind(this))
      }

      let selectedJeu = {}
      this.jeux.map(function (game) {
        console.log(game.id, idJeuSelected)
        if (game.id === idJeuSelected) {
          selectedJeu = game
        }
      })
      // Pour le formulaire Jeu:
      this.formJeu.id = selectedJeu.id
      this.formJeu.image = selectedJeu.image
      this.formJeu.nom = selectedJeu.nom
      this.formJeu.annee = selectedJeu.annee
      this.formJeu.jMin = selectedJeu.jMin
      this.formJeu.jMax = selectedJeu.jMax
      this.formJeu.dureeMin = selectedJeu.dureeMin
      this.formJeu.dureeMax = selectedJeu.dureeMax
      this.formJeu.dureePartie = selectedJeu.dureePartie
      this.formJeu.envie = selectedJeu.envie
      const selectedEditeur = []
      if (selectedJeu.editeurs) {
        selectedJeu.editeurs.map(ed => {
          if (ed.id) {
            selectedEditeur.push(ed.id)
          }
        })
      }
      this.formJeu.editeur = selectedEditeur
      const selectedAuteurs = []
      if (selectedJeu.personnalites && selectedJeu.personnalites.auteurs) {
        selectedJeu.personnalites.auteurs.map(ed => {
          console.log('aut:', ed.personnalite)
          if (ed.personnalite.id) {
            selectedAuteurs.push(ed.personnalite.id)
          }
        })
      }
      this.formJeu.auteurs = selectedAuteurs
      const selectedIllust = []
      if (selectedJeu.personnalites && selectedJeu.personnalites.illustrateurs) {
        selectedJeu.personnalites.illustrateurs.map(ed => {
          if (ed.personnalite.id) {
            selectedIllust.push(ed.personnalite.id)
          }
        })
      }
      this.formJeu.illustrateurs = selectedIllust

      console.log(this.formJeu)
    },
    validateArticle: function () {
      const html = this.$refs.toastuiEditor.invoke('getHtml')
      console.log('html', html)
      html.replace('<pre>', '').replace('</pre>', '')
      //*
      const data = {
        id: this.formArticle.id,
        titre: this.formArticle.titre,
        idJeu: this.formArticle.jeu,
        positif: this.formArticle.positif,
        negatif: this.formArticle.negatif,
        datePublication: this.formArticle.datePublication,
        image: this.formArticle.image,
        contenu: html
      }

      syncService.postArticle(data).then(function (response) {
        this.articles = response
        this.formatSortArticles()
        // re-init du formulaire
        this.formArticle = {
          titre: '',
          image: null,
          positif: '',
          negatif: '',
          datePublication: null,
          jeu: null
        }
        this.selectedArticleId = null
      }.bind(this)).catch(function (e) {
        console.log('catch', e)
      })
      // */
    },
    validateEditeur: function () {
      const data = {
        code: this.formEditeur.code,
        libelle: this.formEditeur.libelle
      }
      syncService.postEditeur(data).then(function (response) {
        this.editeurs = response
        // re-init du formulaire,
        this.formEditeur = {
          libelle: '',
          code: ''
        }
      }.bind(this)).catch(function (e) {
        console.log('catch', e)
      })
    },
    validatePersonnalite: function () {
      const data = {
        nom: this.formPerso.nom,
        prenom: this.formPerso.prenom
      }
      syncService.postPersonnalite(data).then(function (response) {
        this.personnalites = response
        this.formatSortPersonnalites()
        // re-init du formulaire
        this.formPerso = {
          nom: '',
          prenom: ''
        }
      }.bind(this)).catch(function (e) {
        console.log('catch', e)
      })
    },
    validateJeu: function () {
      const data = {
        id: this.formJeu.id,
        image: this.formJeu.image,
        nom: this.formJeu.nom,
        annee: this.formJeu.annee,
        jMin: this.formJeu.jMin,
        jMax: this.formJeu.jMax,
        dureeMin: this.formJeu.dureeMin,
        dureeMax: this.formJeu.dureeMax,
        dureePartie: this.formJeu.dureePartie,
        envie: this.formJeu.envie,
        editeur: this.formJeu.editeur.join(','),
        auteurs: this.formJeu.auteurs.join(','),
        illustrateurs: this.formJeu.illustrateurs.join(',')
      }
      console.log(data)
      syncService.postJeu(data).then(function (response) {
        this.jeux = response
        // re-init du formulaire
        this.formJeu = {
          id: null,
          image: null,
          nom: '',
          annee: 0,
          jMin: 1,
          jMax: 1,
          dureeMin: 0,
          dureeMax: 0,
          dureePartie: 0,
          envie: '',
          editeur: [],
          auteurs: [],
          illustrateurs: []
        }
      }.bind(this)).catch(function (e) {
        console.log('catch', e)
      })
    }
  }
}
</script>

<style>
.admin-editor {
  text-align: left;
  margin: 5%;
}

.editor-content {
  border: 2px;
}

.editor-image-content {
  border: 2px;
  height: 50px;
}

.image-div {
  margin-bottom: 5px;
  margin-top: 5px;
}

.row-btn {
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
}

#textarea-negatif {
  margin-bottom: 5px;
  margin-top: 5px;
}

#textarea-positif {
  margin-bottom: 5px;
  margin-top: 5px;
}
</style>
