<template>
  <div class="table__header">
    <div class="head_list">
      <div class="head_node">
        Артикул
      </div>
      <div class="head_node" @click="this.$store.dispatch('sort',{table: table, handler: sortByBrand})">
        Брэнд
      </div>
      <div class="head_node hidden-xs" @click="this.$store.dispatch('sort',{table: table, handler: sortByExist})">
        Количество
      </div>
      <div class="head_node" @click="this.$store.dispatch('sort',{table: table, handler: sortByPrice})">
        Цена
      </div>
      <div class="head_node hidden-xs" @click="this.$store.dispatch('sort', {table: table, handler: sortByDate})">
        Время доставки
      </div>
    </div>
  </div>
</template>

<script>


export default {
  props: {
    table: String
  },
  name: "MyTableHeader",
  methods: {
    sortByPrice( stateObj ) {
      stateObj.direction = stateObj.byPrice ? !stateObj.direction : true;
      stateObj.byPrice = true;
      stateObj.byBrand = false;
      stateObj.byDate = false;
      stateObj.byExist = false;
      return stateObj;
    },
    sortByBrand( stateObj) {
      stateObj.direction = stateObj.byBrand ? !stateObj.direction : true;
      stateObj.byPrice = false;
      stateObj.byBrand = true;
      stateObj.byDate = false;
      stateObj.byExist = false;
      return stateObj;
    },
    sortByExist( stateObj ) {
      stateObj.direction = stateObj.byExist ? !stateObj.direction : true;
      stateObj.byPrice = false;
      stateObj.byBrand = false;
      stateObj.byDate = false;
      stateObj.byExist = true;
      return stateObj;
    },
    sortByDate( stateObj ) {
      stateObj.direction = stateObj.byDate ? !stateObj.direction : true;
      stateObj.byPrice = false;
      stateObj.byBrand = false;
      stateObj.byDate = true;
      stateObj.byExist = false;
      return stateObj;
    },
  },
  mounted() {
  }
}
</script>

<style>
  .table__header {
  }
  .head_list {
    display: grid;
    grid-template-columns: repeat(5, 4fr) 1fr;
    background: var(--green-100);
    padding: 12px;
  }

  .head_node {
    font-size: 17px;
    cursor: pointer;
  }

  @media (max-width: 700px) {
    .hidden-xs {
      display: none;
    }
    .head_list {
      display: grid;
      grid-template-columns: repeat(3, 4fr) 1fr;
    }
  }

</style>