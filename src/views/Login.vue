<template>
  <div class="login">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Login msg="Login"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/accounts/Login.vue'

export default {
  name: 'login',
  components: {
    Login
  }
}
</script>
