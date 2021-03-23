// import axios from 'axios'
import Api from '@/services/Api';
export default {
  namespaced: true,
  state: {
    createForm: {},
    error:false,
    lists: [],
    color: 'error',
    message: {},
    snackbar:false
  },
  mutations: {
    setCreateForm (state, payload) {
      state.createForm = payload
    },
    setLists (state, payload) {
      state.lists = payload
    },
    setError (state, payload) {
      state.errorr = payload
    }
  },
  actions: {
    async getLists ({ commit }) {
      let items = await Api().get('/api/listreset').then(r => r.data.record)
      commit('setLists', items)
    },
    async doReset ({ commit, state, dispatch}) {
      try{
        await Api().post(`/api/recoverreq`, { ...state.createForm })
        dispatch('getLists')
        commit('setError',false)
        commit('setCreateForm','')     
      }
      catch (e) { 
        commit('setError',true)
      }
    }
  }
}
