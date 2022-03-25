<template>
  <div v-if="this.$store.state.screenState.fullScreen" class="component component-fullscreen">
    <div class="text-8xl part">Part</div>
    <div class="text-8xl text-green-300 shop">Shop</div>
  </div>
  <div v-if="this.$store.state.screenState.middleScreen" class="component component-middlescreen">
    <div  class="text-8xl part">Part</div>
    <div  class="text-8xl text-green-300 shop">S</div>
  </div>
  <div v-if="this.$store.state.screenState.smallScreen"  class="component component-smallscreen">
    <div  class="text-8xl part">P</div>
    <div  class="text-8xl text-green-300 shop">S</div>
  </div>
</template>

<script>
export default {
  name: "LogoText",
  data() {
    return {
    }
  },

  watch: {
  },
}
</script>

<style scoped>
  .component {
    display: flex;
    align-items: flex-end;

  }
  .part {
    border-bottom: 2px solid var(--green-300) !important;
  }
  .shop {
    border-bottom: 2px solid var(--gray-800) !important;
  }

</style>