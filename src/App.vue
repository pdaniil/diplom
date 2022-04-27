<template>
  <div class="page">
    <div class="top_content">
      <Header @login="loginUser" @logout="logoutUser"></Header>
      <div class="article">
        <router-view />
      </div>
      <CartModule v-if="this.$store.state.user.is_auth"></CartModule>
    </div>
    <div class="">&nbsp;</div>
    <div class="footer_content">
      <MyFooter></MyFooter>
    </div>
  </div>
</template>
<script>


import Header from "@/components/Header/Header";
import User from "@/classes/User";
import CartModule from "@/components/CartPage/CartModule";
import MyFooter from "@/components/Footer/MyFooter";
export default {
  name: 'App',
  components: {MyFooter, CartModule, Header},
  data(){
    return {
        user: User,
        user2: User
    }
  },
  methods: {
      fetchLoguot(){

      },
      loginUser( token ) {
          this.user.login( token );
      },
      logoutUser() {
          this.user.logout();
      }
  },
  mounted() {
      this.user = new User( this.$store );
  },
}
</script>

<style>
  html, body {
      height: 100%;
  }

  * {
    font-family: 'Roboto', sans-serif;
  }
  #app {
    display: flex;
    justify-content: center;
    height: 100%;
  }
  .page {
    max-width: 100%;
    width: 1400px;
    min-height: 100%;
    display: grid;
    grid-template-rows: 1fr auto;
  }
  .top_content {
    
  }
  .footer_content {
    grid-row-start: 3;
    grid-row-end: 4;
  }

</style>
