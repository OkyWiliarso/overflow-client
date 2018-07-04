import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [],
    question: '',
    loginStatus: false
  },
  mutations: {
    pushQuestions: (state, payload) => {
      state.questions = payload
    },
    changeStatus: (state, payload) => {
      state.loginStatus = payload
    },
    logout: (state, payload) => {
      state.loginStatus = payload
    },
    question: (state, payload) => {
      state.question = payload
    }
  },
  actions: {
    checkStatus: function (context) {
      let status = localStorage.getItem('status')
      if(status) {context.commit('changeStatus', status)}
    },
    logoutStatus: function (context, payload) {
      context.commit('logout', payload)
    },
    getQuestions: function (context) {
      axios.get('https://hacktiv-overflow-server.okywiliarso.me/questions/list')
      .then(response => {
        context.commit('pushQuestions', response.data.response)
      })
      .catch(err => {
        console.log(err)
      })
    },
    newquestion: function (context, payload) {
      context.commit('question', payload)
    }
  }
})
