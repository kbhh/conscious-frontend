<template>
    <v-app id="inspire">
          <v-row align="center" justify="center">
              <v-col cols='12' sm='0' md='1'>
              </v-col>
            <v-col cols="12" sm="8" md="2">
                <template>
                <div
                    id="e3"
                    style="max-width: 400px; margin: auto;"
                    class="grey lighten-3"
                >
                    <v-toolbar
                    color="pink"
                    dark
                    >
                    <v-toolbar-title>Mobile Card</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card>
                        <v-container
                            fluid
                            grid-list-lg
                        >
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-card color="blue-grey darken-2" class="white--text">
                                    <v-card-title primary-title>
                                        <div>
                                        <div class="headline">Join us and Meet our Agents</div>
                                        <span>Register, become a member of the largest mobile card distributor in Ethiopia. You can become an 
                                            agent, distributor, sub distributor, or retailer. 
                                        </span>
                                        </div>
                                    </v-card-title>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </div>
                </template>
            </v-col>
            <v-col cols="12" sm="8" md="6">
                <v-card  >
                    <v-card-title class="text-center justify-center py-6">
                    <h3 class="font-weight-bold  basil--text">Update Your Profile</h3>
                    </v-card-title>
                     
                    <v-row align="center" justify="center">
                         <v-col cols="12" sm="12" md="8">
                            <v-form ref="form">                                 
                                <v-file-input  prepend-icon="mdi-camera" label="Photo" @change="onImagePicked">
                                  </v-file-input>
                                <v-text-field
                                    label = "Full Name"
                                    v-model = "Form.fullName"
                                    prepend-icon = "person"
                                    type = "text"
                                        :rules="Rules">
                                </v-text-field>
                                <v-text-field
                                    label = "Email"
                                    v-model = "Form.email"
                                    prepend-icon = "email"
                                    type = "email"
                                    :rules="emailRules">
                                </v-text-field>
                                <v-text-field
                                    label = "Phone Number"
                                    v-model = "Form.phoneNumber"
                                    prepend-icon = "phone"
                                    type = "email"
                                    :rules="mobileRules">
                                </v-text-field>
                                <v-textarea
                                    label = "Bank Account"
                                    v-model = "Form.bankAccounts"
                                    prepend-icon = "account_balance"
                                    rows="2"
                                    type = "text"
                                    placeholder="Bank:CBE Account Number: m353523"
                                    :rules="Rules">
                                </v-textarea>
                               <v-combobox
                                v-model="Form.region"
                                :items="regions"
                                label="Bussines Region"
                                chips
                                ></v-combobox>
                                <v-text-field
                                    label = "City"
                                    v-model = "Form.city"
                                    prepend-icon = "location_city"
                                    type = "text"
                                    :rules="Rules">
                                </v-text-field>
                                <v-snackbar  
                                    v-model="showError" :timeout=10000 :color="colour"
                                    >
                                        {{message}}
                                        <v-btn
                                            color="pink"
                                            text
                                            @click="snackbar = false"
                                        >
                                            Close
                                        </v-btn>
                                </v-snackbar>
                                <v-card-actions>
                                    <div class="flex-grow-1"></div>
                                    <v-btn color="primary" :disabled="!isFormFilled" @click="CreateItem">Update</v-btn>
                                </v-card-actions>  
                                 </v-form>                          
                            </v-col>
                       
                    </v-row>
                     
                </v-card>
            </v-col>
          </v-row>
         
    </v-app>
</template>

<script>
    import Api from '@/services/ApiFile'; 
    import { mapMutations, mapActions, mapGetters, mapState} from 'vuex'
    export default {
        name: 'Profile',
       
        data() {
            return {
                 
                showError:false,
                photos:'',
                 message:'',
                 colour:"success",
                 Rules: [v => !!v || "Required"],
                emailRules: [
                    v => !!v || "E-mail is required",
                    v => /.+@.+/.test(v) || "Invalid Email Address"
                ],
                mobileRules:
                [
                     v => !!v || "Mobile Number is required",
                     v => (v && v.length === 10) || 'Phone Number must be ten characters'
                ],
                regions:[
                    'Tigray',
                    'Afar',
                    'Amhara',
                    'Oromya',
                    'South',
                    'Somalia',
                    'Harari',
                    'Addis Ababa',
                    'Diredawa'
                ]
                //  Form:{
                //      fullName:'',
                //      email:'',
                //     phoneNumber: '',
                //     bankAccounts:'',
                //     region:'Addis Ababa',
                //     city:'',
                //     photo:''
                // } 

            }
        },
        async created () {
            this.$store.dispatch("update/getLists")
        },
        methods: {
            ...mapActions({
            doCreateItem: 'update/doCreate',
            doSnackbar: 'update/doSnackbar',
            }),

                    ...mapMutations({
            setCreateForm: 'update/setCreateForm'
            }),
            onImagePicked(file){               
                this.photos=file
        },
            async CreateItem()
            {
                
                let formdata = new FormData();
                formdata.append('photo',this.photos)
                formdata.append('fullName',this.Form.fullName)
                formdata.append('email',this.Form.email)
                formdata.append('phoneNumber',this.Form.phoneNumber)
                 formdata.append('region',this.Form.region)
                formdata.append('city',this.Form.city)
                 formdata.append('bankAccounts',this.Form.bankAccounts)
                 for (var data of formdata) {
                    console.log(data);
                    }
                Api().post('/api/user/profile/update', formdata)
                    .then(res => {this.message=res, this.colour="success"
                    console.log('Success')})
                    .catch((error) => {this.message=error, this.colour='error'
                    console.log('Error')})
            }
           
        },        
        computed: {
             ...mapState({
                errorr: state => state.update.errorr,
                Form: state=>state.update.createForm
                }),
            ...mapGetters({currentUser: 'currentUser'}),
             isFormFilled () {
                return (this.Form.phoneNumber && this.Form.email);
            }
        },
         watch: {
            Form: {
            handler (v) {
                this.setCreateForm(v)
            },
            deep: true
            }
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