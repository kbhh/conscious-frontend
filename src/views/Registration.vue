<template>
  <div class="register">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Registration msg="Hotel Account Registration"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Registration from '@/components/accounts/Registration.vue'

export default {
  name: 'register',
  components: {
    Registration
  }
}
</script>
