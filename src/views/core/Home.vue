<template>
  <v-content>
    <v-app
      id="dashboard-view"
      dark>
        <!-- <Toolbar />     -->
        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>

      <!-- <core-footer v-if="$route.name !== 'Maps'" /> -->

    </v-app>
  </v-content>
</template>

<script>
// @ is an alias to /src
// import Toolbar from '@/components/core/HomeToolbar'

export default {
  name: 'home',
  components: {
    // Toolbar
  }
}
</script>
