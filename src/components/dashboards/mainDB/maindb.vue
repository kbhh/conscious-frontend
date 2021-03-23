<template>
    <div>

        <v-app-bar
            dense
            color="blue white--text darken-1"
            dark

        >
            <v-app-bar-nav-icon v-on:click='side_bar = !side_bar' > <v-icon>dehaze</v-icon> </v-app-bar-nav-icon>
             <v-toolbar-title style="width: 500px" class="ml-0 pl-4">

                <span class="hidden-sm-and-down">Admin Dashboard</span>
            </v-toolbar-title>
            <!-- <v-app-bar-title class="pa-5 " >Admin Dashboard</v-app-bar-title> -->

            <v-spacer></v-spacer>
             <v-menu
        bottom :offset-y="offset"
         :nudge-width="200"
      >
        <template v-slot:activator="{ on}">
            <v-btn  icon
              v-on="on">
                  <v-avatar class="white" size="32">
                      <v-icon color="primary">person</v-icon>
                  </v-avatar>
                  
            </v-btn>
        
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in vmenuitem"
            :key="index"
            router :to="item.link"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
          <v-btn class="mx-5" icon large @click="logout">
                Logout
            </v-btn>
        </v-list>

     </v-menu>
        </v-app-bar>

        <v-navigation-drawer
            app
            floating
            mini-variant
            mini-variant-width="220"
            fixed
            v-model="side_bar"
            color="rgb(35,47,62) "
            dark

        >
        <v-list-item>
                        <p>Company Logo</p>
                        </v-list-item>
                    <v-divider></v-divider>
                    <v-list >
                      <v-list-item v-for="item in items"
                            :key="item.title"
                            link
                            :href="item.link"
                        >
                        <v-list-item-content>
                          <v-icon class="mb-2">{{ item.icon }}</v-icon>
                          <v-list-item-subtitle align="center">{{ item.title }}</v-list-item-subtitle>
                        </v-list-item-content>

                      </v-list-item>

                    </v-list>
        </v-navigation-drawer>

        <v-content class="pa-5 " style="background-color:rgb(236,240,245);">
            <v-container fluid >
                <router-view></router-view>
            </v-container>
        </v-content>

    </div>
</template>

<script>
export default {
    data : ()=>{
        return {
            side_bar:true,
            offset: true,
            items: [
                { title: 'Dashboard', icon: 'mdi-gauge-full',link:'/reb-admin/' },
                { title: 'Profile', icon: 'mdi-account-circle',link:'/reb-admin/profile/' },
                 { title: 'Users', icon: 'group' , link:'/reb-admin/users/'},
            ],
            vmenuitem: [
        { title: 'My Profile', link:'/reb-admin/profile/' },

        { title: 'Logout', link:'/logout' },
      ],
        }
    },
        methods:{
        async logout()
        {
            localStorage.clear()
            this.$router.push('/')
        },
    }

}
</script>
