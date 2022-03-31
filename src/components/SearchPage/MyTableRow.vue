<template>
  <div class="table_row" :class="{dark: !product.darkBack}">
      <div class="row_node">
        {{product.article}}
      </div>
      <div class="row_node">
        {{product.brand}}
      </div>
      <div class="row_node">
        {{product.description}}
      </div>
      <div class="row_node">
        {{product.price}}
      </div>
      <div class="row_node">
        {{product.time}}
      </div>

      <div class="user_bar">
          <i clas="pi pi-check"></i>
      </div>
  </div>
</template>

<script>
import Product from "@/classes/Product";

export default {
  props: {
      product: Product
  },
  name: "MyTableRow"
}
</script>

<style scoped>
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
</style>