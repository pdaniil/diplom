<template>
  <div class="component">
    <Button label="Вход" icon="pi pi-user" iconPos="right" class="p-button-text" />
  </div>
</template>

<script>
export default {
  name: "UserButton"
}
</script>

<style>
  .component .p-button {
    width: 150px !important;
    border: 1px solid var(--green-400) !important;
  }
  .p-button:not(.p-disabled):focus {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: none !important;
  }
  .component .p-button-label {
    color: var(--green-400);
  }
  .component .p-button-icon {
    color: var(--green-400);
  }
</style>