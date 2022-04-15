<template>
  <div class="my-input">
    <InputText
        :type="type"
        :placeholder="placeholder"
        :modelValue="value"
        @input="( newValue ) => { this.value = newValue.target.value }"
        @blur="callback( this.value )"
    >

    </InputText>
  </div>
</template>

<script>
export default {
  name: "MyInput",
  props: {
      type: String,
      placeholder: String,
      callback: Function,
      currentValue: Function
  },
  data() {
    return {
        value: ''
    }
  },
  mounted() {
    this.value = this.currentValue();
  }
}
</script>

<style>
  .my-input {
    margin: 10px;
  }
  .my-input .p-inputtext {
    max-width: 100%;
    width: 300px;
  }
</style>