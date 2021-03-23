<template>
  <v-app id="inspire">
    
      <v-card>
        <v-data-table
          :headers="headers"
          :items="listItem"
          sort-by="status"
          class="elevation-1 mytable"
          :search="search"
        >
          <template v-slot:top> 
            <v-toolbar flat color="white">              
              <v-dialog :value="dialog"  persistent max-width="800px" >                
                  <template v-slot:activator="{}" > 
                     <v-snackbar  
                      v-model="showError" :timeout=10000 :color="color">
                        {{message}}
                      <v-btn
                          color="pink"
                          text
                          @click="showError = false"
                      >
                          Close
                      </v-btn>
                    </v-snackbar> 
                    <v-card width="1200" >
                      <v-toolbar
                        color="pink"
                        dark 
                      >
                      <v-toolbar-title> Marks</v-toolbar-title>
                      <v-divider
                        inset
                        vertical
                      ></v-divider>  
                      <v-spacer></v-spacer> 
                      <v-flex xs12 md3 class="px-1">
                        <v-text-field
                          v-model="search"
                          prepend-inner-icon="search"
                          label="Search"
                          single-line
                          hide-details
                        ></v-text-field>
                      </v-flex>
                      <v-spacer></v-spacer> 
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                        <v-btn class="mx-2" small fab dark color="indigo" v-on="on" @click="doDialogs">
                          <v-icon >mdi-plus</v-icon>
                        </v-btn> 
                        </template>
                        <span>Click to Add</span>
                      </v-tooltip>
                      </v-toolbar>
                    </v-card>                    
                  </template>       
                <v-card>
                  <v-card-title>
                    <span class="headline"> <strong class="red--text text--lighten-1"> {{ formTitle }}</strong></span>
                  </v-card-title>
                    <v-card-text>
                      <div class="mx-8 px-8">
                        
                        <span class="px-5"> Total Mark: <b>{{totalMark}}</b></span> <span class="px-5"> grade: <b>{{grade}}</b></span>
                        <br><br>
                      </div>
                      
                      <v-form >
                        <v-layout row class="px-4">  
                          <v-snackbar  
                            v-model="showError" :timeout=10000 :color="color">
                              {{message}}
                            <v-btn
                                color="pink"
                                text
                                @click="snackbar = false"
                            >
                                Close
                            </v-btn>
                          </v-snackbar>                          
                                    
                          <v-flex xs12 sm4 md5 class="px-5"  >                                  
                            <v-text-field
                                label="Assignment 10%"
                                v-model="Form.assignment"
                                prepend-icon="mdi-account"
                                type="number"
                                :rules="markRules">
                            </v-text-field>  
                            <v-text-field
                              label="Group Work (20%)"
                              v-model="Form.groupWork"
                              prepend-icon="mdi-account"
                              type="number"
                              :rules="markRules">
                            </v-text-field>                              
                          </v-flex>
                          <v-flex xs12 sm4 md5 class="px-1"  >
                            <v-text-field
                                label="Mid Exam(30%)"
                                v-model="Form.midExam"
                                prepend-icon="mdi-account"
                                type="number"
                                :rules="markRules">
                            </v-text-field>
                            <v-text-field
                                label="Final (40%)"
                                v-model="Form.finalExam"
                                prepend-icon="mdi-account"
                                type="number"
                                :rules="markRules">
                            </v-text-field>
                          </v-flex> 
                        </v-layout>
                      </v-form>
                    </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <div v-if="actiontype">
                      <v-btn color="blue darken-1" text :disabled="!isFormFilled" @click="createItem"> <v-icon small>mdi-plus</v-icon>Save </v-btn>
                    </div>
                    <div v-else>
                      <v-btn color="blue darken-1" text :disabled="!isFormFilled" @click="editSubmitItem"> <v-icon small>edit</v-icon>Update</v-btn>
                    </div>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-row justify="center">
                <v-dialog v-model="deletedialog" persistent max-width="290">
                  <v-card>
                    <v-card-title class="headline">Delete Item</v-card-title>
                    <v-card-text>Are you sure you want to delete {{deleteditem}}</v-card-text>
                    <v-text-field hidden  v-model="Form.itemid"></v-text-field>
                  
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-1" text @click="deleteItem">Yes</v-btn>
                      <v-btn color="green darken-1" text @click="closeDelete">No</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-toolbar>
          </template>              
          <template v-slot:item.action="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
              <v-icon                   
                  small 
                  class="mr-2 blue--text" 
                  @click="viewItem(item)" 
                  v-on="on" 
              >
                mdi-eye
              </v-icon>
              </template>
              <span>Click to View</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
              <v-icon                   
                  small 
                  class="mr-2 green--text" 
                  @click="editItem(item)" 
                  v-on="on"   
              >
                  edit
              </v-icon>
              </template>
              <span>Click to Edit</span>
            </v-tooltip>
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-avatar dark color="white" size="36">
                    <v-icon
                      small                          
                      color="error"                    
                      @click="confirmdelete(item)"
                      v-on="on"
                    >
                      delete
                    </v-icon>
                  </v-avatar>
              </template>
                <span>Click to Delete</span>
            </v-tooltip>
          </template>
        </v-data-table>   
      </v-card> 
    
  </v-app>
