import Api from '@/services/Api';
import { handleError } from '@/services/handleError'
export default {
  namespaced: true,
  state: {
    createForm: {},
    listItem: [],
    Item:{},
    message:'',
    error:false,
    colour: 'error',
    dialog: false,
    actiontype: true,
    chapterForm:{
      chapterName:"",
      chapterSequence:""
    },
    topicForm:{
      id:"",
      topicName:"",
      topicSequence:""
    },
    subTopicForm:{
      chapterid:"",
      topicid:"",
      subTopicName:"",
      subTopicSequence:""
    }
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
    setItem (state, payload) {
      state.Item = payload
    },
    setError (state, payload) {
      state.error = payload
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
    setChapterForm(state){
        state.chapterForm.chapterName= state.createForm.Name
        state.chapterForm.chapterSequence = state.createForm.Sequence
    },
    setTopicForm(state,payload){
      state.topicForm.id = payload
      state.topicForm.topicName = state.createForm.Name 
      state.topicForm.topicSequence = state.createForm.Sequence 
    },
    setSubTopicForm(state,payload){
      state.subTopicForm.topicid=payload.topicId
      state.subTopicForm.chapterid=payload.chapterId
      state.subTopicForm.subTopicName=state.createForm.Name
      state.subTopicForm.subTopicSequence=state.createForm.Sequence 
    }
  },
  actions: {
    async doDialogs ({ commit }, value) {
      commit('setDialog', value)
    },
    async doAction ({ commit}, value) {
      commit('setAction', value)
    },
    async doGetItems({commit}){
      let items = await Api().get('/api/reb/curriculum/showCourses').then(r => r.data.record)
      
      commit('setListItem',items)
    },
   
    async doGetItem({commit},id){      
      let item = await Api().get(`/api/reb/curriculum/showCourse/${id}`).then(r => r.data.record)
      console.log('items'+JSON.stringify(item));
      
      commit('setItem',item)
    },
   async doCreateCourseMetaData({commit,state},courseId){
      try{
        console.log('form '+JSON.stringify(state.createForm));
        let register=await Api().post(`/api/reb/curriculum/addMetadata/${courseId}`, { ...state.createForm })
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
      }catch(e){
        commit('setError',true)
        commit('setColor','error')
        commit('setMessage','Internal Error')
      }
   },
    async doCreateChapter({commit,state},courseId){
      try{
        commit('setChapterForm')
        console.log('form '+state.chapterForm);
        
        let register=await Api().post(`/api/reb/curriculum/addcoursechapters/${courseId}`, { ...state.chapterForm })
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
      }catch(e){
        commit('setError',true)
        commit('setColor','error')
        commit('setMessage','Internal Error')
      }
    },

    async doCreateTopic({commit,state},params){
      commit('setTopicForm',params.chapterId)
      console.log('coourseId'+params.courseId);
      
      console.log('topic form'+ JSON.stringify(state.topicForm));
      
      try{
        // create the topic schema here
        let register=await Api().post(`/api/reb/curriculum/addCourseTopic/${params.courseId}`, { ...state.topicForm })
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
      }catch(e){
        commit('setError',true)
        commit('setColor','error')
        commit('setMessage','Internal Error')
      }
    },

    async doCreateSubTopic({commit,state},params){
      commit('setSubTopicForm',params)
      try{
        // create the topic schema here
        let register=await Api().post(`/api/reb/curriculum/addSubTopic/${params.courseId}`, { ...state.subTopicForm })
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
      }catch(e){
        commit('setError',true)
        commit('setColor','error')
        commit('setMessage','Internal Error')
      }
    },

    async doCreate ({ commit, state}) {
      try{
        console.log('form'+JSON.stringify(state.createForm));
        let register=await Api().post(`/api/reb/curriculum/addCourse`, { ...state.createForm })
        
        
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
    },
    async doDeleteChapter({commit,dispatch},chapterId){
      console.log('delete from store');
      
      try{
        let Item = await Api().delete(`/api/reb/curriculum/deleteCourseTopic/${chapterId}`)
        console.log('deleted');
        
        dispatch('doGetItems')
        commit('setMessage', Item.data.message)
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
