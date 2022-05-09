<template>
  <div class="chat_messages">
      <div class="message" v-for="message in this.messages" :key="message" v-bind:class="message.is_customer ? customerMessage : adminMessage">
          {{message.text}}
      </div>
  </div>
  <InputMessage :forAdmin="this.forAdmin" @sendMessage="this.wsClient.send('new message')"></InputMessage>
</template>

<script>
import Message from "@/classes/Message";
import InputMessage from "@/components/Chat/InputMessage";
export default {
  name: "ChatMessages",
  components: {InputMessage},
  props: {
    forAdmin: Boolean,
    order_id: Number,
  },
  data() {
    return {
      messages : [],
      customerMessage: '',
      adminMessage: '',
      wsClient: null
    }
  },
  methods: {
    fetchChatMessages() {
      this.fetchMessagesView();
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.$store.state.user.auth_token);

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("http://partshop.site/backend/public/api/chat/" + this.order_id, requestOptions)
          .then(response => response.json())
          .then(result => {
            this.processedAnswer( result.chat );
          })
          .catch(error => console.log('error', error));
    },
    processedAnswer( messages ) {
        messages.forEach( (el) => {
          let message = new Message( el );
          let flag = true;
          this.messages.forEach((el) => {
            if (el.id == message.id)
              flag = false;
          });
          if (flag)
            this.messages.push( message );
        });
    },
    fetchMessagesView() {
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.$store.state.user.auth_token);
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      let urlencoded = new URLSearchParams();
      urlencoded.append("order_id", this.order_id);
      urlencoded.append("is_customer", this.forAdmin ? 0 : 1);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      fetch("http://partshop.site/backend/public/api/set_view_messages", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
    }
  },
  mounted() {
    console.log('начало');
    this.fetchChatMessages();
    this.adminMessage = this.forAdmin ?  'rightMessage' : 'leftMessage';
    this.customerMessage = this.forAdmin ?  'leftMessage' : 'rightMessage';
  },
  created() {
    let callback = this.fetchChatMessages;
    this.wsClient =  new WebSocket("ws://partshop.site:9000");
    this.wsClient.onopen = function () {
      console.log( 'success' );
    }
    this.wsClient.onmessage = function( ) {
      callback();
    };
  }
}
</script>

<style>
  .chat_messages {
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px;
  }
  .message {
    border: 1px solid black;
    padding: 2px;
    margin: 5px;
    max-width: 400px;
  }
  .leftMessage {
      align-self: flex-start;
  }
  .rightMessage {
      align-self: flex-end;
  }
</style>