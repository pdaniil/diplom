<template>
  <div class="navbar">
    <linked-list></linked-list>
    <LogoText></LogoText>
    <UserButton></UserButton>
  </div>
</template>

<script>
import LogoText from "@/components/LogoText";
import UserButton from "@/components/UserButtonFull";
import LinkedList from "@/components/LinkedList";
export default {
  components: {
    LinkedList,
    LogoText, UserButton
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