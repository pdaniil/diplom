<template>
  <div class="logo__container" v-if="this.$store.state.screenState.fullScreen">
    <img @click="$router.push('/')" class="logo" src="../../../assets/logo_true.png" alt="">
  </div>
</template>

<script>
export default {
  name: "LogoImage"
}
</script>

<style scoped>
  .logo {
    width: 120px;
  }
</style>