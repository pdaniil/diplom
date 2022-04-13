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
</template>

<script>
import Product from "@/classes/Product";
import MyTableRowUserBar from "@/components/SearchPage/MyTableRowUserBar";
import MyDialog from "@/components/SearchPage/MyDialog";

export default {
  components: {MyDialog, MyTableRowUserBar},
  props: {
      product: Product,
      darkBack: Boolean
  },
  data() {
    return {
      countForOrder: 0,
      modalShow: false
    }
  },
  methods: {
    toCart() {
        this.modalShow = false;
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

    .dark {
      background: var(--gray-300);
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