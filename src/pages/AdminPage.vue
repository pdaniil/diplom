<template>
  <div class="headLine">
    Панель администратора
  </div>
  <div class="settings" v-if="this.$store.state.user.is_auth">
      <CartSetting v-for="setting in settings" :key="setting" :params="setting"></CartSetting>
  </div>
</template>

<script>
import CartSetting from "@/components/AdminPage/CartSetting";
export default {
  name: "AdminPage",
  components: {CartSetting},
  data() {
    return {
      settings: [
        {title: 'Склады', subtitle: 'Настройки складов', content: 'На данной странице можно подключить новые склады, доступные в типах технических интерфейсов, указать данные для их подключения, а также задать наценку на товары с этих складов.', class: 'yellow-300', callback: this.toStorageSetting},
        {title: 'Пользователи', subtitle: 'Управление пользователями', content: 'На данной странице можно создавать и удалять пользователей, просматривать информацию о существующих и изменять их привелегии.', class: 'cyan-100', callback: this.toUsersSetting},
        {title: 'Сообщения', subtitle: 'Менеджер сообщений', content: 'На данной странице Вы можете ответить на вопросы, возникающие у Ваших покупателей, при помощи чата.', class: 'purple-100', callback: this.toChatSetting},
      ]
    }
  },
  methods: {
      toStorageSetting() {
          this.$router.push('/admin/storages');
      },
      toUsersSetting() {
          this.$router.push('/admin/users');
      },
      toChatSetting() {
        this.$router.push('/admin/chat_manager');
      }
  }
}
</script>

<style>
.headLine {
  text-align: center;
  font-size: 48px;
  color: var(--gray-800);
  font-weight: 300;
}

.settings {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.card-setting {
  max-width: 400px;
  margin: 20px;
  cursor: pointer;
  animation: out 0.2s ease-in-out;
}

@keyframes pulse {
  from { transform: scale(1) }
  to { transform: scale(1.1) }
}
@keyframes out {
  from { transform: scale(1.1) }
  to { transform: scale(1) }
}
.card-setting:hover {
  transform: scale(1.1);
  animation: pulse 0.2s ease-in-out;
}
</style>