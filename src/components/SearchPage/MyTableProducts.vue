<template>
  <div>
    <h3><slot></slot></h3>
    <div class="table__products">
      <MyTableHeader></MyTableHeader>
      <div class="table__body">
        <MyTableRow v-for="product in products" :key="product" :product="product"></MyTableRow>
      </div>
    </div>
  </div>
</template>

<script>

import MyTableHeader from "@/components/SearchPage/MyTableHeader";
import MyTableRow from "@/components/SearchPage/MyTableRow";
export default {
  name: "MyTableProducts",
  props: {
    products: Array
  },
  components: {
    MyTableHeader, MyTableRow
  },
}
</script>

<style scoped>

</style>