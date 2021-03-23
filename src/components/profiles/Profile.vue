<template>
    <v-app id="inspire">
        <v-content>
            <v-row align="center" justify="center">
                <!-- <v-col cols='12' sm='0' md='1'></v-col> -->
                <v-col cols="12" sm="8" md="3">
                    <template>                
                        <v-card color=" darken-3" dark height="430">
                            <v-container
                                fluid
                                grid-list-lg >
                                <v-layout row wrap>
                                     
                                     
                                    <v-avatar                
                                        class="mx-auto d-block"
                                        size="130"
                                    >
                                        <img
                                        src="@/assets/sidebar.jpg"
                                        >
                                    </v-avatar>
                                    <v-card-text class="text-xs-center">
                                        <h6 class="category text-gray font-weight-thin mb-3"></h6>
                                        <h4 class="card-title font-weight-light">{{Form.fullName}}, {{Form.email}}, {{Form.phoneNumber}}</h4>
                                        <p class="card-description font-weight-light">Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...</p>
                                                                        
                                    </v-card-text>                             
                                </v-layout>
                            </v-container>
                        </v-card>                
                    </template>
                </v-col>
                <v-col cols="12" sm="4" md="8">
                    <v-card  color="darken-3" dark >
                        <v-card-title class="text-center justify-center py-6">
                        <h3 class="font-weight-bold  basil--text">Update Your Profile</h3>
                        </v-card-title>
                        <v-form ref="form" enctype="multipart/form-data">   
                            <v-row  justify="center">   
                                <v-col cols="12" sm="8" md="5">                           
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
                                </v-col>
                                <v-col cols="12" sm="8" md="6">                                    
                                <v-combobox
                                    v-model="Form.region"
                                    :items="regions"
                                    label="Region"                                
                                    prepend-icon = "location_city"
                                ></v-combobox>
                                <v-text-field
                                    label = "City"
                                    v-model = "Form.city"
                                    prepend-icon = "location_city"
                                    type = "text"
                                    :rules="Rules">
                                </v-text-field>
                                <v-textarea
                                    label = "Description"
                                    v-model = "Form.description"
                                    prepend-icon = "account_balance"
                                    rows="2"
                                    type = "text"
                                    placeholder="I am 8th emperiror"
                                    :rules="Rules">
                                </v-textarea>
                                </v-col>
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
                            </v-row>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
        </v-content>         
    </v-app>
</template>

<script>
    import Api from '@/services/ApiFile'; 
    import { mapMutations, mapActions, mapGetters, mapState} from 'vuex'
    export default {
        name: 'Profile',       
        data() {
            return {                 
                showError: false,
                profileImg: '',
                message: '',
                colour: "success",
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
                regions: [
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

            }
        },
        async created () {
            this.$store.dispatch("update/getLists")
        },
        methods: {
            ...mapActions({
                doSnackbar: 'update/doSnackbar',
            }),
            ...mapMutations({
                setCreateForm: 'update/setCreateForm'
            }),
            onImagePicked(file){               
                this.profileImg = file
                console.log(this.profileImg);
            },
            async CreateItem()
            {                
                let formdata = new FormData(); 
                formdata.append('profileImg', this.profileImg)
                formdata.append('fullName', this.Form.fullName)
                formdata.append('email', this.Form.email)
                formdata.append('phoneNumber', this.Form.phoneNumber)
                formdata.append('region', this.Form.region)
                formdata.append('city', this.Form.city)
                formdata.append('description', this.Form.description)

                // console.log(formdata)
                // for (var data of formdata) {
                //     console.log(data);
                // }
                await Api().post('/api/user/profile/update', formdata)
                    .then(res => {
                        this.message = res, 
                        this.colour = "success"
                        console.log('Success' + JSON.stringify(res.data))
                    })
                    .catch((error) => {
                        this.message = error, 
                        this.colour = 'error'
                        console.log('Error')
                    })
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