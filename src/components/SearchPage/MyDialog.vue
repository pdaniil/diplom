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
            Карточка товара {{productArr.name.property_value}}
        </div>
      </template>
      <div class="dialog__content">
        <MyDialogProductProperty v-for="property in productArr" :key="property.name" :property="property"></MyDialogProductProperty>
      </div>
      <template #footer>
        <div class="dialog__footer">
          <Button @click="this.$emit('hideDialog')" icon="pi pi-times" label="Закрыть" class="p-button-secondary" style="margin-left: .5em" />
          <Button icon="pi pi-check" label="В корзину" class="p-button-success"/>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import Dialog from 'primevue/dialog';
import MyDialogProductProperty from "@/components/SearchPage/MyDialogPorductProperty";
export default {
  name: "MyDialog",
  props: {
    display: Boolean,
    productArr: Array,
  },
  components: {
    Dialog, MyDialogProductProperty
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
    font-size: 20px;
    color: var(--purple-600);
  }
  .dialog__content {

  }
  .dialog__footer {
    margin-top: 20px;
  }
  .dialog__footer .p-button {
    margin-left: 5px !important;
    padding: 12px 20px;
    background:  var(--purple-300) !important;
  }
</style>