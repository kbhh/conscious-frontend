<template>
    <!-- <nav> -->
        <!-- <v-container fluid class="py-0">
            <v-app-bar app dark dense class="indigo my-0 py-0">
                <v-toolbar-title class="text-uppercase grey--text" >
                    <img src='../../assets/meninet.jpg' alt="Meninent" height="50" >
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <router-link to="/" class="mx-3 grey--text text-uppercase font-weight-medium">Home</router-link>
                <router-link to="/register" class="mx-3 grey--text text-uppercase font-weight-medium" >Register</router-link>
                <router-link to="/login" class="mx-3 grey--text text-uppercase font-weight-medium" v-if="!$store.state.isUserLoggedIn" >Login</router-link>
            
                
                <template></template>
                <router-link to="#" class="mx-3 grey--text text-uppercase font-weight-medium" @click="logout" v-if="$store.state.isUserLoggedIn">Logout</router-link>
            </v-app-bar>        
        </v-container>         -->
    <!-- </nav> -->
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
        <v-toolbar-title align="center" justify="center" class=" mt-8 pb-5">
            <img src='@/assets/meninet.jpg' alt="Meninent" height="50" />
        </v-toolbar-title>
        <v-spacer></v-spacer>
    
        <v-btn icon>
            <v-icon>mdi-bell</v-icon>
        </v-btn>

        <v-btn class="mx-5" href="/login" icon large @click="login" v-if="!$store.state.isUserLoggedIn">
            Login
        </v-btn>
        <v-btn class="mx-5" icon large @click="logout" v-if="$store.state.isUserLoggedIn">
            Logout
        </v-btn>
    </v-app-bar>
</template>

<script>
//import AuthenticationService from '@/services/AuthenticationService';
export default {
    data() {
        return {
            // links: [
            //     {icon: "home", link_text: "Home", route:"/"},
            //     {icon: "signup", link_text: "Register", route:"/register"},
			// 	{icon: "login", link_text: "Login", route:"/login"},
			// 	{icon: "logout", link_text: "Logout", route:"/"}
			// ]
        }
    },
    computed : {
        isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
        isAdmin: function(){ return this.$store.getters.isAdmin}
    },
    methods: {
        logout(){
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)            
        }
    }
}
</script>