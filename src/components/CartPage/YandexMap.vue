<template>
  <div id="" class="container">
    <div id="map" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script>

export default {

  name: "YandexMap",
  data() {
      return {

      }
  },
  created() {
     ymaps.ready(function () {
      new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 7
      });
    });
  }
}
</script>

<style scoped>

</style>