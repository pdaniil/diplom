<template>
  <div class="profile" v-if="this.$store.state.user.is_auth">
    <Button label="Выйти" class="p-button-danger p-button-outlined" @click="logout"></Button>
  </div>
  <div v-else>
    Вы не авторизованы
  </div>
</template>

<script>
import User from "@/classes/User";
export default {
  name: "ProfilePage",
  data() {
    return {

    }
  },
  methods: {
      logout() {
        User.object.logout();
      }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>