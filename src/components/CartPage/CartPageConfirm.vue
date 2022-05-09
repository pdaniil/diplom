<template>
  <div class="card" style="margin-top: 50px; margin-bottom: 50px;">
    <Steps :model="items" :readonly="true" />
  </div>

  <router-view v-slot="{Component}" :formData="formObject" @prevPage="prevPage($event)" @nextPage="nextPage($event)" @complete="complete">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>

  <div class="order_detail">
    <div class="detail_node detail_header">
     Детали заказа:
    </div>
      <div class="detail_node">
        <strong>Способ получения:</strong> {{this.$store.state.ordering.delivery}}
      </div>
    <div class="detail_node">
      <strong>Способ оплаты:</strong> {{this.$store.state.ordering.payment}}
    </div>

  </div>
  <div class="content_place_ordering">
    <div class="detail_node detail_header">
      Товары в заказе:
    </div>
      <div  class="products" v-for="product in this.$store.state.ordering.products" :key="product">
          <div class="table_row" >
            <div class="row_node">
              {{product.article}}
            </div>
            <div class="row_node">
              {{product.brand}}
            </div>
            <div class="row_node">
              {{product.price}} руб.
            </div>
            <div class="row_node hidden-xs">
              {{product.count}} ед.
            </div>
            <div class="row_node hidden-xs" v-if="product.time > 0">
              {{product.time}} дн.
            </div>
            <div class="row_node hidden-xs" v-else>
              На складе
            </div>
        </div>
      </div>
      <div class="detail_node">
        <strong>Всего позиций в заказе:</strong> {{this.$store.state.ordering.products.length}}, на сумму {{this.totalPrice}} руб.
      </div>
      <div class="nav_bottom" v-if="!this.onOrderCreating">
        <UserButton :type="'extra'" :text="'Способ оплаты'" @click="this.$router.push('/cart/payment')"></UserButton>
        <UserButton :type="'confirm'" :text="'Подтвердить'" @click="sendOrder()" ></UserButton>
      </div>
      <ProgressSpinner v-else />
  </div>
</template>

<script>
import UserButton from "@/components/Header/User/LoginButton";
import ProgressSpinner from 'primevue/progressspinner';
import Cart from "@/classes/Cart";
export default {
  name: "CartPageConfirm",
  components: {UserButton, ProgressSpinner},
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
      totalPrice: 0,
      onOrderCreating: false
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
    fetchCreateItem( order_id, product ) {
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.$store.state.user.auth_token);
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      let urlencoded = new URLSearchParams();
      urlencoded.append("order_id", order_id);
      urlencoded.append("storage", product.storage);
      urlencoded.append("delivery", product.time);
      urlencoded.append("article", product.article);
      urlencoded.append("brand", product.brand);
      urlencoded.append("title", product.description);
      urlencoded.append("price", product.price);
      urlencoded.append("count", product.count);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      return fetch("http://partshop.site/backend/public/api/order/items/create", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('Ошибка при создании позиции заказа в бд', error));
    },
    fetchCreateOrder( order ) {
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.$store.state.user.auth_token);
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      let urlencoded = new URLSearchParams();
      urlencoded.append("customer_id", this.$store.state.user.id);
      urlencoded.append("payment", order.payment);
      urlencoded.append("delivery", order.delivery);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };
      let arr = [];
      fetch("http://partshop.site/backend/public/api/order/create", requestOptions)
          .then(response => response.json())
          .then(result => {
             this.$store.state.ordering.products.forEach( (el) => {
                  this.$store.dispatch('deleteProductFromCart', el);
                  Cart.updateCarts(this.$store.state.user.id, this.$store );
                  arr.push(this.fetchCreateItem( result.order.id, el ));
                 }
             );
             Promise.all( arr ) . then(() => { this.$router.push('/order_created') });
          })
          .catch(error => console.log('Ошибка при создании заказа в бд', error));
    },
    sendOrder() {
      this.onOrderCreating = true;
      let order = {
        payment: this.$store.state.ordering.payment,
        delivery: this.$store.state.ordering.delivery
      };

      this.fetchCreateOrder(  order );

    }
  },
  mounted() {
    this.$store.state.ordering.products.forEach((el) => {
      this.totalPrice += el.price * el.count;
    });
  }
}
</script>

<style >
  .detail_header {
    font-size: 20px !important;
    color: var(--gray-800) !important;
  }
  .nav_bottom {
    display: flex;
  }
  .detail_node {
    padding: 20px;
    color: var(--gray-700);
    font-weight: 500;
    font-size: 18px;
  }
  .products {
    margin-top: -20px;
    padding: 20px;
    color: var(--gray-700);
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
  }
  .table_row {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 4fr) 1fr;
    padding: 12px;
  }
  .row_node {
    word-wrap: break-word;
    max-width: 120px;

  }

  @keyframes p-progress-spinner-color {
    100%,
    0% {
      stroke: #d62d20;
    }
    40% {
      stroke: #0057e7;
    }
    66% {
      stroke: #008744;
    }
    80%,
    90% {
      stroke: #ffa700;
    }
  }
</style>