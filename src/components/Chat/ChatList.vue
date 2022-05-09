<template>
  <div class="chat_list">
    <div class="chat-info-headline">
      <div class="head_prop">
        ID Заказа
      </div>
      <div class="head_prop">
        Отправитель
      </div>
      <div class="head_prop">
        Последнее сообщение
      </div>
      <div class="head_prop">
        Время
      </div>
    </div>
    <div class="chat-info-line" v-for="chatInfo in this.chatsList" :key="chatInfo" v-bind:class="{ 'notViewMessage': !chatInfo.messageViewed }" @click="this.$router.push(this.link + chatInfo.orderId)">
      <div class="info-prop">
        {{chatInfo.orderId}}
      </div>
      <div class="info-prop">
        {{chatInfo.userName}}
      </div>
      <div class="info-prop">
        {{chatInfo.lastMessage}}
      </div>
      <div class="info-prop">
        {{chatInfo.timeLastMessage}}
      </div>
    </div>
  </div>
</template>

<script>
import ChatInfo from "@/classes/ChatInfo";
export default {
  name: "ChatList",
  props: {
    forAdmin: Boolean
  },
  data() {
    return {
      chatsList: [],
      link: ''
    }
  },
  methods: {
    fetchChatsList() {
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.$store.state.user.auth_token);

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      const url = this.forAdmin ? "http://partshop.site/backend/public/api/admin/chat_list" : "http://partshop.site/backend/public/api/chat_list/" + this.$store.state.user.id;
      fetch(url, requestOptions)
          .then(response => response.json())
          .then(result => {
            this.processedAnswer( result.data );
          })
          .catch(error => console.log('Ошибка при получении списка чатов пользователя', error));
    },
    processedAnswer( lists ) {
      let sb = [];
      lists.forEach((el) => {
        let chatInfo = new ChatInfo( el );
        sb.push( chatInfo );
      });
      this.chatsList = sb;
    }
  },
  mounted() {
      this.fetchChatsList();
      this.link = this.forAdmin ? '/admin/chat/' : '/chat/';
  },
  created() {
    let callback = this.fetchChatsList;
    let client = new WebSocket("ws://partshop.site:9000");
    client.onopen = function () {
      console.log( 'success' );
    }
    client.onmessage = () => {callback()};
  }
}
</script>

<style scoped>
.chat_list {
  display: flex;
  flex-direction: column;
}
.chat-info-headline {
  display: grid;
  grid-template-columns: 1fr 2fr 3fr 1fr;
  padding: 10px;
}
.chat-info-line {
  display: grid;
  grid-template-columns: 1fr 2fr 3fr 1fr;
  background: var(--green-100);
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}
.notViewMessage {
  background: var(--green-300);
 }
</style>