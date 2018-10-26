
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// 'https://raw.githubusercontent.com/ampretia/fabric-application-examples/europa/docs/course.json'
Vue.use(Vuex)
export const store = new Vuex.Store({

  state: {
    course: undefined,
    ready: false,
    selectedPath: undefined,
    selectedTutorials: []
  },
  mutations: {
    setCourse (state, payload) {
      state.course = payload
      state.ready = true
    },
    setPath (state, path) {
      state.selectedPath = path
    },
    setTutorials (state, tutorials) {
      state.selectedTutorials = tutorials
    }
  },
  actions: {
    setTutorials (context, tutorials) {
      context.commit('setTutorials', tutorials)
    },
    setCourse (context) {
      return new Promise((resolve) => {
        axios.get('https://raw.githubusercontent.com/ampretia/fabric-application-examples/europa/docs/course.json')
          .then((response) => {
            console.log(response.data)
            context.commit('setCourse', response.data)
            resolve()
          })
      })
    },
    setPath (context, path) {
      context.commit('setPath', path)
    }
  }
})
