<template>
  <div class="cart" v-if="this.$store.state.user.is_auth">
      <h3>Товары в корзине</h3>
      <div v-for="product in this.$store.state.cart.products" :key="product">
        {{product.brand}}
      </div>
      Всего товаров в корзине {{this.$store.state.cart.countProducts}} на сумму {{this.$store.state.cart.totalPrice}} руб.
  </div>
  <div class="not_auth" v-else>
      Вы не авторизованы
  </div>
</template>

<script>

export default {
  name: "CartPage",
  data() {
    return {

    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>