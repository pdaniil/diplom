<template>
  <div class="navbar">
    <logo-content></logo-content>
    <link-list></link-list>
    <UserButton></UserButton>
  </div>
</template>

<script>
import UserButton from "@/components/UserButtonFull";
import LinkList from "@/components/LinkList";
import LogoContent from "@/components/LogoContent";

export default {
  components: {
    LogoContent,
    LinkList,
     UserButton
  },
  name: "MyNavbar",
}
</script>

<style scoped>
.navbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
</style>