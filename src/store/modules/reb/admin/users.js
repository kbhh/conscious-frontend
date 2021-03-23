import Api from '@/services/Api';
export default {
    state:{
      message:'',
      createForm: {},
      registrationForm:{
        fullName:'',
        userId:'',
        email:'',
        mobileNumber:'',
        password:'',
        role:'',
      },
      listItem: [],
      errorr:false,
      dialog: false,
      actiontype: true,
      colour: 'error',
    },
    mutations:{
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
      setFormField (state) {
        state.registrationForm.fullName = state.createForm.firstName +' '+state.createForm.lastName
        state.registrationForm.userId=state.createForm.userID
        state.registrationForm.email=state.createForm.personalEmail
        state.registrationForm.mobileNumber=state.createForm.phoneNumber
        state.registrationForm.password=state.createForm.password
        state.registrationForm.role=state.createForm.rebRole
      },
    },

    actions: {
      async fetchAllREBUsers({commit}){

        let items = await Api().get('/api/reb/users').then(r => r.data.record)
        commit('setListItem',items)
      },
      async  addNewREBUser({ commit, state, dispatch}) {
          let register={}
          try{
            //construct fullname field here
            commit('setFormField')
            console.log('body'+JSON.stringify(state.registrationForm))
            register=await Api().post(`/api/reb/register_user`, { ...state.registrationForm })
            commit('setMessage',register.data.message)
            console.log('message =>'+ JSON.stringify(register.data));
            if(register.data.error)
            {
              commit('setError',true)
              commit('setColor','error')
            }
            else
            {
              dispatch('fetchAllREBUsers')
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
        updateREBUser({ commit }, payload) {
            commit('doUpdateREBUser', payload)
        }
    },

    getters: {
        doGetAllREBUsers: (state) => {
            return state.listItem
        }
    },
}
