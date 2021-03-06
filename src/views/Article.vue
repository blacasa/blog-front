<template>
  <!-- Page affichant le détail d'un Article -->
  <div>
    <div v-if="isLoading" class="d-flex justify-content-center mb-3 bla-spinner">
      <b-spinner label="Chargement..."></b-spinner>
    </div>
    <b-card
      header-tag="header"
      header-class="bla-detail-card-header"
      footer-class="bla-detail-card-footer"
      :title="getTitle()"
      title-tag="h1"
      tag="article"
      class="mb-2 bla-detail-card"
    >
      <template #header>
        <Jeu v-if="article.jeu !== null" :jeu="article.jeu"/>
      </template>
      <b-card-text v-html="content" class="bla-detail-card-content">
      </b-card-text>
      <template #footer>
        <b-container class="bv-example-row">
          <b-row>
            <b-col cols="3">
              <small>{{ publishedDate() }}</small>
            </b-col>
            <b-col cols="3">
              <small>{{ categoriesLabel() }}</small>
              <span v-for="(cat, index) in catLibelles" :key="cat.code">
                <small>
                  <b-link :to="{ name: 'Archives', params: { categorie: cat.code} }" class="cat-link">{{ cat.libelle }}<span v-if="index !== catLibelles.length-1">, </span></b-link>
                </small>
              </span>
            </b-col>
            <b-col cols="3" class="lang-div">
              <b-form-select
                id="article-lang"
                v-if="existingVoices.length > 0"
                v-model="selectedVoice"
                :options="existingVoices"
                class="mb-3"
                v-on:change="langChanged">
              </b-form-select>
            </b-col>
            <b-col cols="3" class="lang-div">
              <b-button size="sm" class="my-2 my-sm-0 btn-read" v-on:click="readArticle">
                <b-icon icon="play" aria-hidden="true"></b-icon>
              </b-button>
              <b-button size="sm" class="my-2 my-sm-0 btn-read" v-on:click="stopReadArticle">
                <b-icon icon="stop" aria-hidden="true"></b-icon>
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </b-card>
  </div>
</template>

<script>
import constants from '../globals'
import syncService from '../services/sync.service.js'
import Jeu from '../components/Jeu'
import moment from 'moment'

