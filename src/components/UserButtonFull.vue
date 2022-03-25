<template>
  <div class="component">
    <Button   icon="pi pi-user" class="p-button-primary p-button-outlined p-button-rounded" v-tooltip.bottom="'Вход/Регистрация'"/>
    <Button   icon="pi pi-envelope" class="p-button-success p-button-outlined p-button-rounded"/>
  </div>
</template>

<script>
export default {
  name: "UserButton"
}
</script>

<style scoped>

</style>