<template>
  <Dialog header="Header" v-model:visible="show"
          :draggable="false"
          :modal="true"
          :dismissableMask="true"
          :style="{width: '500px'}"
  >
    <template #header>
      <div class="dialog__header">
        Добавление склада
      </div>

    </template>
  </Dialog>
</template>

<script>
export default {
  props: {
    display: Boolean
  },
  name: "AppendStorageDialog",
  data() {
    return {
      show: false
    }
  },
  methods: {

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

<style >
  .dialog__header {
    font-size: 25px;
    color: var(--green-600);
  }
</style>