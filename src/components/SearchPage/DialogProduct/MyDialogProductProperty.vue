<template>
    <div class="property_name">
      {{name}}
    </div>
    <div class="property_value">
      {{value}}
    </div>
</template>

<script>

export default {
  props: {
      name: String,
      value: String
  },
  name: "MyDialogProductProperty"
}
</script>

<style scoped>
  .property_name {
    text-align: left;
    padding: 5px;
    border-bottom: 1px solid var(--purple-100);
    font-weight: 500;
  }

  .property_value {
    text-align: left;
    padding: 5px;
    border-left: 1px solid var(--purple-100);
    border-bottom: 1px solid var(--purple-100);
  }
</style>