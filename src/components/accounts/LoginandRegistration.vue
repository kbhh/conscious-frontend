<template>
 <v-app id="inspire">
    <v-row align="center" justify="center">

        <v-col  cols="12" md="2">
           <a href="/">Back to Home</a>
        </v-col>

        <v-col cols="11" md="6">
            <v-card color="basil" height="100%">
                    <v-card-title class="text-center justify-center py-6">
                    <h3 class="font-weight-bold  basil--text">Conciscous Brain</h3>
            </v-card-title>
            <v-tabs
                  v-model="tab"
                  background-color="transparent"
                  color="basil"
                  grow
                  >
                  <v-tab>Login</v-tab>
                  <v-tab>Register</v-tab>
                <v-tab-item>
                        <v-container fluid fill-height>
                            <v-row align="center" justify="center">
                                <v-col cols="12" sm="8" md="8">
                                     <v-snackbar
                                        v-model="showloginMessage" :timeout=10000 color="error"
                                        >
                                            {{loginmessage}}
                                            <v-btn
                                                color='black'
                                                text
                                                @click="showloginMessage = false"
                                            >
                                                Close
                                            </v-btn>
                                    </v-snackbar>
                      <v-form @submit.prevent="handleAccountLogin" content-type="application/x-www-form-urlencoded">
                              <v-card-text>
                                      <v-text-field label="Email" value="" v-model="loginForm.email" :rules="emailRules"  prepend-icon = "email" />
                                      <v-text-field label="Password"  type="password" value="" v-model="loginForm.password" :rules="passwordRules"   prepend-icon = "mdi-lock"/>
                              </v-card-text>
                              <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="blue darken-2 white--text" type="submit" :disabled="!loginIsFilled" >Login</v-btn>
                              </v-card-actions>
                        </v-form>
                      </v-col>
                    </v-row>
                   <v-row>
                          <v-spacer></v-spacer>
                          <v-btn class="mx-5" text large @click="resetDialog" color="pink">
                              Forget Password ?
                          </v-btn>
                      </v-row>
                        </v-container>
                    </v-tab-item>
                    <v-tab-item>
                        <v-row align="center" justify="center">
                            <v-col cols="12" sm="8" md="8">
                                <v-form ref="form">
                                    <v-text-field
                                        label = "Full Name"
                                        v-model = "registerForm.fullName"
                                        prepend-icon = "person"
                                        type = "text"
                                            :rules="alphabetOnly">
                                    </v-text-field>
                                    <v-text-field
                                        label = "Email"
                                        v-model = "registerForm.email"
                                        prepend-icon = "email"
                                        type = "email"
                                        :rules="emailRules">
                                    </v-text-field>
                                    <v-text-field
                                        label = "Mobile Number"
                                        v-model = "registerForm.mobileNumber"
                                        prepend-icon = "phone"
                                        type = "text"
                                        :rules="phoneRules">
                                    </v-text-field>
                                    <v-text-field
                                        label = "Identification Card Number"
                                        v-model = "registerForm.userId"
                                        prepend-icon = "mdi-card-account-details   "
                                        type = "text"
                                        :rules="userIdRules">
                                    </v-text-field>
                                    <v-text-field
                                        label = "Password"
                                        v-model = "registerForm.password"
                                        prepend-icon = "lock"
                                        :type= "passwordVisibility.password ? 'text':'password'"
                                        :append-icon="passwordVisibility.password ? 'visibility':'visibility_off'"
                                        @click:append="passwordVisibility.password =!passwordVisibility.password"
                                        :rules="passwordRules">
                                    </v-text-field>
                                    <v-text-field
                                        label = "Confirm Password"
                                        v-model = "confirmPassword"
                                        prepend-icon = "lock"
                                        :type= "passwordVisibility.confirmPassword ? 'text':'password'"
                                        :append-icon="passwordVisibility.confirmPassword ? 'visibility':'visibility_off'"
                                        @click:append="passwordVisibility.confirmPassword =!passwordVisibility.confirmPassword"
                                         :rules=" [(registerForm.password === confirmPassword) || 'Password must match']">
                                    </v-text-field>
                                    <v-card-actions>
                                        <div class="flex-grow-1"></div>
                                        <v-btn color="primary" :disabled="!registerIsFilledAndValid" @click="CreateItem">Register</v-btn>
                                    </v-card-actions>
                                </v-form>
                            </v-col>
                        </v-row>
                    </v-tab-item>
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
                </v-tabs>
            </v-card>
        </v-col>
    </v-row>
    <v-dialog :value="dialog" persistent max-width="500px">
        <v-card>
            <v-card-title>
            <span class="headline"> <strong class="red--text text--lighten-1"> Reset Your Password </strong></span>
            </v-card-title>
            <v-card-text>
                <v-form ref='resetform'>
                <v-layout row class="px-1">
                    <v-snackbar
                     v-model="showResetMessage" :timeout=10000 color="pink"
                    >
                        {{resetMessage}}
                        <v-btn
                            color="white"
                            text
                            @click="snackbar = false"
                        >
                            Close
                        </v-btn>
                    </v-snackbar>
                    <v-flex xs12 md8>
                        <v-text-field
                            label = "Mobile Number"
                            v-model = "resetForm.mobileNumber"
                            prepend-icon = "phone"
                            type = "text"
                            :rules="phoneRules">
                        </v-text-field>
                        <v-text-field
                            label = "Email"
                            v-model = "resetForm.email"
                            prepend-icon = "email"
                            type = "email"
                            :rules="emailRules">
                        </v-text-field>
                    </v-flex>
                </v-layout>
                </v-form>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>

            <v-btn color="blue darken-1" text :disabled="!isrestFormFilled" @click='reset'> <v-icon small>mdi-plus</v-icon>Reset </v-btn>

            </v-card-actions>
        </v-card>
    </v-dialog>
 </v-app>
