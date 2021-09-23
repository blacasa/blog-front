<template>
  <div class="log">
    <h1>Connecte toi mon gars</h1>
    <b-form >
          <b-form-group
            id="input-group-1"
            label="Login:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="formLogin.login"
              type="text"
              required
              placeholder="Login"
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-2"
            label="Mot de passe:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="formLogin.pwd"
              type="password"
              required
              placeholder="Mot de passe"
            >
            </b-form-input>
          </b-form-group>
          <button v-on:click="validateLogin">Connexion</button>
        </b-form>
  </div>
</template>

<script>
import syncService from '../services/sync.service.js'
import router from '../router/index'

export default {
  data () {
    return {
      formLogin: {
        login: '',
        pwd: ''
      }
    }
  },
  methods: {
    validateLogin: function (event) {
      event.preventDefault()
      const data = {
        login: this.formLogin.login,
        password: this.formLogin.pwd
      }
      syncService.postLogin(data).then(function () {
        // Redirect to Adm page
        this.$emit('update-menu')
        router.push({ name: 'Admin' })
      }.bind(this))
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
</style>
