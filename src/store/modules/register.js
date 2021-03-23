// import axios from 'axios'
import Api from '@/services/Api';
export default {
  namespaced: true,
  state: {
    message:'',
    createForm: {},
    errorr:false,
    colour: 'error',
  },
  mutations: {
    setCreateForm (state, payload) {
      state.createForm = payload
    },
    setColor (state, payload) {
      state.colour = payload
    },
    setError (state, payload) {
      state.errorr = payload
    },
    setMessage (state, payload) {
      state.message = payload
    }
  },
  actions: {
    async doCreate ({ commit, state}) {
      try{
        let register=await Api().post(`/api/admin/signup`, { ...state.createForm })
        commit('setMessage',register.data.message)
        if(register.data.error)
        {
          commit('setError',true)
          commit('setColor','error')
        }
        else
        {

          commit('setError',false)
          commit('setCreateForm','')
          commit('setColor','success')
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
