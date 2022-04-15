<template>
  <div class="page">
    <Header></Header>
    <div class="article">
      <router-view />
    </div>
  </div>
</template>
<script>


import Header from "@/components/Header/Header";
export default {
  name: 'App',
  components: {Header},
  data(){
    return {
      windowWidth: window.innerWidth,
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
      this.onResize();
    });
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth > 900 && this.windowWidth < 1600 )
        this.changeScreen('middle')
      else if (this.windowWidth >= 1600)
        this.changeScreen('full')
      else if (this.windowWidth <= 900)
        this.changeScreen('small')
    },
    changeScreen( screen ){
      let obj = {};
      switch (screen) {
        case 'full' :
           obj = {
             fullScreen: true,
             middleScreen: false,
             smallScreen : false
           };
          break;
        case 'middle' :
          obj = {
            fullScreen: false,
            middleScreen: true,
            smallScreen : false
          };
          break;
        case 'small' :
          obj = {
            fullScreen: false,
            middleScreen: false,
            smallScreen : true
          };
          break;
      }
      this.$store.commit('changeScreen', obj);
    }
  }
}
</script>

<style>
  * {
    font-family: 'Roboto', sans-serif;
  }
  #app {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
  }
  .page {
    display: flex;
    max-width: 100%;
    width: 1400px;
    flex-direction: column;
  }

</style>
