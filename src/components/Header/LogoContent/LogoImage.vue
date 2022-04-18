<template>
  <div class="logo__container">
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
  .logo__container {
    display: none;
  }
  @media (min-width: 1200px) {
    .logo__container {
      display: flex;
    }
  }
</style>