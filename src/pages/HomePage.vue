<template>
  <div class="main_page"></div>
</template>

<script>

export default {
  name: "HomePage",
  mounted() {
    this.$router.push('/search');
  }
}
</script>

<style scoped>

</style>