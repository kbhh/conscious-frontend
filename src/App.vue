<template>  
  <v-app>
    <!-- <template v-if="this.currentUser">
        <Navbar></Navbar>
    </template> -->

    <v-content>      
      <router-view></router-view>      
    </v-content>
         
  </v-app>
</template>

<script> 
// import Navbar from '@/components/core/Navbar'
// import Foot from '@/components/core/Foot' 

export default {
  name: 'App',
  components: {
    // Navbar,
    // Foot
  },
  data: () => ({
  }), 

  // updated() { 
  //   console.log(`Updated fired at ${new Date()} ${this.$route.path}`);  
  //   if(!this.$store.getters.currentUser && this.$route.path != '/login'){ 
  //       this.$router.push('/login')
  //   } 
  // }    
};
</script>
