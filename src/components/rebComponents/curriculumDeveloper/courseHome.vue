<template>
    <v-app id='app' >
        <v-container fluid pa-0>
            <v-layout row wrap justify-space-around>
                
                <v-flex s12 md12 pa-1>
                 <v-dialog v-model="showmetadataDialog" persistent max-width="700px">
                  <v-card style='border-top:3px solid blue'>
                        <v-card-title>
                            <span class="headline" center> <strong class="red--text text--lighten-1 "> Add MetaData</strong></span>
                        </v-card-title>
                            <v-card-text>
                                <v-form ref="form">
                                <v-row>
                                    <v-snackbar
                                    v-model="showMessage" :timeout=10000 :color="colour">
                                        {{message}}
                                    <v-btn
                                        color="pink"
                                        text
                                        @click="showMessage = false"
                                    >
                                        Close
                                    </v-btn>
                                    </v-snackbar>
                                    <v-col cols="12" md="6" >
                                        
                                        <v-text-field
                                            label = "Title"
                                            v-model = "metaData.title"
                                            prepend-icon = "book"
                                            type = "text"
                                            :rules="alphabetOnly">
                                        </v-text-field>
                                        <v-text-field
                                            label = "Sequence"
                                            v-model = "metaData.metadataSequence"
                                            prepend-icon = "grade"
                                            type = "text"
                                            :rules="NumericOnly">
                                        </v-text-field>
                                        <v-text-field
                                            label = "Path"
                                            prepend-icon = "grade"
                                            type = "text"
                                            >
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6" >
                                         <v-textarea 
                                            label="Description"
                                            prepend-icon = "description"
                                            v-model = "metaData.description "
                                            :rules="requiredRules"
                                            >
                                 </v-textarea>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1" text @click="showmetadataDialog=false">Cancel</v-btn>
                                            
                                            <v-btn color="blue darken-1" text :disabled="!metaDataisValid" @click="CreateCourseMetaData"> <v-icon small>mdi-plus</v-icon>Save </v-btn>
                                         
                                            
                                        </v-card-actions>

                                    </v-col>
                                </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                </v-dialog> 
                 <!-- <AddChapterDialog   v-if="showChapterAddDialog"/> -->
                 <v-dialog v-model="showEditDialog" persistent max-width="600px">
                  <v-card style='border-top:3px solid blue'>
                        <v-card-title>
                            <span class="headline" center> <strong class="red--text text--lighten-1 "> Edit {{dialogargument.title}}</strong></span>
                        </v-card-title>
                            <v-card-text>
                                <v-form ref="form">
                                <v-row>
                                    <v-snackbar
                                    v-model="showMessage" :timeout=10000 :color="colour">
                                        {{message}}
                                    <v-btn
                                        color="pink"
                                        text
                                        @click="showMessage = false"
                                    >
                                        Close
                                    </v-btn>
                                    </v-snackbar>
                                    <v-col cols="12" md="12" >
                                        
                                        <v-text-field
                                            label = "Name"
                                            v-model = "chapterTopicSubtopicForm.Name"
                                            prepend-icon = "book"
                                            type = "text"
                                            :rules="alphabetOnly">
                                        </v-text-field>
                                        <v-text-field
                                            label = "Sequence"
                                            v-model = "chapterTopicSubtopicForm.Sequence"
                                            prepend-icon = "grade"
                                            type = "text"
                                            :rules="NumericOnly">
                                        </v-text-field>
                                    
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1" text @click="closeChapterEditDialog">Cancel</v-btn>
                                            <div v-if="dialogargument.title=='Chapter'">
                                                <v-btn color="blue darken-1" text :disabled="!addIsFilledAndValid" @click="CreateChapter"> <v-icon small>mdi-plus</v-icon>Save </v-btn>
                                            </div>
                                             <div v-if="dialogargument.title=='Topic'">
                                                <v-btn color="blue darken-1" text :disabled="!addIsFilledAndValid" @click="CreateTopic(dialogargument.param)"> <v-icon small>mdi-plus</v-icon>Save </v-btn>
                                            </div>
                                             <div v-if="dialogargument.title=='SubTopic'">
                                                <v-btn color="blue darken-1" text :disabled="!addIsFilledAndValid" @click="CreateSubTopic(dialogargument.param)"> <v-icon small>mdi-plus</v-icon>Save </v-btn>
                                            </div> 
                                        </v-card-actions>

                                    </v-col>
                                </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                </v-dialog> 
                <v-dialog v-model="showDialog" persistent max-width="600px">
                  <v-card style='border-top:3px solid blue'>
                        <v-card-title>
                            <span class="headline" center> <strong class="red--text text--lighten-1 "> Add {{dialogargument.title}}</strong></span>
                        </v-card-title>
                            <v-card-text>
                                <v-form ref="form">
                                <v-row>
                                    <v-snackbar
                                    v-model="showMessage" :timeout=10000 :color="colour">
                                        {{message}}
                                    <v-btn
                                        color="pink"
                                        text
                                        @click="showMessage = false"
                                    >
                                        Close
                                    </v-btn>
                                    </v-snackbar>
                                    <v-col cols="12" md="12" >
                                        
                                        <v-text-field
                                            label = "Name"
                                            v-model = "chapterTopicSubtopicForm.Name"
                                            prepend-icon = "book"
                                            type = "text"
                                            :rules="alphabetOnly">
                                        </v-text-field>
                                        <v-text-field
                                            label = "Sequence"
                                            v-model = "chapterTopicSubtopicForm.Sequence"
                                            prepend-icon = "grade"
                                            type = "text"
                                            :rules="NumericOnly">
                                        </v-text-field>
                                    
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                            <div v-if="dialogargument.title=='Chapter'">
                                                <v-btn color="blue darken-1" text :disabled="!addIsFilledAndValid" @click="CreateChapter"> <v-icon small>mdi-plus</v-icon>Save </v-btn>
                                            </div>
                                             <div v-if="dialogargument.title=='Topic'">
                                                <v-btn color="blue darken-1" text :disabled="!addIsFilledAndValid" @click="CreateTopic(dialogargument.param)"> <v-icon small>mdi-plus</v-icon>Save </v-btn>
                                            </div>
                                             <div v-if="dialogargument.title=='SubTopic'">
                                                <v-btn color="blue darken-1" text :disabled="!addIsFilledAndValid" @click="CreateSubTopic(dialogargument.param)"> <v-icon small>mdi-plus</v-icon>Save </v-btn>
                                            </div> 
                                        </v-card-actions>

                                    </v-col>
                                </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                </v-dialog> 
                <v-row justify="center">
                <v-dialog v-model="deletedialog" persistent max-width="290">
                  <v-card>
                    <v-card-title class="headline">Delete Item</v-card-title>
                    <v-card-text>Are you sure you want to delete</v-card-text>
                    <v-card-text>{{deleteditem}}</v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-1" text @click="deleteChapter">Yes</v-btn>
                      <v-btn color="green darken-1" text @click="closeChapterDeleteDialog">No</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
               <v-expansion-panels accordion=true flat hover=true multiple=true tile=true>
                   <v-expansion-panel >
                       <v-container>
                           <v-layout row>
                               <v-flex xs1 md1>
                                       <v-expansion-panel-header>
                                            <!-- <v-icon>  add</v-icon> -->
                                        </v-expansion-panel-header>
                                </v-flex>
                                <v-flex xs5 md5 pt-3>
                                       Course MetaData
                                </v-flex>
                                  <v-flex xs6 md5 pt-3>
                                       <v-btn-toggle rounded>   
                                            <v-btn small @click="showaddToicDialog(chapter._id)">
                                               <v-icon>add</v-icon>
                                               Add Course MetaData
                                           </v-btn>
                                       </v-btn-toggle>
                                       
                                  </v-flex>
                           </v-layout>
                       </v-container>
                       <v-divider></v-divider>
                       <v-expansion-panel-content>
                          <v-data-table
                            :headers="coursemetadataheaders"
                            :items="Item.metadata"
                            class="elevation-1"
                            items-key=""
                          >

                          </v-data-table>
                       </v-expansion-panel-content>
                   </v-expansion-panel>
               </v-expansion-panels>
                <v-divider></v-divider>
                <v-expansion-panels accordion=true flat hover=true multiple=true tile=true>
                   <v-expansion-panel >
                       <v-container>
                           <v-layout row>
                               <v-flex xs1 md1>
                                       <v-expansion-panel-header>
                                            <!-- <v-icon>  add</v-icon> -->
                                        </v-expansion-panel-header>
                                </v-flex>
                                <v-flex xs5 md5 pt-3 offset-md="2">
                                       Course Chapters 
                                </v-flex>
                           </v-layout>
                       </v-container>
                       <v-divider></v-divider>
                       <v-expansion-panel-content>
                            <v-expansion-panels accordion=true flat hover=true multiple=true tile=true>
                     <v-expansion-panel  expand  expand-icon="mdi-menu-down" v-for="chapter in Item.chapters" :key="chapter._id">
                          <v-container>
                              <v-layout row>
                                  <v-flex xs1 md1>
                                       <v-expansion-panel-header>
                                            <!-- <v-icon>  add</v-icon> -->
                                        </v-expansion-panel-header>
                                  </v-flex>
                                   <v-flex xs5 md5 pt-3>
                                       Chapter: {{chapter.chapterSequence}} {{chapter.chapterName}}
                                  </v-flex>
                                   <v-flex xs6 md6 pt-3>
                                       <v-btn-toggle rounded>
                                           <v-btn small @click="showChapterEditDialog(chapter)">
                                               <v-icon>edit</v-icon>
                                               edit
                                           </v-btn>
                                           <v-btn small @click="showChapterDeleteDialog(chapter._id)">
                                               <v-icon>delete</v-icon>
                                               delete
                                           </v-btn>
                                           
                                            <v-btn small @click="showaddToicDialog(chapter._id)">
                                               <v-icon>add</v-icon>
                                               Add topic
                                           </v-btn>
                                       </v-btn-toggle>
                                       
                                  </v-flex>
                              </v-layout>
                          </v-container>
                          <v-divider></v-divider>
   
                        <v-expansion-panel-content>
                            <v-container>
                                <v-layout>
                                    <v-flex xs12 md12 class>
                                        Course MetaData: {{chapter.metadata}}
                                        <v-spacer></v-spacer>
                                        <v-btn-toggle>
                                            <v-btn @click="showmetadataDialog=true"><v-icon>add</v-icon>
                                               Add Metadata</v-btn>
                                        </v-btn-toggle>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                            <v-divider></v-divider>
                            <v-expansion-panels accordion=true flat hover=true multiple=true tile=true >
                                <v-expansion-panel flat   v-for="topic in chapter.topic" :key="topic._id">
                            <v-container py-0>
                              <v-layout row >
                                  <v-flex xs1 md1>
                                       <v-expansion-panel-header>
                                            <!-- <v-icon>  add</v-icon> -->
                                        </v-expansion-panel-header>
                                  </v-flex>
                                   <v-flex xs6 md6 pt-3>
                                       Topic:  {{topic.topicSequence}}  {{topic.topicName}}
                                  </v-flex>
                                   <v-flex xs5 md5 pt-3>
                                      <v-btn class="warning" @click="showaddSubToicDialog(chapter._id,topic._id)"><v-icon>add</v-icon>Add SubTopic</v-btn>
                                  </v-flex>
                              </v-layout>
                          </v-container>
                          <v-divider></v-divider>
                          <v-expansion-panel-content>
                              Topic MetaData :{{topic.metadata}}
                          </v-expansion-panel-content>
                          <v-expansion-panel-content pa-0>
                               <v-expansion-panels multiple >
                                <v-expansion-panel flat   v-for="subTopic in topic.subTopic" :key="subTopic._id">
                                     <v-container py-0>
                              <v-layout row>
                                  <v-flex xs1 md1>
                                       <v-expansion-panel-header>
                                            <v-icon>  add</v-icon>
                                        </v-expansion-panel-header>
                                  </v-flex>
                                   <v-flex xs6 md6 pt-3>
                                       SubTopic:  {{subTopic.subTopicSequence}}  {{subTopic.subTopicName}}
                                  </v-flex>
                                   <v-flex xs5 md5 pa-3>
                                       <v-btn><v-icon>add</v-icon></v-btn>
                                  </v-flex>
                              </v-layout>
                          </v-container>
                          
                          <v-expansion-panel-content>
                              SubTopic MetaData{{subTopic.metadata}}
                          </v-expansion-panel-content>
                          
                                </v-expansion-panel>
                            </v-expansion-panels>
                          </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-expansion-panel-content>
                        <v-divider></v-divider>
                     </v-expansion-panel>
                       
                    </v-expansion-panels>
                       </v-expansion-panel-content>
                   </v-expansion-panel>
               </v-expansion-panels>
                <v-divider></v-divider>
               <v-expansion-panels accordion=true flat hover=true multiple=true tile=true>
                   <v-expansion-panel >
                       <v-container>
                           <v-layout row>
                               <v-flex xs1 md1>
                                       <v-expansion-panel-header>
                                            <!-- <v-icon>  add</v-icon> -->
                                        </v-expansion-panel-header>
                                </v-flex>
                                <v-flex xs5 md5 pt-3 offset-md="2">
                                       References
                                </v-flex>
                           </v-layout>
                       </v-container>
                       <v-expansion-panel-content>
                           {{Item}}
                       </v-expansion-panel-content>
                   </v-expansion-panel>
               </v-expansion-panels>
               <v-divider></v-divider>
                
                </v-flex>  
            </v-layout> 
        </v-container>  
    </v-app>
