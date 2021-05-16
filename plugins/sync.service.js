import axios from 'axios'

const backURL = 'http://localhost:3000/api'
// const backURL = 'https://www.13jeuxsolo.fr/api'
const articleURL = backURL + '/articles'
const allArticleURL = articleURL + '/all'
const editeurURL = backURL + '/editeurs'
const loginURL = backURL + '/auth-tokens'
const jeuURL = backURL + '/jeux'
const personnaliteURL = backURL + '/personnalites'
const referencesURL = backURL + '/references'
const roleURL = backURL + '/roles'
const typeURL = backURL + '/types'

axios.interceptors.request.use(function (config) {
  // console.log('interceptor')
  // Do something before request is sent
  if (config.method === 'post') {
    const token = localStorage.getItem('user-token')
    config.headers.common.Authorization = `Bearer ${token}`
  }
  // console.log('interceptor', config)

  return config
}, function (error) {
  console.log('Request - Erreur gérée par l\'intercepteur', error)
  // Do something with request error
  return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
  // console.log(response)
  return Promise.resolve(response)
}, function (error) {
  console.log('Response - Erreur gérée par l\'intercepteur', error)
  console.log(error.response)
  // Do something with request error
  return Promise.reject(error)
})

export default class ApiService {
  constructor(ctx) {
    this.cache = ctx.cache
    this.axios = ctx.$axios
  }

  getAllArticles () {
    return axios
      .get(allArticleURL)
      .then(response => response.data)
  }

  async getArticles (limit) {
    const { axios } = this

    return axios
      .get(articleURL, {
        params: {
          limit: limit
        }
      })
      .then(response => response.data)
  }

  async getArticle (id) {
    const { axios } = this

    return await axios
      .get(articleURL + '/' + id)
      .then(response => response.data)
  }

  getEditeurs () {
    return axios
      .get(editeurURL)
      .then(response => response.data)
  }

  async getJeux(game) {
    const { axios } = this

    return await axios
      .get(jeuURL, {
        params: {
          game: game
        }
      })
      .then(response => response.data)
  }

  getPersonnalites () {
    return axios
      .get(personnaliteURL)
      .then(response => response.data)
  }

  getReferences () {
    return axios
      .get(referencesURL)
      .then(response => response.data)
  }

  getRoles () {
    return axios
      .get(roleURL)
      .then(response => response.data)
  }

  getAllTypes () {
    return axios
      .get(typeURL)
      .then(response => response.data)
  }

  postArticle (data) {
    const params = new URLSearchParams()
    params.append('data', JSON.stringify(data))

    return axios.post(
      articleURL,
      params,
      { timeout: 5000 }
    ).then(response => {
      return response.data
    }).catch(e => {
      console.log('catch error', e)
      return Promise.reject(e)
    })
  }

  postEditeur (data) {
    const params = new URLSearchParams()
    params.append('data', JSON.stringify(data))

    return axios.post(
      editeurURL,
      params,
      { timeout: 5000 }
    ).then(response => {
      return response.data
    }).catch(e => {
      console.log(e)
      return Promise.reject(e)
    })
  }

  postLogin (data) {
    const params = new URLSearchParams()
    params.append('data', JSON.stringify(data))
    console.log('post', loginURL, params)
    return axios.post(
      loginURL,
      params,
      { timeout: 5000 }
    ).then(response => {
      console.log('postLogin', response)
      const token = response.data.token
      // const token = response.data.value
      console.log(token)
      localStorage.setItem('user-token', token)
      // setAuthToken(token)
      return token
    }).catch(e => {
      console.log('Login error', e)
      return Promise.reject(e)
    })
  }

  postPersonnalite (data) {
    const params = new URLSearchParams()
    params.append('data', JSON.stringify(data))

    return axios.post(
      personnaliteURL,
      params,
      { timeout: 5000 }
    ).then(response => {
      return response.data
    }).catch(e => {
      console.log(e)
      return Promise.reject(e)
    })
  }

  postJeu (data) {
    const params = new URLSearchParams()
    params.append('data', JSON.stringify(data))

    return axios.post(
      jeuURL,
      params,
      { timeout: 5000 }
    ).then(response => {
      return response.data
    }).catch(e => {
      console.log('catch error', e)
      return Promise.reject(e)
    })
  }
}