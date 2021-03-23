// import axios from 'axios'
import Api from '@/services/Api';
export default {
  namespaced: true,
  state: {
    message:'',
    createForm: {},
    listItem: [],
    errorr:false,
    dialog: false,
    actiontype: true,
    colour: 'error',

  },
  mutations: {
    setCreateForm (state, payload) {
      state.createForm = payload
    },
    setColor (state, payload) {
      state.colour = payload
    },
    setListItem (state, payload) {
      state.listItem = payload
    },
    setError (state, payload) {
      state.errorr = payload
    },
    setMessage (state, payload) {
      state.message = payload
    },
    setDialog (state, payload) {
      state.dialog = payload
    },
    setAction (state, payload) {
      state.actiontype = payload
    },
    setStatus (state,payload) {
      state.createForm.status = payload
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
      let items = await Api().get('/api/reb/officials/').then(r => r.data.record)
      commit('setListItem', items)
    },
    async doCreate ({ commit, state, dispatch}) {
      commit('setStatus', "Verified")
      let register={}
      console.log('form filled'+JSON.stringify(state.createForm));
      try{
        register=await Api().post(`/api/reb/officials/register`, { ...state.createForm })
        commit('setMessage',register.data.message)
        if(register.data.error)
        {
          commit('setError',true)
          commit('setColor','error')
        }
        else
        {
          dispatch('getItems')
          commit('setError',false)
          commit('setCreateForm','')
          commit('setColor','success')
          commit('setDialog',false)
        }

      }
      catch (e) {
        commit('setError',true)
        commit('setColor','error')
        commit('setMessage','Internal Error')
      }
    },
    async doUpdate ({ commit, state, dispatch}) {
      let register={}
      try{
        let id=state.createForm._id
        console.log('id'+id);
        let requestbody={
          fullName :state.createForm.fullName ,
          userId : state.createForm.userId,
          mobileNumber : state.createForm.mobileNumber,
          email : state.createForm.email,
          role : state.createForm.role

        }
        register=await Api().put(`/api/reb/officials/${id}`, { ...requestbody })
        commit('setMessage',register.data.message)
        if(register.data.error)
        {
          commit('setError',true)
          commit('setColor','error')
        }
        else
        {
          dispatch('getItems')
          commit('setError',false)
          commit('setCreateForm','')
          commit('setColor','success')
          commit('setDialog',false)
        }

      }
      catch (e) {
        commit('setError',true)
        commit('setColor','error')
        commit('setMessage','Internal Error')
      }
    },
    async doDelete ({ commit, dispatch }, id) {
      try{
        let deletedItem = await Api().delete(`/api/reb/${id}`)
        commit('setMessage', deletedItem.data.message)
        if(deletedItem.data.error)
        {
          commit('setError',true)
          commit('setColor','error')
        }
        else
        {
          dispatch('getItems')
          commit('setError',false)
          commit('setCreateForm','')
          commit('setColor','success')
          return true
        }

      }
      catch (e) {
        commit('setError',true)
        commit('setColor','error')
        commit('setMessage','Internal Error')
      }
    }
  }
}
