<template>
  <div class="filter">
      <div>
        От: {{this.minP}}
      </div>
      <div>
        До: {{this.maxP}}
      </div>
      <Slider @change="changePrice" :range="true" @slideend="this.$emit('reShowTable')" :min="minP" :max="maxP"></Slider>
  </div>
</template>

<script>

import Filter from "@/classes/Filter";

export default {
  name: "MyFilter",
  props: {
    filterObj: Filter,
    loaded: Boolean
  },
  data() {
    return {
      minP: Number,
      maxP: Number
    }
  },
  methods: {
    changePrice(value) {
        this.minP = value[0];
        this.maxP = value[1];
    },
  },
  mounted() {
    if (this.loaded)
    {
      console.log(this.filterObj);
      this.minP = this.filterObj.minPrice;
      this.maxP = this.filterObj.maxPrice;
    }
  }
}
</script>

<style>
  .filter {
    margin-top: 20px;
    height: 500px;
    border: 2px solid var(--green-400);
    border-radius: 4px;
  }
</style>