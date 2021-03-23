<template>
  <div id="header-and-sidebar">    
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark class="pr-4">
      <v-toolbar-title style="width: 400px" class="ml-0 pl-4">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">ፋና መናእሰይ ዕቋርን ልቓሕን</span>
      </v-toolbar-title> 

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn class="mx-5" icon large @click="logout">
        Logout
      </v-btn>
    </v-app-bar> 
  </div>
</template>

<script>
  export default {
    name: 'page-header',  
    methods: {
      
      logout(){
        this.$store.dispatch('logout');
        localStorage.clear();
        this.$router.push('/login')
      }
    }
  }
</script>