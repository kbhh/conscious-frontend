<template>
  <v-app id="inspire">
      <v-card>
        <v-data-table
          :headers="headers"
          :items="listItem"
          sort-by="userId"
          class="elevation-1 mytable"
          :search="search"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-dialog :value="dialog" persistent max-width="800px" >
                  <template v-slot:activator="{}" >
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

                     <v-sheet
                        class="v-sheet--offset mx-auto"
                        elevation="12"
                        width="1030"
                      >
                      
                      <v-toolbar
                        color="pink"
                        dark
                      >
                      <v-toolbar-title> Users</v-toolbar-title>
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

                     </v-sheet>

                  </template>
                <v-card style='border-top:3px solid blue'>
                  <v-card-title>
                    <span class="headline" center> <strong class="red--text text--lighten-1 "> {{ formTitle }}</strong></span>
                  </v-card-title>
                    <v-card-text>
                      <v-row  justify="center" align="center">
                             <v-col cols="12" md="5" >
                             <v-layout row wrap>
                                    <v-avatar class="mng-acct-profile-picture ml-10" size="130" > 
                                        <img v-bind:src="profileImg">                                        
                                    </v-avatar> 
                                    
                                    <v-card-text>
                                        <!-- <span>
                                            <v-file-input small-chips prepend-icon="mdi-camera"  ref="fileupload"    placeholder="Change Picture" @change="onImagePicked"></v-file-input> 
                                        </span>  -->
                                    </v-card-text> 
                                </v-layout>
                             </v-col>
                      </v-row>
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
                                  <span>
                                            <v-file-input small-chips prepend-icon="mdi-camera"  ref="fileupload"    placeholder="Change Picture" @change="onImagePicked"></v-file-input> 
                                        </span> 
                                  <v-text-field
                                      label = "Full Name"
                                      v-model = "registerForm.fullName"
                                      prepend-icon = "person"
                                      type = "text"
                                      :rules="alphabetOnly">
                                  </v-text-field>
                                  <v-text-field
                                      label = "User Id"
                                      v-model = "registerForm.userId"
                                      prepend-icon = "mdi-card-account-details "
                                      type = "text"
                                          :rules="userIdRules">
                                  </v-text-field>
                                  <v-select
                                  :items="role_list"
                                   v-model = "registerForm.role"
                                   prepend-icon = "mdi-account-key-outline"
                                  label="Role"
                                  :rules="requiredRules"
                                  >

                                  </v-select>
                            </v-col>
                             <v-col cols="12" md="6" >
                                  
                                  <v-text-field
                                      label = "Mobile Number"
                                      v-model = "registerForm.mobileNumber"
                                      prepend-icon = "phone"
                                      type = "text"
                                      :rules="phoneRules">
                                  </v-text-field>
                                   <div v-if="actiontype">
                                    <v-text-field
                                        v-model="registerForm.password"
                                        label = "Password"
                                        prepend-icon = "lock"
                                        :type= "passwordVisibility.password ? 'text':'password'"
                                        :append-icon="passwordVisibility.password ? 'visibility':'visibility_off'"
                                        @click:append="passwordVisibility.password =!passwordVisibility.password"
                                        :rules="passwordRules">
                                    </v-text-field>
                                    </div>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                    <div v-if="actiontype">
                                      <v-btn color="blue darken-1" text :disabled="!registerIsFilledAndValid" @click="CreateItem"> <v-icon small>mdi-plus</v-icon>Save </v-btn>
                                    </div>
                                    <div v-else>
                                      <v-btn color="blue darken-1" text :disabled="!updateIsFilledAndValid" @click="editSubmitItem"> <v-icon small>edit</v-icon>Update</v-btn>
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
                    <v-card-text>Are you sure you want to delete {{deleteditem}}</v-card-text>
                    <v-text-field hidden  v-model="registerForm.itemid"></v-text-field>

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
  import Api from '@/services/Api'
  import { mapMutations, mapActions, mapState } from 'vuex'
  export default {
    props: {
      source: String,
    },
    data: () => ({
      deletedialog: false,
      editedIndex: -1,
      viewedIndex: -1,
      deleteditem: '',
      search: '',
      passwordVisibility:{
        password:false,
      },

      registerForm : {
          fullName : "",
          userId : "",
          password : "",
          mobileNumber : "",
          email : "",
          role : ''
      },
       defaultForm : {
          fullName : "",
          userId : "",
          password : "",
          mobileNumber : "",
          email : "",
          role : ''
      },
      role_list : [
          'Curriculum Developer',
          'Curriculum Verifier ',
          'Schools Registrar',
          'School Registration Verifier',
          'School Monitorer ',
      ],
       requiredRules :
        [
            v=> !!v || "Required"
        ],
        userIdRules :
        [
            v=> !!v || "Identification Card Number Required",
        ],
        alphabetOnly:
        [
          v=> !!v || "Required",
          v=>/^[A-Za-z ]+$/.test(v) ||'Must be Alphabet Only',
          v => (v && v.length >= 4) || 'Must be atLeat four characters'
        ],
        emailRules :
        [
            v => !!v || "E-mail is required",
            v=> /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) ||'Invalid Email address'
        ],
        passwordRules:
        [
                v => !!v || "Password is required",
                v => (v && v.length === 8) || 'Password must be eight characters'
        ],

        phoneRules:
        [
                v => !!v || "Mobile Number is required",
                v=>/^[0-9]+$/.test(v) ||'Mobile Number Should only contain numeric value',
                v => (v && v.length === 10) || 'Phone Number must be ten characters'
        ],
      headers: [
        { text: 'Full Name', align: 'start', value: 'fullName' },
        { text: 'Role', value: 'role' },
        { text: 'User ID', value: 'userId' },
         { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'action', sortable: false }
      ],
      showMessage: false
  }),
  async created () {
    this.$store.dispatch("adminReg/getItems")
  },
  methods: {
    ...mapActions({
            doCreateItem: 'adminReg/doCreate',
            doUpdateItem: 'adminReg/doUpdate',
            doSnackbar: 'adminReg/doSnackbar',
        }),

        ...mapMutations({
            setCreateForm: 'adminReg/setCreateForm'
        }),
     async CreateItem()
        {
            await this.doCreateItem()
            this.showMessage=true
            if(!this.errorr)
            {
                this.$refs.form.reset()
            }
        },
    doDialogs()
    {
      this.$store.dispatch("adminReg/doDialogs", true)
      this.$store.dispatch("adminReg/doAction", true)
    },
    async editSubmitItem() {
       await this.doUpdateItem()
        this.showMessage = true
        if(!this.errorr)
        {
            this.$refs.form.reset()
        }
    },
    async editItem (item) {
      this.editedIndex = this.listItem.indexOf(item)
      this.registerForm= Object.assign({}, item)
      this.$store.dispatch("adminReg/doDialogs", true)
      this.$store.dispatch("adminReg/doAction", false)
    },
    async close () {
      setTimeout(() => {
        this.$refs.form.reset()
         this.registerForm = Object.assign({}, this.defaultForm)
        this.editedIndex = -1
      }, 300)
       this.$store.dispatch("adminReg/doDialogs", false)
    },
    confirmdelete (item) {
      this.registerForm = Object.assign({}, item)
      let newd= this.registerForm.fullName + ' adminReg ?'
      this.deleteditem=newd
      this.deletedialog= true
    },
    async deleteItem(){
      let id=this.registerForm._id
     let deletestatus= this.$store.dispatch("adminReg/doDelete", id)
     this.registerForm = Object.assign({}, this.defaultForm)
     if (deletestatus)
     {
        this.deletedialog= false
        this.showMessage=true
     }

    },
     onImagePicked(file){  
                let formdata = new FormData();  
                formdata.append('profileImg', file) 
                Api().post('/api/reb/officials/register', formdata)
                    .then(() => { 
                        this.showMessage = true 
                        this.$store.dispatch('update/getLists') 
                        this.$refs.fileupload.value=null;
                    })
                    .catch(() => {
                        this.showMessage = true 
                    })
            },
    async closeDelete(){
     this.Form = Object.assign({}, this.defaultForm)
      this.deletedialog= false
    }
  },
  computed: {
    ...mapState({
      listItem: state => state.adminReg.listItem,
      dialog: state => state.adminReg.dialog,
      snackbar: state => state.adminReg.snackbar,
      message: state => state.adminReg.message,
      colour: state => state.adminReg.colour,
      actiontype: state => state.adminReg.actiontype,
      errorr: state => state.adminReg.errorr,
      profileImg: state=>state.adminReg.profileImg
    }),
    formTitle () {
      return this.editedIndex === -1 ? 'Add New User' : 'Edit User'
    },

    registerIsFilledAndValid : function(){
      return (
          (this.registerForm.fullName &&  /^[A-Za-z ]+$/.test(this.registerForm.fullName) && this.registerForm.fullName.length > 4)&&
          (this.registerForm.userId) &&
          (this.registerForm.role)&&
          (this.registerForm.email && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.registerForm.email))
          &&
         (this.registerForm.mobileNumber && /^[0-9]+$/.test(this.registerForm.mobileNumber) && this.registerForm.mobileNumber.length ===10 ) &&( this.registerForm.password && this.registerForm.password.length ===8)
      )
    },

    updateIsFilledAndValid  : function(){
      return (
          (this.registerForm.fullName &&  /^[A-Za-z ]+$/.test(this.registerForm.fullName) && this.registerForm.fullName.length > 4)&&
          (this.registerForm.userId) &&
          (this.registerForm.role)&&
          (this.registerForm.email && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.registerForm.email))
          &&
         (this.registerForm.mobileNumber && /^[0-9]+$/.test(this.registerForm.mobileNumber) && this.registerForm.mobileNumber.length ===10 )
      )
    },
  },
  watch: {
    registerForm: {
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
.v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>
