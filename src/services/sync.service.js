import axios from 'axios'

// const backURL = 'http://127.0.0.1:8000'
const backURL = 'http://localhost:3000/api'
// const locationURL = 'https://ipinfo.io/json'
// const locationURL = 'https://ipapi.com/json'
// const locationURL = 'http://ip-api.com/json'
const articleURL = backURL + '/articles'
const allArticleURL = articleURL + '/all'
const contactURL = backURL + '/contact'
const editeurURL = backURL + '/editeurs'
const loginURL = backURL + '/auth-tokens'
const jeuURL = backURL + '/jeux'
const personnaliteURL = backURL + '/personnalites'
const referencesURL = backURL + '/references'
const roleURL = backURL + '/roles'
const typeURL = backURL + '/types'
const visitURL = backURL + '/visit'

axios.interceptors.request.use(function (config) {
  console.log('interceptor')
  // Do something before request is sent
  if (config.method === 'post') {
    const token = localStorage.getItem('user-token')
    config.headers.common.Authorization = `Bearer ${token}`
  }
  console.log('interceptor', config)
  const stats = localStorage.getItem('stats')
  console.log('interceptor', stats)
  /*
  if (stats && config.url !== locationURL) {
    config.headers.common.stats = stats
  }
  // */

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

export default {
  addVisit (type) {
    return axios
      .get(visitURL, {
        params: {
          type: type
        }
      })
  },
  /*
  getLocalisation () {
    return axios
      .get(locationURL)
      .then(response => response.data)
  },
  // */
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
  getReferences () {
    return axios
      .get(referencesURL)
      .then(response => response.data)
  },
  getRoles () {
    return axios
      .get(roleURL)
      .then(response => response.data)
  },
  getAllTypes () {
    return axios
      .get(typeURL)
      .then(response => response.data)
  },
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
  },
  postContact (data) {
    const params = new URLSearchParams()
    params.append('data', JSON.stringify(data))

    return axios.post(
      contactURL,
      params,
      { timeout: 5000 }
    ).then(response => {
      return response.data
    }).catch(e => {
      console.log(e)
      return Promise.reject(e)
    })
  },
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
  },
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
  },
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
  },
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
