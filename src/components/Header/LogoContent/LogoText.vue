<template>
  <div  class="component component-fullscreen">
    <div class="text-8xl part">Part</div>
    <div class="text-8xl text-green-300 shop">Shop</div>
  </div>
  <div  class="component component-middlescreen">
    <div  class="text-8xl part">Part</div>
    <div  class="text-8xl text-green-300 shop">Shop</div>
  </div>
  <div  class="component component-smallscreen">
    <div class="text-6xl part">Part</div>
    <div class="text-6xl text-green-300 shop">Shop</div>
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
  .component-fullscreen {
    display: none;
  }
  .component-middlescreen {
    display: none;
  }
  .component-smallscreen {
    margin-top: -10px;
    display: none;
  }
  .part {
    border-bottom: 2px solid var(--green-300) !important;
  }
  .shop {
    border-bottom: 2px solid var(--gray-800) !important;
  }

  @media (min-width: 1100px) {
    .component-fullscreen {
      display: flex;
    }
    .component-middlescreen {
      display: none;
    }
    .component-smallscreen {
      display: none;
    }
  }
  @media (max-width: 1100px) and (min-width: 700px) {
    .component-fullscreen {
      display: none;
    }
    .component-middlescreen {
      display: flex;
    }
    .component-smallscreen {
      display: none;
    }
  }
  @media (max-width: 700px) {
    .component-fullscreen {
      display: none;
    }
    .component-middlescreen {
      display: none;
    }
    .component-smallscreen {
      display:  flex;
    }
  }

</style>