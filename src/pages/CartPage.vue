<template>
  <div class="card" style="margin-top: 50px; margin-bottom: 50px;">
    <Steps :model="items" :readonly="true" />
  </div>

  <router-view v-slot="{Component}" :formData="formObject" @prevPage="prevPage($event)" @nextPage="nextPage($event)" @complete="complete">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <div class="cart" v-if="this.$store.state.user.is_auth">
      <h3>Товары в корзине</h3>
      <div class="table__header">
        <div class="head_list">
          <div class="head_node">
          </div>
          <div class="head_node">
            Артикул
          </div>
          <div class="head_node">
            Брэнд
          </div>
          <div class="head_node hidden-xs" >
            Количество
          </div>
          <div class="head_node">
            Цена
          </div>
          <div class="head_node hidden-xs">
            Время доставки
          </div>
          <div class="head_node">
            Сумма
          </div>
        </div>
      </div>
      <div v-for="product in this.$store.state.cart.products" :key="product">
        <div class="table__row">
          <div class="table__node">
            <Checkbox :id="product" v-model="selectedProducts" name="products" :value="product"></Checkbox>
          </div>
          <div class="table__node">
            {{product.article}}
          </div>
          <div class="table__node">
              {{product.brand}}
          </div>
          <div class="table__node hidden-xs">
            {{product.count}}
          </div>
          <div class="table__node">
            {{product.price}} руб.
          </div>
          <div class="table__node hidden-xs">
            {{product.time}} дн.
          </div>
          <div class="table__node">
            {{product.price * product.count}} руб.
          </div>
        </div>

      </div>
      <div class="description">
        <div class="text">
          Всего позиций в корзине <strong>{{this.$store.state.cart.countProducts}}</strong> на сумму <strong>{{this.$store.state.cart.totalPrice}} руб.</strong>
        </div>
      </div>
      <div class="to_order" >
        <div class="to_order_button">
          <UserButton :text="'Оформить заказ'" :type="'confirm'" :icon="'pi pi-book'" @click="checkProducts"></UserButton>
        </div>
      </div>
  </div>
  <div class="not_auth" v-else>
      Вы не авторизованы
  </div>
  <Toast />
</template>

<script>
import UserButton from "@/components/Header/User/LoginButton";
export default {
  name: "CartPage",
  components: {
    UserButton
  },
  data() {
    return {
      selectedProducts: [],
      messages: [],
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
    }
  },
  methods: {
    showSuccess() {
      this.$toast.add({severity:'error', summary: 'Ошибка', detail:'Не выбрано ни одного товара', life: 3000});
    },
    checkProducts() {
        if (this.selectedProducts.length == 0)
          this.showSuccess()
        else
        {
          this.$store.dispatch('products', this.selectedProducts);
          this.$router.push('/cart/delivery');
        }

    },
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

<style>
.cart {
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.table__header {
}
.head_list {
  display: grid;
  grid-template-columns: 1fr repeat(5, 4fr) 1fr;
  background: var(--green-100);
  padding: 12px;
}
.table__row {
  display: grid;
  grid-template-columns: 1fr repeat(5, 4fr) 1fr;
  background: var(--gray-200);
  padding: 12px;
}
.head_node {
  font-size: 17px;
  cursor: pointer;
}

.description {
  display: flex;
  justify-content: flex-end;
  padding: 12px;
}

.to_order {
  display: flex;
  justify-content: flex-end;
  padding: 12px;
}

@media (max-width: 700px) {
  .hidden-xs {
    display: none;
  }
  .head_list {
    display: grid;
    grid-template-columns: 1fr repeat(3, 4fr) 1fr;
  }
  .table__row {
    display: grid;
    grid-template-columns: 1fr repeat(3, 4fr) 1fr;
    background: var(--gray-200);
    padding: 12px;
  }
  .card {
    display: none;
  }
}
</style>