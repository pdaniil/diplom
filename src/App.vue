<template>
  <div class="page">
    <Header @login="loginUser" ></Header>
    <div class="article">
      <router-view />
    </div>
  </div>
</template>
<script>


import Header from "@/components/Header/Header";
import User from "@/classes/User";
export default {
  name: 'App',
  components: {Header},
  data(){
    return {
        user: User
    }
  },
  methods: {
      loginUser( token ) {
          this.user.login( token );
          this.$store.dispatch('loginUser', token);
      },
      logoutUser() {
          this.user.logout();
      }
  },
  mounted() {
      this.user = new User();
      if (this.user.tryInit())
        this.$store.dispatch( 'loginUser', this.user.token );
      else
        console.log('not auth');
  },
}
</script>

<style>
  * {
    font-family: 'Roboto', sans-serif;
  }
  #app {
    display: flex;
    justify-content: center;
  }
  .page {
    display: flex;
    max-width: 100%;
    width: 1400px;
    flex-direction: column;
  }

</style>
