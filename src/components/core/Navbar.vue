<template>
<v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
    <v-toolbar-title style="width: 500px" class="ml-0 pl-4">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">Mobile Card Distribution Management System</span>
    </v-toolbar-title>
    <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-btn icon>
        <v-icon>mdi-apps</v-icon>
    </v-btn>
    <v-btn icon>
        <v-icon>mdi-bell</v-icon>
    </v-btn>
    <router-link to="/logout">
        <v-btn class="mx-5" icon large>Logout</v-btn>
    </router-link>
      <!-- <router-link to="/logout" class="btn btn-logout btn-sm">Logout</router-link> -->
      <!-- <v-btn class="mx-5" icon large @click="logout">
        Logout
      </v-btn> -->
    </v-app-bar>
</template>

<script> 
    export default {
        name: 'Navbar'         
    }
</script>