<template>
  <div class="user_bar">
    <div class="btn-cart">
      <Button @click="this.$emit('shop')" icon="pi pi-shopping-cart" class="p-button-outlined"></Button>
    </div>
    <Button @click="this.$emit('modal')" icon="pi pi-info" class="p-button-outlined p-button-rounded "></Button>
  </div>
</template>

<script>
export default {
  name: "MyTableRowUserBar"
}
</script>

<style>
  .user_bar {
    display: grid;
    grid-template-columns: 4fr 4fr;
  }
  .user_bar .p-button {
    border: 2px solid var(--blue-300) !important;
    width: 25px !important;
    height: 25px !important;
  }
  .user_bar .p-button .p-button-icon {
    color: var(--blue-300) !important;
    font-size: 1rem !important;
  }
  .user_bar .btn-cart .p-button {
    border: 0px solid var(--blue-300) !important;
    width: 25px !important;
    height: 25px !important;
  }
  .user_bar .btn-cart  .p-button .p-button-icon {
    color: var(--green-500) !important;
    font-size: 1.5rem !important;
  }
</style>