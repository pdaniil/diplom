<template>
  <div class="navbar__mobile">
    <my-side-bar></my-side-bar>
    <LogoText></LogoText>
    <MyUserBarMobile></MyUserBarMobile>
  </div>
</template>

<script>
import MySideBar from "@/components/Header/MySideBar";
import LogoText from "@/components/Header/LogoText";
import MyUserBarMobile from "@/components/Header/MyUserBarMobile";
export default {
  name: "MyNavbarMobile",
  components: {MyUserBarMobile, LogoText, MySideBar}
}
</script>

<style scoped>
  .navbar__mobile {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 20px;
    border-bottom: 2px solid var(--green-200);
  }
</style>