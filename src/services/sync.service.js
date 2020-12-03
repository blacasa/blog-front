import axios from 'axios'

const backURL = 'http://127.0.0.1:8000'
const articleURL = backURL + '/article'
const allArticleURL = articleURL + '/all'
const editeurURL = backURL + '/editeur'
const loginURL = backURL + '/auth-tokens'
const jeuURL = backURL + '/jeu'
const personnaliteURL = backURL + '/personnalite'
const roleURL = backURL + '/role'

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // console.log('request interceptor', config)
  if (config.method === 'post') {
    config.headers['X-AUTH-TOKEN'] = localStorage.getItem('user-token')
  }

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export default {
  getAllArticles () {
    return axios
      .get(allArticleURL)
      .then(response => response.data)
  },
  getArticles (limit) {
    return axios
      .get(articleURL, {
        params: {
          limit: limit
        }
      })
      .then(response => response.data)
  },
  getArticle (id) {
    return axios
      .get(articleURL + '/' + id)
      .then(response => response.data)
  },
  getEditeurs () {
    return axios
      .get(editeurURL)
      .then(response => response.data)
  },
  getJeux (game) {
    return axios
      .get(jeuURL, {
        params: {
          game: game
        }
      })
      .then(response => response.data)
  },
  getPersonnalites () {
    return axios
      .get(personnaliteURL)
      .then(response => response.data)
  },
  getRoles () {
    return axios
      .get(roleURL)
      .then(response => response.data)
  },
  postArticle (data) {
    const params = new URLSearchParams()
    params.append('data', JSON.stringify(data))

    return axios.post(
      articleURL,
      params
    ).then(response => {
      return response.data
    }).catch(e => {
      console.log('catch error', e)
      return Promise.reject(e)
    })
  },
  postEditeur (data) {
    const params = new URLSearchParams()
    params.append('data', JSON.stringify(data))

    return axios.post(
      editeurURL,
      params
    ).then(response => {
      return response.data
    }).catch(e => {
      console.log(e)
      return Promise.reject(e)
    })
  },
  postLogin (data) {
    const params = new URLSearchParams()
    params.append('data', JSON.stringify(data))

    return axios.post(
      loginURL,
      params
    ).then(response => {
      const token = response.data.value
      console.log(token)
      localStorage.setItem('user-token', token)
      // setAuthToken(token)
      return token
    }).catch(e => {
      console.log(e)
      return Promise.reject(e)
    })
  },
  postPersonnalite (data) {
    const params = new URLSearchParams()
    params.append('data', JSON.stringify(data))

    return axios.post(
      personnaliteURL,
      params
    ).then(response => {
      return response.data
    }).catch(e => {
      console.log(e)
      return Promise.reject(e)
    })
  },
  postJeu (data) {
    const params = new URLSearchParams()
    params.append('data', JSON.stringify(data))

    return axios.post(
      jeuURL,
      params
    ).then(response => {
      console.log('then serv')
      return response.data
    }).catch(e => {
      console.log('catch error', e)
      return Promise.reject(e)
    })
  }
}
