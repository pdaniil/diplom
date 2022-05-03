<template>
  <div class="card" style="margin-top: 50px; margin-bottom: 50px;">
    <Steps :model="items" :readonly="true" />
  </div>

  <router-view v-slot="{Component}" :formData="formObject" @prevPage="prevPage($event)" @nextPage="nextPage($event)" @complete="complete">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <h3>Выберите способ оплаты</h3>
  <div class="content_place_ordering">
      <div class="payment">
        <div class="payment_node">
          <RadioButton name="delivery" value="Наличными при получении" v-model="paymentType" @click="this.$store.dispatch('payment', 'Наличными при получении');" /> Наличными при получении
        </div>
        <div class="payment_node">
          <RadioButton name="delivery" value="Картой при получении" v-model="paymentType" @click="this.$store.dispatch('payment', 'Картой при получении');" /> Картой при получении
        </div>
      </div>
    <div class="nav_bottom">
      <UserButton :type="'extra'" :text="'Способ доставки'" @click="this.$router.push('/cart/delivery')"></UserButton>
      <UserButton :type="'confirm'" :text="'Подтверждение'" @click="this.$router.push('/cart/confirm')"></UserButton>
    </div>
  </div>

</template>

<script>
import UserButton from "@/components/Header/User/LoginButton";
export default {
  name: "CartPagePayment",
  components: {UserButton},
  data() {
    return {
      paymentType: 'Наличными при получении',
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
  },
  mounted() {
  }
}
</script>

<style >
  .payment_node .p-radiobutton .p-radiobutton-box.p-highlight {
    border-color: var(--green-200) !important;
    background: var(--green-300) !important;
  }
  .payment_node .p-radiobutton .p-radiobutton-box .p-radiobutton-icon {
    background-color: var(--green-600);
  }
  .payment_node .p-radiobutton:hover .p-radiobutton-box  {
    border-color: var(--green-400) !important;
  }
  .payment_node .p-radiobutton .p-radiobutton-box:not(.p-disabled).p-focus {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: 0 0 0 0.1rem var(--green-300);
    border-color: black;
  }

  .payment_node {
    padding: 20px;
    color: var(--gray-700);
    font-weight: 500;
    font-size: 18px;
  }


</style>