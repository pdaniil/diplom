<template>
  <div class="headLine">
    Список заказов
  </div>
  <div class="orders" v-if="!this.onload && orders.length > 0">
      <div class="order" v-for="order in orders" :key="order.id" @click="this.$router.push('/order_items/' + order.id)" >

        <Card>
          <template #title>
            Заказ номер  {{order.id}}
          </template>
          <template #subtitle>
              {{order.status}}
          </template>
          <template #content>
            <div class="order_property">
              {{ order.payment }}
            </div>
            <div class="order_property">
              Всего к оплате {{ order.sum }} руб.
            </div>
            <div class="order_property">
              {{ order.delivery }}
            </div>
            <div class="order_property">
              Предполагаемая дата получения {{ order.receive_time.split(' ')[0] }}
            </div>
          </template>
        </Card>

      </div>
  </div>
  <div class="spin" v-else-if="this.$store.state.user.is_auth && this.onload">
    <ProgressSpinner  />
  </div>
  <div class="spin" v-if="!this.$store.state.user.is_auth">
    Вы не авторизованны
  </div>

  <div class="spin" v-if="this.$store.state.user.is_auth && !this.onload && this.orders.length == 0">
    У Вас пока нет заказов
  </div>
</template>

<script>
import ProgressSpinner from 'primevue/progressspinner';
export default {
  name: "OrdersPage",
  components: {
      ProgressSpinner
  },
  data() {
    return {
        orders: [],
        onload: true
    }
  },
  methods: {
      fetchCustomerOrders( user_id ) {
          console.log('Запрос на Получение списка заказов пользователя id ' + user_id);

          let myHeaders = new Headers();
          myHeaders.append("Accept", "application/json");
          myHeaders.append("Authorization", "Bearer " + this.$store.state.user.auth_token);

          let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };

          fetch("http://partshop.site/backend/public/api/orders", requestOptions)
              .then(response => response.json())
              .then(result => {
                console.log('Ответ сервера');
                console.log(result);
                console.log('Конец запроса');
                this.onload = false;
                this.ordersProcessing( result.orders );
              })
              .catch(error => console.log('error', error));
      },
      getOrders() {
        console.log('Страрт получения заказов при загрузке компонента');
        if (this.$store.state.user.is_auth){
          console.log( 'Пользователь авторизован, отправляем запрос серверу' );
          this.fetchCustomerOrders( this.$store.state.user.id );
        }
      },

      ordersProcessing( orders ) {
          orders.forEach((el) => {
            this.orders.push( el );
          });
      }

  },
  mounted() {
    if (this.$store.state.user.is_auth)
        this.getOrders();
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

  .orders {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .order {
    max-width: 400px;
    margin: 20px;
    cursor: pointer;
    animation: out 0.2s ease-in-out;
  }
  @keyframes pulse {
      from { transform: scale(1) }
      to { transform: scale(1.1) }
  }
  @keyframes out {
    from { transform: scale(1.1) }
    to { transform: scale(1) }
  }
  .order:hover {
      transform: scale(1.1);
      animation: pulse 0.2s ease-in-out;
  }

  .order .p-card {
    min-height: 250px;
  }
 .order_property {
    min-height: 30px;
  }

 .spin {
   text-align: center;
 }
</style>