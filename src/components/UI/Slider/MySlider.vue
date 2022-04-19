<template>
  <div class="slider">
    <div class="content">
      <ul>
        <li>
          <img src="@/components/UI/Slider/1.jpg" alt="">
        </li>
        <li>
          <img src="@/components/UI/Slider/2.jpg" alt="">
        </li>
        <li>
          <img src="@/components/UI/Slider/3.jpg" alt="">
        </li>
        <li>
          <img src="@/components/UI/Slider/4.jpg" alt="">
        </li>
        <li>
          <img src="@/components/UI/Slider/5.jpg" alt="">
        </li>
        <li>
          <img src="@/components/UI/Slider/6.jpg" alt="">
        </li>
        <li>
          <img src="@/components/UI/Slider/7.jpg" alt="">
        </li>
        <li>
          <img src="@/components/UI/Slider/8.jpg" alt="">
        </li>
        <li>
          <img src="@/components/UI/Slider/9.jpg" alt="">
        </li>
      </ul>
    </div>
    <div class="indicator">

    </div>
  </div>
</template>

<script>
export default {
  name: "MySlider"
}
</script>

<style scoped>
  .slider {
    margin-top: 25px;
    margin-bottom: 25px;
    width: 100%;
    border-top: 1px solid var(--green-500);
    border-bottom: 1px solid var(--green-500);
  }
  .content {
    overflow-X: hidden;
  }
  ul {
    overflow: hidden;
    width: 9999px;
  }
  li {
    display: inline-block;
    width: 500px;

  }
  img {
    display:block;
    width: 400px;
    height: 500px;

  }
</style>