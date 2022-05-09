<template>
  <div class="headLine">
    Сообщения
  </div>
  <ChatList :forAdmin="false"></ChatList>
</template>

<script>
import ChatList from "@/components/Chat/ChatList";
export default {
  name: "ManageChatPage",
  components: {ChatList}
}
</script>

<style scoped>
.headLine {
  text-align: center;
  font-size: 48px;
  color: var(--gray-800);
  font-weight: 300;
}
</style>