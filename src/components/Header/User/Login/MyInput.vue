<template>
  <div class="my-input">
    <InputText :type="type" :id="property" :placeholder="placeholder" :modelValue="value" @input="( newValue ) => { this.value = newValue.target.value }" @blur="this.$emit('stopInput', this.value, property)"></InputText>
  </div>
</template>

<script>
export default {
  name: "MyInput",
  props: {
      property: String,
      type: String,
      placeholder: String
  },
  data() {
    return {
        value: ''
    }
  },
  methods : {
    catchInput() {
      console.log(this.value);
    },
    inputValue( ) {

    }
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