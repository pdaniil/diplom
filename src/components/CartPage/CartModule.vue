<template>
    <div class="cart_module" @click="this.$router.push('/cart')">
      <i class="pi pi-shopping-cart" style="font-size: 2.5rem" v-badge.success="this.$store.state.cart.countProducts"></i>
    </div>

</template>

<script>
export default {
  name: "CartModule",
}
</script>

<style scoped>
    .cart_module {
      position: fixed;
      bottom: 5%;
      right: 5%;
      background: rgba(78, 160, 43, 0.4);
      color: var(--green-800);
      border: 1px solid green;
      border-radius: 50%;
      padding: 15px;
      animation: pulse infinite 3s ease-in-out;
      z-index: 999;
      cursor: pointer;
    }
    .cart_module i {
        font-size: 14px;
    }

    @keyframes pulse {
      from { transform: scale(1) }
      50% {transform: scale(1.2)}
      to {transform: scale(1)}
    }
</style>