<template>
    <v-app id='app' >
         <v-container fluid>
              <v-snackbar
                        v-model="showMessage" :timeout=10000 :color="colour"
                        >
                            {{message}}
                            <v-btn
                                color='black'
                                text
                                @click="showMessage = false"
                            >
                                Close
                            </v-btn>
                    </v-snackbar>
                <v-layout row wrap justify-space-around>
                    <v-flex xs12 md2 >
                        <v-card flat class="pa-3" style="background-color:rgb(236,240,245);">
                            <v-list class="secondary_navigation">
                                <v-list-tile link>
                                    <v-list-tile-content>
                                       <v-list-tile-title>
                                           <a href="fj" class="secondary_list_items">Notifications</a>
                                       </v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>

                             <v-list class="secondary_navigation">
                                <v-list-tile link>
                                    <v-list-tile-content>
                                       <v-list-tile-title>
                                           <a href="fj" class="secondary_list_items">Profile</a>
                                       </v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>

                             <v-list class="secondary_navigation">
                                <v-list-tile link>
                                    <v-list-tile-content>
                                       <v-list-tile-title>
                                           <a href="fj" class="secondary_list_items">Setting</a>
                                       </v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>

                        </v-card>
                    </v-flex>
                     <v-flex xs12 md6 mx-5>
                         
                        <v-card flat class="pa-3"  style="background-color:rgb(236,240,245);">
                            <v-layout row>
                                <v-flex xs12 md4 >
                                    <v-responsive class="profile_picture">
                                        <v-avatar size="150">
                                            <img  src="@/assets/avatar.png" height="150px">
                                        </v-avatar>
                                        
                                    </v-responsive>
                                    <p>Edit</p>
                                </v-flex>
                                 <v-flex xs12 md8 >
                                     <v-layout column>
                                         <v-flex>
                                             <h4>{{user.fullName}}</h4>
                                         </v-flex>
                                          <v-flex class="pt-4">
                                             <h5>Mobile Number</h5>
                                             <p>{{user.mobileNumber}}</p>
                                         </v-flex>
                                         <v-flex class="pt-4">
                                             <h5>Email</h5>
                                             <p>{{user.email}}</p>
                                         </v-flex>
                                         <v-flex class="pt-4">
                                          
                                             <v-btn class="grey white--text" @click="dialog=true">
                                                  <v-icon>cached</v-icon>
                                                 <span>Change Password</span>
                                              </v-btn>
                                            
                                         </v-flex>

                                     </v-layout>
                                </v-flex>
                            </v-layout>
                            </v-card>
                    </v-flex>
                     <v-flex xs12 md2>

                        <v-card flat  px-5 style="background-color:rgb(236,240,245);"   >
                            <v-btn class="grey white--text">
                                <v-icon>edit</v-icon>
                                <span>Edit Profile</span>
                            </v-btn>
                        </v-card>
    <v-dialog :value="dialog" persistent max-width="600px">
        <v-card>
            <v-card-title>
            <span class="headline"> <strong class="red--text text--lighten-1"> Change Password </strong></span>
            </v-card-title>
            <v-card-text>
                <v-form ref='passwordChangeForm'>
                <v-layout row justify-center>
                   
                    <v-flex xs12 md8>
                        <v-text-field
                                    label="Old Password"
                                    :disabled="inputsDisabled"
                                    v-model = "passwordForm.oldpassword"
                                    :type= "passwordVisibility.oldpassword ? 'text':'password'"
                                    :append-icon="passwordVisibility.oldpassword ? 'visibility':'visibility_off'"
                                    @click:append="passwordVisibility.oldpassword =!passwordVisibility.oldpassword"
                                    :rules="passwordRules"
                                   />
                        <v-text-field
                                    label="New Password"
                                    :disabled="inputsDisabled"
                                    v-model = "passwordForm.newpassword"
                                    :type= "passwordVisibility.newpassword ? 'text':'password'"
                                    :append-icon="passwordVisibility.newpassword ? 'visibility':'visibility_off'"
                                    @click:append="passwordVisibility.newpassword =!passwordVisibility.newpassword"
                                    :rules="passwordRules"
                                    />
                         <v-text-field
                                    label="Confirm Password"
                                    :disabled="inputsDisabled"
                                    v-model = "confirmPassword"
                                    :type= "passwordVisibility.confirmPassword ? 'text':'password'"
                                    :append-icon="passwordVisibility.confirmPassword ? 'visibility':'visibility_off'"
                                    @click:append="passwordVisibility.confirmPassword =!passwordVisibility.confirmPassword"
                                    :rules="[(confirmPassword===passwordForm.newpassword) || 'Password Must Match']"
                                    />
                    </v-flex>
                </v-layout>
                </v-form>
            </v-card-text>
             <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
             <v-btn color="blue darken-1" text :disabled="!passwordChangeFormIsFilled" @click='updatePassword'> <v-icon small>reorder</v-icon>Save </v-btn>           
            </v-card-actions>
           
        </v-card>
    </v-dialog>
                    </v-flex>
                </v-layout>
                        
             </v-container>
       

        
    </v-app>
