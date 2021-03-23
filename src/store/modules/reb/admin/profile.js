// import axios from 'axios'
import Api from '@/services/Api';
export default {
  namespaced: true,
  state: {
    message:'',
    createForm: {},
    user: {},
    errorr:false,
    colour: 'error',
  },
  mutations: {
    setCreateForm (state, payload) {
      state.createForm = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
    setError (state, payload) {
      state.errorr = payload
    },
    setMessage (state, payload) {
      state.message = payload
    },
    setColor (state, payload) {
      state.colour = payload
    },
    setResetResponse (state, payload) {
      state.resetResponse = payload
    },
  },
  actions: {
    async doGetUser ({ commit }) {
      let result = await Api().get('/api/reb/officials/me').then(r => r.data.record)
      // console.log("user in Store Action"+JSON.stringify(result[0]));
      commit('setUser', result[0])
    },


    async doUpdatePassword ({ commit, state }) {
      try{
        let result = await Api().put(`/api/reb/officials/changePassword`, { ...state.createForm })
        console.log(JSON.stringify(result));

        commit('setMessage',result.data.message)
        if(result.data.error)
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
      }catch(e){
        commit('setError',true)
        commit('setColor','error')
        commit('setMessage','Internal Error')
      }

    },
  },
  getters:{
    getUser:(state)=>{
      // console.log("user in Store Getter"+JSON.stringify(state.user));
      return state.user
    }
  }
}
