import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import Vue from 'vue'

Vue.use(vuex, axios)

export default new vuex.Store({
  state: {
    champs: []

  },
  actions: {
    loadPosts({
      commit
    }) {
      axios.get("http://174.138.9.130:8000/champs")
        .then(data => {
          console.log(data.data)
          let posts = data.data.items
          commit('SET_POSTS', posts)
        })
        .catch(error => {
          console.log(error)
        })
    }

  },
  mutations: {
    SET_POSTS(state, posts) {
      state.champs = posts
    }
  }
})
