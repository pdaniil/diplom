<template>
  <div class="headLine">
    Позиции заказа №{{$route.params.order_id}}
  </div>
  <div class="head_row" >
    <div class="row_node"></div>
    <div class="row_node">
      Артикул
    </div>
    <div class="row_node">
      Брэнд
    </div>
    <div class="row_node">
      Цена
    </div>
    <div class="row_node hidden-xs">
      Количество
    </div>
    <div class="row_node hidden-xs">
      Доставка
    </div>
  </div>
  <div class="items" v-if="!this.onload">
      <div class="item" v-for="item in items" :key="item.id">
        <div class="table_row" >
          <div class="row_node"></div>
          <div class="row_node">
            {{item.article}}
          </div>
          <div class="row_node">
            {{item.brand}}
          </div>
          <div class="row_node">
            {{item.price}} руб.
          </div>
          <div class="row_node hidden-xs">
            {{item.count}} ед.
          </div>
          <div class="row_node hidden-xs">
            {{item.delivery_date.split(' ')[0]}}
          </div>
        </div>
      </div>
      <UserButton :type="'extra'" :text="'Задать вопрос по заказу'" @click="this.$router.push('/chat/' + $route.params.order_id)"></UserButton>
  </div>
  <div class="spin" v-else>
    <ProgressSpinner  />
  </div>
</template>

<script>
import ProgressSpinner from 'primevue/progressspinner';
import UserButton from "@/components/Header/User/LoginButton";
export default {
  name: "OrdersItemsPage",
  components: {
    UserButton,
    ProgressSpinner
  },
  data() {
    return {
      onload: true,
      items: []
    }
  },
  methods: {
    fetchOrderItems() {
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.$store.state.user.auth_token);

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("http://partshop.site/backend/public/api/orders_items/" + this.$route.params.order_id, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result);
            this.items = result.items;
            this.onload = false;
          })
          .catch(error => console.log('error', error));
    }
  },

  mounted() {
    this.fetchOrderItems();
  }

}
</script>

<style scoped>
  .headLine {
    text-align: center;
    font-size: 48px;
    color: var(--gray-800);
    font-weight: 300;
  }

  .spin {
    text-align: center;
  }

  .items {
    margin-top: 20px;
  }
  .head_row {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr repeat(5, 4fr) 1fr;
    padding: 12px;
    background: var(--green-100);
    margin-top: 10px;
    margin-left: 5px;
  }
  .table_row {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr repeat(5, 4fr) 1fr;
    padding: 12px;
    background: var(--gray-200);

  }
  .row_node {
    word-wrap: break-word;
    max-width: 120px;
    font-size: 18px;
    color: var(--gray-700);
    font-weight: 600;

  }
  .table_row {
    margin: 5px;
  }

</style>