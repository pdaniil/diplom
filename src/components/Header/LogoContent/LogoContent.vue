<template>
  <div class="logo__content">
    <logo-image></logo-image>
    <logo-text></logo-text>
  </div>
</template>

<script>
import LogoImage from "@/components/Header/LogoContent/LogoImage";
import LogoText from "@/components/Header/LogoContent/LogoText";
export default {
  name: "LogoContent",
  components: {LogoText, LogoImage}
}
</script>

<style scoped>
  .logo__content {
    display: flex;
    justify-content: space-between;
  }
  .logo__content .logo__container {

  }
</style>