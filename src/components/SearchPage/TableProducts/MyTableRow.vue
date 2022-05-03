<template>
  <div class="table_row" :class="{dark: !darkBack}">
      <div class="row_node">
        {{product.article}}
      </div>
      <div class="row_node">
        {{product.brand}}
      </div>
      <div class="row_node hidden-xs">
        {{product.exist}}
      </div>
      <div class="row_node">
        {{product.price + ' руб.'}}
      </div>
      <div class="row_node hidden-xs" v-if="product.time > 0">
        {{product.time}} дн.
      </div>
      <div class="row_node hidden-xs" v-else>
        На складе
      </div>
      <MyTableRowUserBar @shop="toCart" @modal="this.modalShow = true"></MyTableRowUserBar>
  </div>
  <MyDialog :display="modalShow" :product="product" @hideDialog="this.modalShow = false" @shop="toCart">
    Карточка товара
  </MyDialog>
  <Dialog
      header="Header" v-model:visible="alertShow"
      :draggable="false"
      :modal="true"
      :dismissableMask="true"
      :style="{width: '500px'}">
    <template #header>
      <div class="dialog__header">
        <span v-if="!this.$store.state.user.is_auth">Операция отклонена</span>
        <span v-else>Укажите количество товара</span>
      </div>
    </template>
    <div class="dialog__content" >
      <div v-if="this.$store.state.user.is_auth">
        <InputNumber
                     v-model="countProduct"
                     showButtons
                     buttonLayout="horizontal"
                     decrementButtonClass="p-button-danger"
                     incrementButtonClass="p-button-success"
                     incrementButtonIcon="pi pi-plus"
                     decrementButtonIcon="pi pi-minus"
                     step="1"
                     :min="1"
                     :max="this.product.exist"
        />
      </div>

      <div v-else>
        Покупка товара доступна только авторизованным пользователям.
      </div>
    </div>
    <template #footer>
      <div class="dialog__footer">
        <Button v-if="!this.$store.state.user.is_auth" @click="this.alertShow = false" icon="pi pi-times" label="Понятно" class="p-button-secondary" style="margin-left: .5em" />
        <Button v-else icon="pi pi-check" label="Подтвердить" @click="putProductToCart" class="p-button-success" style="margin-left: .5em" />
      </div>
    </template>
  </Dialog>
</template>

<script>
import Product from "@/classes/Product";
import Cart from "@/classes/Cart";
import MyTableRowUserBar from "@/components/SearchPage/TableProducts/MyTableRowUserBar";
import MyDialog from "@/components/SearchPage/DialogProduct/MyDialog";

export default {
  components: {MyDialog, MyTableRowUserBar},
  props: {
      product: Product,
      darkBack: Boolean
  },
  data() {
    return {
      countForOrder: 0,
      modalShow: false,
      alertShow: false,
      countProduct: 1
    }
  },
  methods: {
    toCart() {
        this.alertShow = true;
        this.modalShow = false;
    },
    //Кладём товар в корзину
    putProductToCart() {
        let productToCart = {
          article: this.product.article,
          brand: this.product.brand,
          description: this.product.description,
          storage: this.product.storage,
          time: this.product.time,
          price: this.product.price,
          count: this.countProduct
        };
        this.$store.dispatch( 'pushProductToCart',  productToCart);
        Cart.updateCarts( this.$store.state.cart.user_id, this.$store );
        this.alertShow = false;
    }
  },
  name: "MyTableRow"
}
</script>

<style>
    .table_row {
      display: grid;
      grid-template-columns: repeat(5, 4fr) 1fr;
      padding: 12px;
    }
    .row_node {
      word-wrap: break-word;
      max-width: 120px;

    }
    .p-inputnumber-input {
      text-align: center;
    }
    .dark {
      background: var(--gray-300);
    }
    .dialog__footer {
      margin-top: 20px;
    }
    .dialog__footer .p-button {
      margin-left: 5px !important;
      padding: 12px 20px;

    }
    .dialog__header {
      font-size: 25px;
      color: var(--green-600);
      display: flex;
      justify-content: center;
    }
    .dialog__content {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .dialog__content .p-inputtext:enabled:focus {
      border: 1px solid var(--green-400);
      box-shadow: 0px 0px 2px var(--green-400);
    }
    .dialog__content .p-inputtext:enabled:hover {
      border: 1px solid var(--green-400);
      box-shadow: 0px 0px 5px var(--green-400);
    }
    @media (max-width: 700px) {
      .hidden-xs {
        display: none;
      }
      .table_row {
        display: grid;
        grid-template-columns: repeat(3, 4fr) 1fr;
        padding: 12px;
      }
    }
</style>