<template>
    <div class="setting_block">

    </div>
</template>

<script>
export default {
  props: {
      settings: Array
  },
  data() {
    return {
      arraySetting: []
    }
  },
  methods: {

  },
  mounted() {
      this.objectToArray();
  },
  name: "ReactiveSettings"
}
</script>

<style scoped>

</style>