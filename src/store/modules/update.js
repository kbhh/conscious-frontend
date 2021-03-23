import Api from '@/services/Api';
export default {
  namespaced: true,
  state: {
    createForm: {},
    errorr:false
  },
  mutations: {
    setCreateForm (state, payload) {
      state.createForm = payload
    },
    setError (state, payload) {
      state.errorr = payload
    }
  },
  actions: {
    async doCreate ({ commit, state}) {
      try{
        await Api().post(`/api/user`, { ...state.createForm })
        commit('setError',false)
        commit('setCreateForm','')     
      }
      catch (e) { 
        commit('setError',true)
      }
    },
    async getLists ({ commit}) {
      try{
        let result= await Api().get(`/api/user/${JSON.parse(localStorage.loggedInUser).userId}`)
        commit('setError',false)
        commit('setCreateForm',result.data.record)     
      }
      catch (e) { 
        console.log(" in catchssssss " + e.message)
        commit('setError',true)
      }
    }
  }
}