</template>

<script>
  import { mapMutations, mapActions, mapState } from 'vuex'
  export default {
    props: {
      source: String,
    },
    data: () => ({
      deletedialog: false,
      editedIndex: -1,
      viewedIndex: -1,
      search: '',
      markRules: [v => v >= 0 || "Invalid Voucher Number"],
      Form: {
        grade:'N',
        assignment: 0,
        groupWork: 0,
        midExam: 0,
        finalExam: 0
      },
      defaultForm: {
        grade:'N',
        assignment: 0,
        groupWork: 0,
        midExam: 0,
        finalExam: 0
      },
      deleteditem: '',
      headers: [
        {
          text: 'Student Name',
          align: 'left',
          sortable: false,
          value: 'firstname',
        },   
        { text: 'Assignment', value: 'assignment' },
        { text: 'Group Work', value: 'groupWork' },
        { text: 'Mid Exam', value: 'midExam' },
        { text: 'Final Exam', value: 'finalExam' },
        { text: 'Total Mark', value: 'totalMark' },
        { text: 'Action', value: 'action', sortable: false }
      ],
      showError: false 
  }), 
  async created () {
    this.$store.dispatch("marks/getItems")    
  },
  methods: {
    ...mapActions({
      docreateItem: 'marks/doCreate',
      doUpdateItem: 'marks/doUpdate',
      doDeleteOrder: 'marks/doDelete'
    }),

    ...mapMutations({
      setCreateForm: 'marks/setCreateForm'
    }),
    doDialogs()
    {
      this.$store.dispatch("marks/doDialogs", true)
      this.$store.dispatch("marks/doAction", true)
    },
    async createItem() { 
      this.Form.totalMark = this.totalMark   
      this.Form.grade = this.grade
       await this.docreateItem()      
        this.showError = true
    },
    async editSubmitItem() { 
      this.Form.totalMark = this.totalMark   
      this.Form.grade = this.grade
       await this.doUpdateItem()    
        this.showError = true
    },
    async viewItem (item) {  
      this.$router.replace(this.$route.query.redirect || '/instructor/mark/' + item._id) 
    },
    async editItem (item) {
      this.editedIndex = this.listItem.indexOf(item)
      this.Form = Object.assign({}, item)
      this.$store.dispatch("marks/doDialogs", true)
      this.$store.dispatch("marks/doAction", false)
    },
    async close () {
      setTimeout(() => {
        this.Form = Object.assign({}, this.defaultForm)
        this.editedIndex = -1
      }, 300)
       this.$store.dispatch("marks/doDialogs", false)
    },
    confirmdelete (item) {
      this.Form = Object.assign({}, item)
      let newd= this.Form.firstname + ' marks ?'
      this.deleteditem=newd        
      this.deletedialog= true
    }, 
    async deleteItem(){
      let id=this.Form._id
     let deletestatus= this.$store.dispatch("marks/doDelete", id)  
     this.Form = Object.assign({}, this.defaultForm)
     if (deletestatus)
     {
        this.deletedialog= false
        this.showError=true
     } 

    }, 
    async closeDelete(){        
     this.Form = Object.assign({}, this.defaultForm)     
      this.deletedialog= false       
    }
  },
  computed: {
    ...mapState({
      listItem: state => state.marks.listItem,
      dialog: state => state.marks.dialog,
      snackbar: state => state.marks.snackbar,
      message: state => state.marks.message,
      color: state => state.marks.color,
      actiontype: state => state.marks.actiontype
    }),
    formTitle () {
      return this.editedIndex === -1 ? 'New  Mark Insertion' : 'Edit Inserted'
    },
    isFormFilled () {
        return (this.Form.assignment && this.Form.groupWork && this.Form.midExam && this.Form.finalExam);
    },
    totalMark(){ 
      return (parseInt(this.Form.assignment) + parseInt(this.Form.groupWork) + parseInt(this.Form.midExam) + parseInt(this.Form.finalExam) );
    },
    grade(){ 
      if(this.totalMark >=90)
      {
        return 'A'
      }
      else if (this.totalMark <90 && this.totalMark>=80)
      {
        return 'B'
      }
      else
      {
        return 'C'
      }
    }
  },
  watch: {
    Form: {
      handler (v) {
        this.setCreateForm(v)
      },
      deep: true
    }
  },
}
</script>

<style>
 .v-data-footer {
    background-color: rgb(250 ,250, 250);
  }
 .mytable table thead th {
   font-size: 15px;
 }
 tr:nth-of-type(even) {
 background-color: rgba(167, 54, 54, 0.05);
}

</style>