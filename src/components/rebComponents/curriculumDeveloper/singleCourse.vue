<template>
    <v-app id='app' >
        <v-container fluid pa-0>
            <v-layout row wrap justify-space-around>
                <v-flex xs12 md12>
                    <v-toolbar flat > 
                       <v-toolbar-title> 
                           <v-icon>label</v-icon> Course {{Item.courseName}}
                           <v-icon>label_important</v-icon> Grade {{Item.grade}}
                           <v-icon>label_important</v-icon> Field {{Item.field}}
                           </v-toolbar-title>
                           <v-spacer></v-spacer>
                           <v-btn-toggle rounded>
                           <v-btn  @click="goBack"><v-icon>arrow_back_ios</v-icon> Back to Course List</v-btn>
                           </v-btn-toggle>
                    </v-toolbar>
                </v-flex>
                <v-divider></v-divider>
                <v-flex xs12 md2>
                       <v-navigation-drawer color="rgb(236,240,245)">
                           <v-list>
                               <v-list-item v-for="link in links" :key="link.index" router :to="{name:link.route}">
                                   <v-list-item-title>
                                       {{link.text}}
                                   </v-list-item-title>
                               </v-list-item>
                           </v-list>
                       </v-navigation-drawer>
                    </v-flex>
                <v-flex s12 md8 px-3 py-1>
                    <router-view></router-view>
                </v-flex>
                <v-flex xs12 md2 >
                    <v-card flat class="px-3" style="background-color:rgb(236,240,245);" >
                        <v-container fluid>
                            <v-layout column wrap>
                                <v-flex>
                                    <p> Status : {{Item.status}}</p>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>
                
            </v-layout>
             
        </v-container>  
    </v-app>
</template>

<script>
//import Api from '@/services/ApiFile';
import { mapMutations, mapActions, mapState} from 'vuex';
export default {
    name:'SingleCourse',
    data: function(){
        return {
            deletedialog: false,
            editedIndex: -1,
            viewedIndex: -1,
            deleteditem: '',
            search: '',
            showDialog:false,
            showMessage: false,
            links:[
                {text:'Home',index:0,route:'courseHome'},
 
            ],
           
                courseForm : {
                    courseName : "",
                    grade : "",
                    field : "",
                    description : "",
                },
                defaultForm : {
                            courseName : "",
                            grade : "",
                            field : "",
                            description : "",
                        },
              field_list:[
                        'both',
                        'natural',
                        'social'
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
            doUpdateItem: 'adminReg/doUpdate',
            doSnackbar: 'adminReg/doSnackbar',
        }),

        ...mapMutations({
            setCreateForm: 'regionalCurriculumDeveloperRegister/setCreateForm'
        }),
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
    goBack(){
        this.$router.go(-1) 
    },

    async close () {
      setTimeout(() => {
        this.$refs.form.reset()
         this.courseForm = Object.assign({}, this.defaultForm)
        this.editedIndex = -1
      }, 300)
       this.$store.dispatch("regionalCurriculumDeveloperRegister/doDialogs", false)
    },
 
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
    updateIsFilledAndValid  : function(){
      return (
          (this.courseForm.courseName &&  /^[A-Za-z ]+$/.test(this.courseForm.courseName)) &&
          (this.courseForm.grade  && /^[0-9]+$/.test(this.courseForm.grade) ) &&
          (this.courseForm.field) &&
          (this.courseForm.description)
      )
    },
     
    },

    watch :{
         courseForm: {
      handler (v) {
        this.setCreateForm(v)
      },
      deep: true
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