export default {
  name: 'Article',
  components: {
    Jeu
  },
  data: function () {
    return {
      id: null,
      article: {},
      isLoading: true,
      voices: [],
      existingVoices: [],
      defaultLang: null,
      selectedLang: null,
      selectedVoice: {},
      catLibelles: null
    }
  },
  mounted: function () {
    this.isLoading = true
    const id = this.$route.params ? this.$route.params.id : -1
    this.setId(id)
    // const paramArticle = this.$route.params && this.$route.params.article ? this.$route.params.article : null
    const paramArticle = null
    if (paramArticle === null) {
      syncService.getArticle(this.id).then(function (data) {
        this.setArticle(data)
        this.isLoading = false
      }.bind(this)).catch((e) => {
        console.log(e)
        this.isLoading = false
        this.showNextPage = false
        this.$bvToast.toast('Le serveur n\'a pu être contacté. Merci de vérifier votre connexion et de ré-essayer ultérieurement.', {
          title: 'Erreur',
          autoHideDelay: 5000,
          solid: true,
          toaster: 'b-toaster-top-center',
          variant: 'danger'
        })
      })
    } else {
      this.setArticle(paramArticle)
      this.isLoading = false
      // Juste pour les stats::
      syncService.getArticle(this.id)
    }
    window.speechSynthesis.onvoiceschanged = () => {
      const voix = window.speechSynthesis.getVoices()
      // (67) [SpeechSynthesisVoice, SpeechSynthesisVoice, ...]
      this.voices = []
      voix.forEach((voice, key) => {
        this.existingVoices.push({
          text: voice.name + ' (' + voice.lang + ')',
          value: key
        })
        this.voices.push(voice)
      })
    }
  },
  computed: {
    content: function () {
      /*
       * [img]
       * [capture] titre.png
       * [/capture]
       * [/img]
       */
      let updatedContent = ''
      if (this.article.contenu) {
        updatedContent = this.article.contenu
          .replaceAll('[img]', '<div class="centered-img">')
          .replaceAll('[capture]', '<img src="' + constants.imagesURL + 'articles/')
          .replaceAll('[/capture]', '" class="capture-img" />')
          .replaceAll('[/img]', '</div>')
      }
      return updatedContent
    }
  },
  methods: {
    setId: function (newId) {
      this.id = newId
    },
    setArticle: function (newArticle) {
      this.article = newArticle
      document.title = newArticle.titre
      let desc = newArticle.titre
      if (newArticle.jeu !== null) {
        desc += ' | Article consacré solo du jeu ' + newArticle.jeu.nom
      }
      document.querySelector('meta[name="description"]').setAttribute('content', desc)
    },
    publishedDate: function () {
      return this.article.datePublication ? 'Publié le ' + moment(this.article.datePublication).format('DD/MM/yyyy') : ''
    },
    getTitle: function () {
      let title = ''
      if (this.article && this.article.titre) {
        title = (this.article.jeu ? this.article.jeu.nom + ' - ' : '') + this.article.titre
      }
      return title
    },
    langChanged: function () {
      this.selectedLang = this.voices[this.selectedVoice]
    },
    readArticle: function () {
      const SpeechSynthesisUtterance =
        window.webkitSpeechSynthesisUtterance ||
        window.mozSpeechSynthesisUtterance ||
        window.msSpeechSynthesisUtterance ||
        window.oSpeechSynthesisUtterance ||
        window.SpeechSynthesisUtterance
      if (this.selectedLang === null) {
        let loadVoices = false
        if (this.voices.length === 0) {
          loadVoices = true
        }
        this.voices = window.speechSynthesis.getVoices()
        // (67) [SpeechSynthesisVoice, SpeechSynthesisVoice, ...]
        this.voices.forEach((voice, key) => {
          if (loadVoices) {
            this.existingVoices.push({
              text: voice.name + ' (' + voice.lang + ')',
              value: key
            })
          }
          this.voices.push(voice)
          if (this.defaultLang === null && voice.lang === 'fr-FR') {
            this.selectedLang = voice
          }
        })
      }
      if (SpeechSynthesisUtterance !== undefined && this.selectedLang !== null) {
        // (67) [SpeechSynthesisVoice, SpeechSynthesisVoice, ...]
        const speak = new SpeechSynthesisUtterance(
          this.article.contenu.replace(/(<([^>]+)>)/gi, '')
            .replaceAll('&amp;', '&')
            .replaceAll('[img]', '<div class="centered-img">')
            .replaceAll('[capture]', '<img src="' + constants.imagesURL + 'articles/')
            .replaceAll('[/capture]', '" class="capture-img" />')
            .replaceAll('[/img]', '</div>')
        )
        speak.voice = this.selectedLang
        window.speechSynthesis.cancel()
        window.speechSynthesis.speak(speak)
      } else {
        console.warn('sorry not supported 😭')
      }
    },
    stopReadArticle: function () {
      window.speechSynthesis.cancel()
    },
    pauseReadArticle: function () {
      // console.log(window.speechSynthesis)
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume()
      } else {
        window.speechSynthesis.pause()
      }
      // console.log(window.speechSynthesis)
    },
    categoriesLabel: function () {
      if (this.catLibelles !== null) {
        return 'Categorie' + (this.catLibelles.length > 1 ? 's' : '') + ': '
      }
      const catCodes = this.article.categories ? this.article.categories.split('|') : null
      if (catCodes !== null) {
        const references = JSON.parse(localStorage.getItem('references'))
        const referenceCatagories = references.categories
        this.catLibelles = catCodes.map(categorieCode => {
          const foundedCat = referenceCatagories.filter(refCategorie => {
            return refCategorie.code === categorieCode
          })
          if (foundedCat) {
            return foundedCat[0]
          }
        })

        return 'Categorie' + (this.catLibelles.length > 1 ? 's' : '') + ': '
      }
      return ''
    }
  }
}
</script>
<style>
.bla-spinner{
  margin-top: 5%;
}
.btn-read {
  background-color: #6C028F !important;
  border: none;
  margin-left: 2px;
}
.card-image {
  float: left;
  margin-right: 2%;
  width: 20%;
}
@media screen and (min-width: 800px) {
  .bla-detail-card-header {
    color: rgb(240, 235, 235);
    background-color: rgba(0, 0, 0, 0);
    background-image: url('/images/flag_01_03.webp');
    background-size: 100% 100%;
    border-bottom: none;
  }
  .bla-detail-card-footer {
    background-color: rgba(0, 0, 0, 0);
    background-image: url('/images/flag_01_02.webp');
    background-size: 100% 100%;
    border-top: none;
    color: #A406DB;
  }
  .capture-img {
    width: 600px;
  }
}
@media screen and (max-width: 799px) {
  .bla-detail-card-header {
    background-color: #A406DB;
    color: rgb(240, 235, 235);
    border-bottom: none;
  }
  .bla-detail-card-footer {
    background-color: #5F8F00;
    border-top: none;
    color: rgb(240, 235, 235);
  }
  .capture-img {
    width: 300px;
  }
  .cat-link {
    color: #2a3f01;
    padding-top: 0;
  }
  .lang-div {
    display: none
  }
}
.bla-detail-card-header > div {
  margin-top: 1.3em;
}
.bla-detail-card {
  background-color: rgb(240, 235, 235);
  /*border: #A406DB solid ;*/
  border: none;
  margin: 5% auto;
  width: 90%;
}
.bla-detail-card-content {
  margin: 5%;
  text-align: left;
}
.centered-img {
  font-size: 0.8em;
  text-align: center;
}
</style>
