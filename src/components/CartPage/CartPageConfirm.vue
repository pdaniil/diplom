<template>
  <div class="card" style="margin-top: 50px; margin-bottom: 50px;">
    <Steps :model="items" :readonly="true" />
  </div>

  <router-view v-slot="{Component}" :formData="formObject" @prevPage="prevPage($event)" @nextPage="nextPage($event)" @complete="complete">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>

  <div class="content_place_ordering">
    <div class="products" v-for="product in this.$store.state.ordering.products" :key="product">
        {{product.brand}}
    </div>
    <div class="nav_bottom">
      <UserButton :type="'extra'" :text="'Способ оплаты'" @click="this.$router.push('/cart/payment')"></UserButton>
      <UserButton :type="'confirm'" :text="'Подтвердить'" ></UserButton>
    </div>
  </div>
</template>

<script>
import UserButton from "@/components/Header/User/LoginButton";
export default {
  name: "CartPageConfirm",
  components: {UserButton},
  data() {
    return {
      items: [{
        label: 'Выбор товаров',
        to: '/cart'
      },
        {
          label: 'Способ доставки',
          to: '/cart/delivery'
        },
        {
          label: 'Способ оплаты',
          to: '/cart/payment'
        },
        {
          label: 'Подтверждение заказа',
          to: '/cart/confirm'
        }],
      formObject: {}
    }
  },
  methods: {
    nextPage(event) {
      for (let field in event.formData) {
        this.formObject[field] = event.formData[field];
      }

      this.$router.push(this.items[event.pageIndex + 1].to);
    },
    prevPage(event) {
      this.$router.push(this.items[event.pageIndex - 1].to);
    },
    complete() {
      this.$toast.add({severity:'success', summary:'Order submitted', detail: 'Dear, ' + this.formObject.firstname + ' ' + this.formObject.lastname + ' your order completed.'});
    }
  }
}
</script>

<style >
  .nav_bottom {
    display: flex;
  }
</style>