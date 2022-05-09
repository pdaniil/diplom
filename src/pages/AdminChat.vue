<template>
  <div class="headLine">
    Чат с покупателем по заказу {{$route.params.order_id}}
  </div>
  <ChatMessages :order_id="$route.params.order_id" :for-admin="true"></ChatMessages>
</template>

<script>
import ChatMessages from "@/components/Chat/ChatMessages";
export default {
  name: "AdminChat",
  components: {ChatMessages}
}
</script>

<style scoped>

</style>