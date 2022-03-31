<template>
    <div class="search_group">
      <div class="p-inputgroup">
        <InputText v-model="article"  placeholder="Введите артикул"/>
        <Button @click="searchProduct" :disabled="load"  id="my_button" icon="pi pi-search" class="p-button-success"/>
      </div>
    </div>

</template>

<script>
import InputText from "primevue/inputtext";
export default {
  props: {
    articleSearch: String,
    load: Boolean
  },
  components: {
    InputText
  },
  name: "MySearchString",
  data() {
    return {
      article: ''
    }
  },
  methods: {
    searchProduct() {
      this.$emit('article', this.article);
    },
  }
}
</script>

<style>
  .search_group {
    display: grid;
  }
  .search_group .p-button .p-button-icon	 {
    color: white !important;
    font-size: 20px !important;
  }
  .search_group .onSearch .p-button  {
    background: white;
    border: none !important;
  }
  .search_group .onSearch .p-button:hover  {
    background: white;
    border: none !important;
  }
  .search_group .onSearch  .p-button .p-button-icon	 {
    color: var(--green-400) !important;
    font-size: 32px !important;
  }
  .search_group .p-inputtext:hover {
    border: 1px solid var(--green-400);
  }
  .search_group .p-inputtext:focus {
      outline: none 0 !important;
      box-shadow: 0px 0px !important;
      border: 1px solid var(--green-600);
  }
</style>