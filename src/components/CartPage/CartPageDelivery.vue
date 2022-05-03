<template>
  <div class="card" style="margin-top: 50px; margin-bottom: 50px;">
    <Steps :model="items" :readonly="true" />
  </div>

  <router-view v-slot="{Component}" :formData="formObject" @prevPage="prevPage($event)" @nextPage="nextPage($event)" @complete="complete">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <h3>Выберите способ доставки</h3>
  <div class="content_place_ordering">
    <div class="delivery">
      <div class="delivery_node">
        <RadioButton name="delivery" value="Самовывоз" v-model="deliveryType"  @click="this.$store.dispatch('delivery', 'Самовывоз'); this.onSimpleDelivery = false;" /> Самовывоз
        <div class="node_description">
          Забрать товар можно будтет в одной из указанных точек выдачи нашего магазина.
        </div>
      </div>
      <div class="delivery_node">
        <RadioButton name="delivery" value="Доставка по адресу" v-model="deliveryType" @click="this.onSimpleDelivery = true;"/> Доставка по адресу
        <div class="node_description">
          Выберите адрес на карте:
          <br>
          <br>
          <YandexMap></YandexMap>
        </div>
      </div>
    </div>

    <div class="nav_bottom">
      <UserButton :type="'extra'" :text="'В корзину'" @click="this.$router.push('/cart')"></UserButton>
      <UserButton :type="'confirm'" :text="'Способ оплаты'" @click="checkOnSimpleDelivery()"></UserButton>
    </div>
    <Toast />
  </div>

</template>

<script>
import UserButton from "@/components/Header/User/LoginButton";
import YandexMap from "@/components/CartPage/YandexMap";
export default {
  name: "CartPageDelivery",
  components: { UserButton, YandexMap },
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
      formObject: {},
      deliveryType: 'Самовывоз',
      onSimpleDelivery: false
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
    },
    checkOnSimpleDelivery() {
      if (this.onSimpleDelivery  && (this.$store.state.ordering.delivery == 'Самовывоз'))
      {
        this.$toast.add({severity:'warn', summary: 'Внимание', detail:'Укажите адрес доставки на карте', life: 3000});
      }
      else {
        this.$router.push('/cart/payment')
      }

    }
  },
  mounted() {
    this.$store.dispatch('delivery', 'Самовывоз');
  }
}
</script>

<style>
  .delivery_node {
    padding: 20px;
    color: var(--gray-700);
    font-weight: 500;
    font-size: 18px;
  }
  .node_description {
    padding: 20px;
    font-size: 16px;
    color: black;
    font-weight: 400;
  }
  .content_place_ordering {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 300px;
  }
  .delivery_node .p-radiobutton .p-radiobutton-box.p-highlight {
      border-color: var(--green-200) !important;
      background: var(--green-300) !important;
  }
  .delivery_node .p-radiobutton .p-radiobutton-box .p-radiobutton-icon {
    background-color: var(--green-600);
  }
  .delivery_node .p-radiobutton:hover .p-radiobutton-box  {
    border-color: var(--green-400) !important;
  }
  .delivery_node .p-radiobutton .p-radiobutton-box:not(.p-disabled).p-focus {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: 0 0 0 0.1rem var(--green-300);
    border-color: black;
  }
  .nav_bottom {
    display: flex;
    justify-content: center;
  }
</style>