</template>

<script>
//import Api from '@/services/ApiFile';
import { mapMutations, mapActions, mapGetters, mapState} from 'vuex';
export default {
    name:'RebProfile',
    data: function(){
        return {
            dialog:false,
            inputsDisabled:false,
            showMessage:false,
            user : {
                fullName :'',
                email :'',
                mobileNumber :'',
                courses:'',
                statues:'',
            },
            confirmPassword:'',
            passwordForm:{
              oldpassword:'',
              newpassword:''
            },
            passwordVisibility:{
              oldpassword:false,
              newpassword:false,
              confirmPassword:false
            },


            edit_user : {

            },

            role_list : [
                'Curriculum Developer',
                'Curriculum Verifier ',
                'Schools Registrar',
                'School Registration Verifier',
                'School Monitorer ',
            ],
            role_label : 'Role',
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
                    v => (v && v.length >= 8) || 'Password must be eight characters'
            ],

        }
    },

     async created () {
         await this.doGetUser();
         this.user = this.getUser();
        },

    methods: {
    ...mapActions({
        doSnackbar: 'rebProfile/doSnackbar',
        UpdatePassword:'rebProfile/doUpdatePassword',
        doGetUser:'rebProfile/doGetUser'
    }),
    ...mapMutations({
        setCreateForm: 'rebProfile/setCreateForm'
    }),
    ...mapGetters({
      getUser:'rebProfile/getUser'
    }),

    async close()
        {
                this.dialog=false
        },
     async updatePassword(){
       await this.UpdatePassword();
       this.showMessage=true
       this.$refs.passwordChangeForm.reset()
       this.dialog=false
    },

    onImagePicked(file){
        this.profileImg = file
    },
    },

    computed: {
      ...mapState({
          errorr: state => state.rebProfile.errorr,
          message: state => state.rebProfile.message,
          colour: state => state.rebProfile.colour,
        }),

        isFormFilled () {
            return (this.Form.phoneNumber && this.Form.email);
        },
        passwordChangeFormIsFilled(){
          return (this.passwordForm.oldpassword && this.passwordForm.newpassword && this.confirmPassword &&(this.passwordForm.newpassword === this.confirmPassword));
        },
        passwordConfirmtion(){
          return ()=>(this.passwordForm.newpassword === this.confirmPassword) || 'Password must match'
        },
        UpdateFormIsFilledAndValid(){
          return(
            (this.user.fullName  &&  /^[A-Za-z ]+$/.test(this.user.fullName) )&&
            (this.user.email && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.user.email)) &&
            (this.user.mobileNumber && /^[0-9]+$/.test(this.user.mobileNumber) && this.user.mobileNumber.length ===10 )
          )
        }
    },

    watch :{
      passwordForm: {
          handler (v) {
              this.setCreateForm(v)
          },
      deep: true
      },
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
</style>
