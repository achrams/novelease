import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

// const baseUrl = 'https://whispering-woodland-44131.herokuapp.com'
const baseUrl = 'http://localhost:3000'
export default new Vuex.Store({
  state: {
    logged: false,
    loading: false,
    posts: [],
    works: [],
    user: {},
    profile: {},
    path: [16, 16, 16],
    error: ''
  },
  mutations: {
    SET_LOGGED (state, payload) {
      state.logged = payload
    },
    SET_LOADING (state, payload) {
      state.loading = payload
    },
    SET_POSTS (state, payload) {
      state.posts = payload
    },
    SET_WORKS (state, payload) {
      state.works = payload
    },
    SET_USER (state, payload) {
      state.user = payload
    },
    SET_PROFILE (state, payload) {
      state.profile = payload
    },
    SET_PATH (state, payload) {
      state.path = payload
    },
    SET_ERROR (state, payload) {
      state.error = payload
    }
  },
  actions: {
    getLoggedData (context, payload) {
      axios({
        method: 'GET',
        url: baseUrl + '/users/logged',
        headers: { access_token: localStorage.access_token }
      })
        .then(({ data }) => {
          console.log('logged data : ' + data)
          context.commit('SET_USER', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    logged (context, payload) {
      context.commit('SET_LOGGED', payload)
    },
    login (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: baseUrl + '/users/login',
          data: {
            username: payload.username,
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            console.log(data)
            context.commit('SET_USER', data)
            context.commit('SET_LOGGED', true)
            resolve(data)
          })
          .catch(err => {
            context.commit('SET_ERROR', err.response.data.errors)
            reject(err.response.data.errors)
          })
      })
    },
    register (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: baseUrl + '/users/register',
          data: {
            username: payload.username,
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            console.log(data)
            context.commit('SET_USER', data)
            context.commit('SET_LOGGED', true)
            resolve(data)
          })
          .catch(err => {
            context.commit('SET_ERROR', err.response.data.errors)
            reject(err.response.data.errors)
          })
      })
    },
    loading (context, payload) {
      context.commit('SET_LOADING', payload)
    },
    addTags (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: baseUrl + '/tags/add',
          headers: {
            access_token: localStorage.access_token
          },
          data: {
            name: payload.name
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err.response.data.errors)
          })
      })
    },
    deleteTag (context, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios({
          method: 'DELETE',
          url: baseUrl + '/tags/delete/' + payload,
          headers: {
            access_token: localStorage.access_token
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err.response.data.errors)
          })
      })
    },
    fetchAllPostsData (context, payload) {
      axios({
        method: 'GET',
        url: baseUrl + '/works/all'
      })
        .then(({ data }) => {
          context.commit('SET_POSTS', data.works)
        })
        .catch(err => context.commit('SET_ERROR', err.response.data.errors))
    },
    // fetchUserData (context, payload) {
    //   axios({
    //     method: 'GET',
    //     url: baseUrl + '/users/' + payload
    //   })
    //     .then(({ data }) => {
    //       console.log(data)
    //       context.commit('SET_USER', data)
    //     })
    //     .catch(err => context.commit('SET_ERROR', err.response.data.errors))
    // },
    fetchProfileData (context, payload) {
      axios({
        method: 'GET',
        url: baseUrl + '/users/' + payload
      })
        .then(({ data }) => {
          console.log(data.result)
          context.commit('SET_PROFILE', data.result)
          context.commit('SET_LOADING', false)
        })
        .catch(err => context.commit('SET_ERROR', err.response.data.errors))
    },
    setPath (context, payload) {
      context.commit('SET_PATH', payload)
    }
  },
  modules: {
  }
})
