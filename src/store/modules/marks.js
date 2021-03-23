// import axios from 'axios'
import Api from '@/services/Api';
import { handleError } from '@/services/handleError'
export default {
  namespaced: true,
  state: {
    createForm: {},
    listItem: [], 
    color: 'error',
    message: {},
    dialog: false,
    actiontype: true
  },
  mutations: {
    setListItem (state, payload) {
      state.listItem = payload
    }, 
    setCreateForm (state, payload) {
      state.createForm = payload
    },
    setColor (state, payload) {
      state.color = payload
    },
    setMessage (state, payload) {
      state.message = payload 
    },
    setDialog (state, payload) {
      state.dialog = payload
    },
    setAction (state, payload) {
      state.actiontype = payload
    }
  },
  actions: {
    async doDialogs ({ commit }, value) { 
      commit('setDialog', value)
    },
    async doAction ({ commit}, value) {
      commit('setAction', value)
    },
    async getItems ({ commit }) {
      let items = await Api().get('/api/marks').then(r => r.data.items) 
      commit('setListItem', items)
    },
    async doCreate ({ commit, state, dispatch }) {
      try{ 
        let createitem =  await Api().post(`/api/marks`, { ...state.createForm })
        dispatch('getItems')
        commit('setMessage', createitem.data.message )
        commit('setDialog',false)
        commit('setColor','success')
      }
      catch (e) {        
        commit('setMessage',handleError(e).message)
        commit('setColor','error')
      }
    },
    async doUpdate ({ commit, state, dispatch }) {
      try{
        let items =  await Api().put(`/api/marks/${state.createForm._id}`, { ...state.createForm })
        dispatch('getItems')
        commit('setMessage', items.data.message)
        commit('setDialog', false)
        commit('setColor', 'success')
      }
      catch (e) {        
        commit('setMessage', handleError(e).message)
        
        commit('setColor', 'error')
      }
    },
    async doDelete ({ commit, dispatch }, id) {
      try{
        let order = await Api().delete(`/api/marks/${id}`)
        dispatch('getItems')
        commit('setMessage', order.data.message)
        commit('setDialog', false)
        commit('setColor', 'error')
        return true
      }
      catch (e) {        
        commit('setMessage',handleError(e).message)
        commit('setColor','error')
      }
    }
  }
}
