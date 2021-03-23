<template>
           <v-dialog v-model="showDialogForm" persistent max-width="600px">
           <v-card style='border-top:3px solid blue'>
                  <v-card-title>
                    <span class="headline" center> <strong class="red--text text--lighten-1 "> Add Chapter</strong></span>
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
                                      label = "Chapter Name"
                                      v-model = "chapterForm.chapterName"
                                      prepend-icon = "book"
                                      type = "text"
                                      :rules="alphabetOnly">
                                  </v-text-field>
                                  <v-text-field
                                      label = "Chapter Sequence"
                                      v-model = "chapterForm.chapterSequence"
                                      prepend-icon = "grade"
                                      type = "text"
                                      :rules="NumericOnly">
                                  </v-text-field>
                            
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                      <v-btn color="blue darken-1" text :disabled="!addIsFilledAndValid" @click="CreateChapter"> <v-icon small>mdi-plus</v-icon>Save </v-btn>
                                  </v-card-actions>

                            </v-col>
                        </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
        </v-dialog> 
</template>

<script>
import { mapMutations, mapActions,mapState} from 'vuex';
export default {
    name:"AddChapter",
    data:function(){
       return{
           showDialogForm: true,
           showMessage: false,
            chapterForm : {
                chapterName : "",
                chapterSequence : "",
            },
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
    methods:{
        ...mapActions({
        doGetChapters:'regionalCurriculumDeveloperRegister/doGetChapters',
        doCreateChapter:'regionalCurriculumDeveloperRegister/doCreateChapter',
        }),
         ...mapMutations({
            setCreateForm: 'regionalCurriculumDeveloperRegister/setCreateForm'
        }),

        close(){
          this.showDialogForm = false
        },

         async CreateChapter()
        {
   
         await this.doCreateChapter(this.$route.params.courseId)
         this.showMessage = true
         if(!this.error){
             this.$refs.form.reset()
         }
         }
    },
    computed:{
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
          (this.chapterForm.chapterName &&  /^[A-Za-z ]+$/.test(this.chapterForm.chapterName)) &&
          (this.chapterForm.chapterSequence  && /^[0-9]+$/.test(this.chapterForm.chapterSequence) )   
      )
    },
    },
    watch:{
         chapterForm: {
      handler (v) {
        this.setCreateForm(v)
        console.log(JSON.stringify(v));
        
      },
      deep: true
    },
    }

}
</script>
