<template>
  <div class="navbar__fullscreen">
    <logo-content></logo-content>
    <linked-list></linked-list>
    <UserButton></UserButton>
  </div>

</template>

<script>
import LinkedList from "@/components/Header/LinkedList";
import UserButton from "@/components/Header/UserButtonFull";
import LogoContent from "@/components/Header/LogoContent";
export default {
  name: "MyNavbarFullscreen",
  components: {LogoContent, UserButton,  LinkedList}
}
</script>

<style>
  .navbar__fullscreen {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 20px;
    border-bottom: 2px solid var(--green-600);
  }
</style>