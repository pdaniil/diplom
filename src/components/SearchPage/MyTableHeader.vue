<template>
  <div class="table__header">
    <div class="head_list">
      <div class="head_node">
        Артикул
      </div>
      <div class="head_node">
        Брэнд
      </div>
      <div class="head_node">
        Описание
      </div>
      <div class="head_node">
        Цена
      </div>
      <div class="head_node">
        Время доставки
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "MyTableHeader",
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
</style>