</template>



<script>
import Api from '@/services/Api';
import Role from '@/auth/rebRoles';
import { mapMutations, mapActions, mapState} from 'vuex'

export default {
    name : "login",
    data : function(){
        return {
            tab: 'Register',
            dialog:false,
            showMessage:false,
            showloginMessage:false,
            showResetMessage:false,
            loginmessage:'',
            resetMessage:'',
            confirmPassword:'',
            items: [
                { tab: 'Login', content: 'Tab 1 Content' },
                { tab: 'Register', content: 'Tab 2 Content' },
            ],

            loginForm : {
                email : "",
                password : "",
            },
            registerForm : {
                fullName : "",
                password : "",
                userId:"",
                mobileNumber : "",
                email : "",
            },
            resetForm : {
                mobileNumber : "",
                email : "",
            },
            passwordVisibility:{
              password:false,
              confirmPassword:false
            },
            requiredRules :
            [
                v=> !!v || "Required"
            ],
            userIdRules :
            [
                v=> !!v || "Identification Card Number Required"
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
                v=> /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) ||'Email must be valid'
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
        }
    },

    methods :{
        ...mapActions({
            doCreateItem: 'userRegister/doCreate',
            doSnackbar: 'userRegister/doSnackbar',
            doReset: 'userRegister/doReset'
        }),

        ...mapMutations({
            setCreateForm: 'userRegister/setCreateForm',
            setResetForm:'userRegister/setResetForm'
        }),
        async CreateItem()
        {
            console.log('button clicked');
            await this.doCreateItem()
            this.showMessage=true
            if(!this.errorr)
            {
                this.tab='login'
                this.$refs.form.reset()
            }
        },

        async reset()
        {
            await this.doReset()
            this.showResetMessage=true
            this.resetMessage=this.resetResponse.data.message
            if(!this.resetResponse.data.error)
            {
                this.$refs.resetform.reset()
                this.dialog=false
            }

        },
        async resetDialog()
        {
                this.dialog=true
        },
        async close()
        {
                this.dialog=false
        },

        handleAccountLogin(){
            Api().post('/api/reb/officials/login', {email: this.loginForm.email, password: this.loginForm.password})
                .then(res => {
                    if (!res.data.error)this.loginSuccessful(res)
                    else{
                        this.loginFailed(res)
                    }
                }
                )
                .catch((error) => this.loginFailed(error))
        },
        loginSuccessful(response) {
            if (!response.data.token) {

                this.loginFailed()
                return
            }
            let locstvalue={token:response.data.token, role:response.data.role}


            localStorage.setItem('loggedInUser',JSON.stringify(locstvalue))
            this.checkCurrentLogin()
        },
        loginFailed (response) {
            if(response.data.message)
            {
                this.loginmessage=response.data.message
            }
             this.showloginMessage=true
            localStorage.clear();
        },

        async checkCurrentLogin(){
            if(localStorage.loggedInUser){
                let userRole = JSON.parse(localStorage.loggedInUser).role;
                if(userRole === Role.manager){
                    this.$router.replace(this.$route.query.redirect || '/manager')
                }else if(userRole === Role.instructor){
                    this.$router.replace(this.$route.query.redirect || '/instructor')
                }else if(userRole === Role.owner){
                    this.$router.replace(this.$route.query.redirect || '/owner')
                }else if(userRole === Role.officer){
                    this.$router.replace(this.$route.query.redirect || '/officer')
                }else if(userRole === Role.rebAdmin){
                    this.$router.replace(this.$route.query.redirect || '/reb-admin')
                }else if(userRole === Role.curriculumDeveloper ){
                    this.$router.replace(this.$route.query.redirect || '/reb-cd')
                }else if(userRole === Role.contentDeveloper ){
                    this.$router.replace(this.$route.query.redirect || '/reb-ccd')
                }
            }else{
                return
            }
        }
    },

    computed : {
        ...mapState({
            errorr: state => state.userRegister.errorr,
            message: state => state.userRegister.message,
            colour: state => state.userRegister.colour,
            resetResponse: state => state.userRegister.resetResponse,
        }),

        loginIsFilled : function(){
            return ((this.loginForm.email && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.loginForm.email)) && (this.loginForm.password && this.loginForm.password.length >=8 ))
        },
        isrestFormFilled : function(){
            return ((this.resetForm.email && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.resetForm.email)) && (this.resetForm.mobileNumber  && /^[0-9]+$/.test(this.resetForm.mobileNumber) && this.resetForm.mobileNumber.length ===10))
        },

        registerIsFilledAndValid : function(){
            return (
              (this.registerForm.fullName && /^[A-Za-z ]+$/.test(this.registerForm.fullName) && this.registerForm.fullName.length > 4) && (this.registerForm.userId )&&
              (this.registerForm.email && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.registerForm.email)) && (this.registerForm.mobileNumber && /^[0-9]+$/.test(this.registerForm.mobileNumber) && this.registerForm.mobileNumber.length ===10) && (this.registerForm.password && this.registerForm.password.length ===8)&& (this.confirmPassword && (this.confirmPassword===this.registerForm.password) && this.confirmPassword.length ===8)
            )
        },




    },

    watch : {
        registerForm: {
            handler (v) {
                this.setCreateForm(v)
            },
        deep: true
        },
        resetForm: {
            handler (v) {
                this.setResetForm(v)
            },
            deep: true
        }
    },

   async created() {
        this.checkCurrentLogin()
    }

}
</script>
<style>
/* Helper classes */
.basil {
  background-color: rgb(241, 230, 255) !important;
}
.basil--text {
  color: #356859 !important;
}
</style>
