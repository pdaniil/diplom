<template>
  <div class="headLine">
    Профиль пользователя
  </div>
  <div class="profile" v-if="this.$store.state.user.is_auth">
    <div class="profile_property">
      Ваше имя:  {{ this.$store.state.user.name }}
    </div>
    <div class="profile_property">
      Ваш Email: {{ this.$store.state.user.email }}
    </div>
    <Button label="Выйти" class="p-button-danger p-button-outlined" @click="logout"></Button>
    <div class="admin_link" v-if="this.$store.state.user.is_admin" @click="this.$router.push('/admin')">
      Перейти в панель администратора
    </div>
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
.headLine {
  text-align: center;
  font-size: 48px;
  color: var(--gray-800);
  font-weight: 300;
}
.profile_property {
  color: var(--gray-800);
  font-weight: 300;
  font-size: 24px;
}

.admin_link {
  cursor: pointer;
  margin-top: 20px;
  color: var(--gray-500);
}
.admin_link:hover {
  color: var(--green-500);
}
</style>