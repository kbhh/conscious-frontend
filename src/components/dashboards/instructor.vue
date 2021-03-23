<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-img src="@/assets/sidebar.jpg" height="100%" >
        <v-list-item >
          <v-list-item-avatar
            color="white"
          >           
          </v-list-item-avatar>
          <v-list-item-title class="title">
           {{ name}}
          </v-list-item-title>
        </v-list-item>
        <v-divider/>
        <v-list dense rounded>
          <template v-for="item in items">
            <v-row
              v-if="item.heading"
              :key="item.heading"
              align="center" 
            > 
            </v-row>
            <v-list-group
              v-else-if="item.children"
              :key="item.text"
              v-model="item.model"
              :prepend-icon="item.model ? item.icon : item['icon-alt']"
              append-icon=""
              active-class="success"
            >
              <template v-slot:activator>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.text }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-group>
            <v-list-item
              v-else
              :key="item.text"
              :to="item.urls === '#' ? '' : item.urls" 
              active-class=""
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-img> 
    </v-navigation-drawer>

    <!-- Navigation Bar -->
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-toolbar-title style="width: 500px" class="ml-0 pl-4">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">Conscious Brains</span>
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

    <!-- Main Content Area -->
    <router-view></router-view>    
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    }, 
    data: () => ({
      name: JSON.parse(localStorage.loggedInUser).name,
      text:'',
      search:'',
      drawer: null,
      item: 0,
      items: [
        { icon: 'person', text: 'Dashboard', urls:'/instructor' },                 
        { icon: 'person', text: 'My Profile ', urls:'/instructor/profile' },
        { icon: 'person', text: 'Register Student', urls:'/instructor/marks' }
      ]
    }),
    methods: { 
      logout(){
        this.$store.dispatch('logout');
        localStorage.clear();
        this.$router.push('/');
      }      
    }    
  }
</script>
<style>
.row td {
   cursor: pointer;
}
.dataTable {
   font-size: 15px !important;
}

/* also tried table.v-table thead tr th { . */
table.v-table tbody tr td {
  font-size: 16px;
  height: 15px;
  padding: 0px;
}
</style>