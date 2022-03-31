<template>
    <div class="property_content">
        {{property.property_name}} : {{property.property_value}}
    </div>
</template>

<script>

export default {
  props: {
      property: Object
  },
  name: "MyDialogPorductProperty"
}
</script>

<style scoped>

</style>