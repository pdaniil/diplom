<template>
  <div class="headLine">
    Сообщения покупателей
  </div>
  <ChatList :for-admin="true"></ChatList>
</template>

<script>
import ChatList from "@/components/Chat/ChatList";
export default {
  name: "AdminChatManager",
  components: {ChatList}
}
</script>

<style >

</style>