</template>

<script>
//import Api from '@/services/ApiFile';
import { mapMutations, mapActions, mapState} from 'vuex';
// import AddChapterDialog from '@/components/reusable/AddChapterDialog.vue';
export default {
    name:'SingleCourse',
    // components:{
    //     AddChapterDialog
    // },
    data: function(){
        return {
            deletedialog: false,
            showEditDialog:false,
            showmetadataDialog:false,
            editedIndex: -1,
            viewedIndex: -1,
            deleteditem: '',
            search: '',
            showDialog:false,
            showMessage: false,
            dialogargument:{
                title:"Chapter",
                param:""
            },
            chapterTopicSubtopicForm:{
                Name : "",
                Sequence : "",
            },
            metaData:{
                title:"",
                description:"",
                metadataSequence:"",
            },
            //course metadata headers
            coursemetadataheaders:[
                {text:'Sequence',value:"metadataSequence"},
                {text:'Title',value:"title"},
                {text:'Description',value:"description"},
                {text:'Actions',value:""},
                ],
            requiredRules :
            [
              v=> !!v || "Required"
           ],
            alphabetOnly:
            [
              v=> !!v || "Required",
              v=>/^[A-Za-z ]+$/.test(v) ||'Must be Alphabet Only',
              v => (v && v.length >= 4) || 'Must be atLeat four characters'
            ],
            NumericOnly:[
                    v => !!v || "required",
                    v=>/^[0-9]+$/.test(v) ||'Only Number is allowed',
             ],
        }
    },

    async created () {
        this.doGetItem(this.$route.params.courseId)
    },
    methods: {
            ...mapActions({
            doCreateItem: 'regionalCurriculumDeveloperRegister/doCreate',
            doGetItems: 'regionalCurriculumDeveloperRegister/doGetItems',
            doGetItem: 'regionalCurriculumDeveloperRegister/doGetItem',
            doGetChapters:'regionalCurriculumDeveloperRegister/doGetChapters',
            doCreateCourseMetaData:'regionalCurriculumDeveloperRegister/doCreateCourseMetaData',
            doCreateChapter:'regionalCurriculumDeveloperRegister/doCreateChapter',
            doCreateTopic:'regionalCurriculumDeveloperRegister/doCreateTopic',
            doCreateSubTopic:'regionalCurriculumDeveloperRegister/doCreateSubTopic',
            doDeleteChapter:'regionalCurriculumDeveloperRegister/doDeleteChapter',
            doUpdateChapter:'regionalCurriculumDeveloperRegister/doUpdateChapter',
            
            doUpdateItem: 'adminReg/doUpdate',
            doSnackbar: 'adminReg/doSnackbar',
            
        }),

        ...mapMutations({
            setCreateForm: 'regionalCurriculumDeveloperRegister/setCreateForm'
        }),
    async CreateCourseMetaData(){
        await this.doCreateCourseMetaData(this.$route.params.courseId)
        this.showMessage = true
         if(!this.error){
             this.$refs.form.reset()
             this.doGetItem(this.$route.params.courseId)
         }
        console.log('course metadata here' + this.$route.params.courseId);
        
    },
     async CreateChapter(){   
         await this.doCreateChapter(this.$route.params.courseId)
         this.showMessage = true
         if(!this.error){
             this.$refs.form.reset()
             this.doGetItem(this.$route.params.courseId)
         }
     },
     async deleteChapter(){
         console.log('delete' +this.deleteditem);
         
         await this.doDeleteChapter(this.deleteditem)
         this.showMessage = true
     },
     showChapterDeleteDialog(chapterId){
        this.deletedialog = true
        this.deleteditem = chapterId
     },
     showChapterEditDialog(chapter){
         this.dialogargument.param = chapter
         this.chapterTopicSubtopicForm.Name = chapter.chapterName
         this.chapterTopicSubtopicForm.Sequence = chapter.chapterSequence
         console.log(JSON.stringify(this.chapterTopicSubtopicForm));
         
         this.showEditDialog=true
     },
     closeChapterEditDialog(){
         this.showEditDialog=false
     },
     closeChapterDeleteDialog(){
        this.deletedialog = false
     },
     closeMetadataDialog(){
         this.showmetadataDialog=false
     },
      showaddToicDialog(id){
        this.dialogargument.title="Topic",
        this.dialogargument.param=id
        this.showDialog=true
        console.log('chapter_id'+id);
      },
     showaddSubToicDialog(chapterID,topicID){
         let params={
             chapterId:chapterID,
             topicId:topicID
         }
         this.dialogargument.param=params
         console.log(JSON.stringify(this.dialogargument.param));
         
        this.dialogargument.title="SubTopic",
        this.showDialog=true
      },

     async CreateTopic(chapterID){
         let params={
             courseId:this.$route.params.courseId,
             chapterId:chapterID
         }
         
          await this.doCreateTopic(params)
         this.showMessage = true
         if(!this.error){
             this.$refs.form.reset()
             this.doGetItem(this.$route.params.courseId)
         }
        
     },
    async CreateSubTopic(parameters)     {
         let params={
             courseId:this.$route.params.courseId,
             chapterId:parameters.chapterId,
             topicId:parameters.topicId,
         }
         console.log('params'+ JSON.stringify(params));
         
          await this.doCreateSubTopic(params)
         this.showMessage = true
         if(!this.error){
             this.$refs.form.reset()
             this.doGetItem(this.$route.params.courseId)
         }
        
     },

     async CreateItem()
        {
            await this.doCreateItem()
            this.showMessage=true
            if(!this.errorr)
            {
                this.$refs.form.reset()
                this.doGetItem()
            }
        },
    doDialogs()
    {
      this.$store.dispatch("regionalCurriculumDeveloperRegister/doDialogs", true)
      this.$store.dispatch("regionalCurriculumDeveloperRegister/doAction", true)
    },
    close(){
        this.showDialog = false
        this.showtopicAddDialog=false
    },

    // async close () {
    //   setTimeout(() => {
    //     this.$refs.form.reset()
    //      this.courseForm = Object.assign({}, this.defaultForm)
    //     this.editedIndex = -1
    //   }, 300)
    //    this.$store.dispatch("regionalCurriculumDeveloperRegister/doDialogs", false)
    // },
 
    },
        beforeDestroy(){
            console.log('when are you ');
            
        },
    computed: {
    ...mapState({
      Item: state => state.regionalCurriculumDeveloperRegister.Item,
      dialog: state => state.regionalCurriculumDeveloperRegister.dialog,
      snackbar: state => state.regionalCurriculumDeveloperRegister.snackbar,
      message: state => state.regionalCurriculumDeveloperRegister.message,
      colour: state => state.regionalCurriculumDeveloperRegister.colour,
      actiontype: state => state.regionalCurriculumDeveloperRegister.actiontype,
      error: state => state.regionalCurriculumDeveloperRegister.error,
    }),
    addIsFilledAndValid  : function(){
      return (
          (this.chapterTopicSubtopicForm.Name &&  /^[A-Za-z ]+$/.test(this.chapterTopicSubtopicForm.Name)) &&
          (this.chapterTopicSubtopicForm.Sequence  && /^[0-9]+$/.test(this.chapterTopicSubtopicForm.Sequence) )   
      )
    },
   metaDataisValid  : function(){
      return (
          (this.metaData.title &&  /^[A-Za-z ]+$/.test(this.metaData.title)) && this.metaData.description &&
          (this.metaData.metadataSequence  && /^[0-9]+$/.test(this.metaData.metadataSequence) )   
      )
    },
    
    },

    watch :{
      chapterForm: {
      handler (v) {
        this.setCreateForm(v)
      },
      deep: true
    },
    chapterTopicSubtopicForm: {
      handler (v) {
        this.setCreateForm(v)
      },
      deep: true
    },
    metaData:{
        handler(v){
            this.setCreateForm(v)
            console.log('metaData'+JSON.stringify(v));
            
        },
        deep:true
    }
    },

    mounted(){
    }
}
</script>


<style scoped>
    #app{
        height: fit-content;
        background-color:rgb(236,240,245);
    }

    .profile-picture{
        padding:3px;
        border: 3px solid gray;
        border-radius:50%;
    }
    .secondary_list_items{
        text-decoration: none;
        padding: 10px;
    }
    .secondary_navigation{
        background-color: rgb(236,240,245);;
    }
    .secondary_navigation:hover{
        background-color: gray;
    }
     .secondary_navigation:hover .secondary_list_items{
         color:white;
     }
     .color-pad{
         width:100%;
         background-color: springgreen;
         min-height: 130px;
     }
     .custom_button{
         background-color: gainsboro;
         border: solid black 1px;
         color:black;
         width:100%;
     }
     .card-text{
         padding: auto;
         background-color: tan;
     }
     .card-actions{
         background-color: tomato;
     }

</style>
