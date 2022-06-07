<template>
  <div class="log">
    <h1 class="titre">Formulaire de contact</h1>
    <b-form >
        <b-form-group
            id="input-group-1"
            label="Mail*"
            label-for="input-1"
        >
            <b-form-input
                id="input-1"
                v-model="formContact.expediteur"
                type="text"
                placeholder="Mail"
            >
            </b-form-input>
        </b-form-group>
        <b-form-group
            id="input-group-2"
            label="Nom*"
            label-for="input-2"
        >
            <b-form-input
                id="input-2"
                v-model="formContact.name"
                type="text"
                placeholder="Votre nom"
            >
            </b-form-input>
        </b-form-group>
        <b-form-group
            id="input-group-2"
            label="Message*"
            label-for="input-2"
        >
            <b-form-textarea
                id="input-2"
                v-model="formContact.message"
                placeholder="Votre message..."
                rows="3"
                max-rows="6"
            ></b-form-textarea>
        </b-form-group>
        <button v-on:click="sendMail" :disabled="disabled">Envoyer</button>
        <div>
            Votre adresse mail servira à vous recontacter. Aucune information personnelle n'est conservée.
        </div>
    </b-form>
  </div>
</template>

<script>
import syncService from '../services/sync.service.js'

export default {
  data () {
    return {
      formContact: {
        expediteur: '',
        message: '',
        name: ''
      },
      formError: {
        expediteur: false,
        message: false,
        name: false,
        mailformat: false
      },
      disabled: false
    }
  },
  methods: {
    sendMail: function (event) {
      this.disabled = true
      event.preventDefault()
      if (this.formIsValid()) {
        const data = {
          expediteur: this.formContact.expediteur,
          message: this.formContact.message,
          name: this.formContact.name
        }
        syncService.postContact(data).then(function () {
          this.$bvToast.toast('Votre message a bien été transmis.', {
            title: 'Merci',
            autoHideDelay: 5000,
            solid: true,
            toaster: 'b-toaster-top-center',
            variant: 'success'
          })
          this.formError.expediteur = true
          this.formError.message = true
          this.formError.name = true
          this.formError.mailformat = true
          this.disabled = false
        }.bind(this))
      } else {
        let errorMessage = ''
        const errors = []
        if (this.formError.expediteur) {
          errors.push('Mail')
        }
        if (this.formError.name) {
          errors.push('Nom')
        }
        if (this.formError.message) {
          errors.push('Message')
        }
        if (errors.length > 0) {
          errorMessage = 'Merci de renseigner le(s) champ(s) suivant(s): '
        }
        errorMessage += errors.join(', ') + '. '
        if (this.formError.mailformat) {
          errorMessage += 'Le format du mail est invalide.'
        }
        this.$bvToast.toast(errorMessage, {
          title: 'Erreur',
          autoHideDelay: 5000,
          solid: true,
          toaster: 'b-toaster-top-center',
          variant: 'danger'
        })
        this.disabled = false
      }
    },
    formIsValid: function () {
      let valid = true
      // const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i // eslint-disable-line no-useless-escape
      if (this.formContact.expediteur?.trim() === '') {
        valid = false
        this.formError.expediteur = true
      }
      /* else if (!re.test(this.formContact.expediteur)) {
        valid = false
        this.formError.mailformat = true
      }
      // */
      if (this.formContact.message?.trim() === '') {
        valid = false
        this.formError.message = true
      }
      if (this.formContact.name?.trim() === '') {
        valid = false
        this.formError.name = true
      }

      return valid
    }
  }
}
</script>

<style>
.log {
  text-align: left;
  margin: 5%;
}

.editor-content {
  border: 2px;
}

.titre {
  text-align: center;
}
</style>
