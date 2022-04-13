<template>
  <div class="dialog">
    <Dialog header="Header" v-model:visible="show"
            :draggable="false"
            :modal="true"
            :dismissableMask="true"
            :style="{width: '500px'}"
    >
      <template #header>
        <div class="dialog__header">
            <slot></slot>
        </div>
      </template>
      <div class="dialog__content">
          <div class="description">
            <h3>Описание товара: </h3>
            {{product.description}}
          </div>
          <h3>Таблица характеристик:</h3>
          <div class="properties">
              <MyDialogProductProperty :name="'Артикул'" :value="product.article"></MyDialogProductProperty>
              <MyDialogProductProperty :name="'Брэнд'" :value="product.brand"></MyDialogProductProperty>
              <MyDialogProductProperty :name="'Цена'" :value="product.price + ' руб.'"></MyDialogProductProperty>
              <MyDialogProductProperty :name="'Количество'" :value="product.exist"></MyDialogProductProperty>
              <MyDialogProductProperty :name="'Время доставки'" :value="product.time + ' дн.'" v-if="product.time > 0"></MyDialogProductProperty>
              <MyDialogProductProperty :name="'Время доставки'" :value="'На складе'" v-else></MyDialogProductProperty>
              <MyDialogProductProperty :name="'Склад'" :value="product.storage"></MyDialogProductProperty>
          </div>
      </div>
      <template #footer>
        <div class="dialog__footer">
          <Button @click="this.$emit('hideDialog')" icon="pi pi-times" label="Закрыть" class="p-button-secondary" style="margin-left: .5em" />
          <Button @click="this.$emit('shop')" icon="pi pi-check" label="В корзину" class="p-button-success"/>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import Dialog from 'primevue/dialog';
import Product from "@/classes/Product";
import MyDialogProductProperty from "@/components/SearchPage/MyDialogProductProperty";
export default {
  name: "MyDialog",
  props: {
    display: Boolean,
    product: Product,
  },
  components: {
    MyDialogProductProperty,
    Dialog
  },
  data() {
    return {
      show: false
    }
  },
  mounted() {
    this.show = this.display;
  },
  watch: {
    show(value) {
      if (!value)
        this.$emit('hideDialog')
    },
    display(value) {
        this.show = value;
    }
  }
}
</script>

<style>
  .dialog__header {
    font-size: 25px;
    color: var(--green-600);
  }
  .dialog__content {

  }
  .dialog__footer {
    margin-top: 20px;
  }
  .dialog__footer .p-button {
    margin-left: 5px !important;
    padding: 12px 20px;

  }
  .properties {
    display: grid;
    grid-template-columns: 3fr 4fr;
    border: 1px solid var(--purple-100);
    border-bottom: 0px solid var(--purple-100);
    margin-top: 5px;
  }
</style>