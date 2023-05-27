<template>
  <div id="app">
      <router-view />
  </div>
</template>

<script>
export default {
  mounted(){
      var user = this.currentUser;
      console.log('user', user)
      if (user){
        console.log('user', user)
        this.$router.push('/bookmark');
      }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    // showAdminBoard() {
    //   if (this.currentUser && this.currentUser['roles']) {
    //     return this.currentUser['roles'].includes('ROLE_ADMIN');
    //   }

    //   return false;
    // },
    // showModeratorBoard() {
    //   if (this.currentUser && this.currentUser['roles']) {
    //     return this.currentUser['roles'].includes('ROLE_MODERATOR');
    //   }

    //   return false;
    // }
  },
  methods: {
    logOut() {
      // this.$store.dispatch('auth/logout');
      // this.$router.push('/login');
    }
  }
};
</script>
