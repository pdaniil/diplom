<template>
  <div class="headLine">
    Сообщения по заказу {{$route.params.order_id}}
  </div>
  <ChatMessages :order_id="$route.params.order_id" :for-admin="false"></ChatMessages>
</template>

<script>
import ChatMessages from "@/components/Chat/ChatMessages";
export default {
  name: "ChatPage",
  components: {ChatMessages},
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