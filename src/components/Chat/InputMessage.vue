<template>
  <div class="input_message">
    <InputText type="text" v-model="newMessage" /> <UserButton :type="'confirm'" :text="'Отправить'" @click="sendNewMessage"></UserButton>
  </div>
</template>

<script>
import UserButton from "@/components/Header/User/LoginButton";
export default {
  name: "InputMessage",
  components: {UserButton},
  props: {
    forAdmin: Boolean,
    client: WebSocket
  },
  data() {
    return {
      newMessage: '',
      sendMessage: ''
    }
  },
  methods: {
    sendNewMessage() {
      if (this.newMessage.trim() != '') {
        this.fetchSendNewMessage(this.newMessage);
        this.newMessage = '';
      }
    },
    fetchSendNewMessage( text ) {
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.$store.state.user.auth_token);
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      let urlencoded = new URLSearchParams();
      urlencoded.append("order_id", this.$route.params.order_id);
      urlencoded.append("text", text);
      urlencoded.append("user_name", this.$store.state.user.name);
      urlencoded.append("is_customer", this.forAdmin ? 0 : 1);
      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      fetch("http://partshop.site/backend/public/api/new_message", requestOptions)
          .then(response => response.text())
          .then(result => {
            this.sendMessage = result;
            this.$emit('sendMessage');
          })
          .catch(error => console.log('error', error));
    }
  }
}
</script>

<style scoped>

</style>