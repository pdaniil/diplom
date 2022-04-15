<template>
  <div class="login">
      <Dialog
          header="header"
          footer="footer"
          v-model:visible="modalShow"
          @hide="hideDialog"
          :draggable="false"
          :modal="true"
          :dismissableMask="true"
          :class="'login-dialog'"
      >
          <template #header>
            <div id="register" class="dialog__header" v-if="type == 'register'">
              <slot></slot>
            </div>
            <div id="login" class="dialog__header" v-if="type == 'login'">
              <slot></slot>
            </div>
          </template>
          <div class="content" >
              <div class="content__login" v-if="type == 'login'">
                <MyInput :type="'text'" :property="'email_login'" :placeholder="'Email'" @stopInput="catchValueInput"></MyInput>
                <MyInput :type="'password'" :property="'password_login'" :placeholder="'Пароль'" @stopInput="catchValueInput"></MyInput>
              </div>
          </div>
          <div class="register" v-if="type == 'register'">
            <div class="content__login">
              <MyInput :type="'text'" :property="'email_register'" :placeholder="'Email'" @stopInput="catchValueInput"></MyInput>
              <MyInput :type="'text'" :property="'name_register'" :placeholder="'ФИО'" @stopInput="catchValueInput"></MyInput>
              <MyInput :type="'password'" :property="'password_register'" :placeholder="'Пароль'" @stopInput="catchValueInput"></MyInput>
              <MyInput :type="'password'" :property="'password_confirm_register'" :placeholder="'Повторите пароль'" @stopInput="catchValueInput"></MyInput>
            </div>
          </div>
          <template #footer>
            <div class="dialog__footer" v-if="type == 'login'">
                <UserButton :text="'Регистрация'" @click="this.$emit('register')" :type="'extra'"></UserButton>
                <UserButton :text="'Войти'" :type="'confirm'"></UserButton>
            </div>
            <div class="dialog__footer" v-if="type == 'register'">
              <UserButton :text="'Вход'" :type="'confirm'" @click="this.$emit('login')"></UserButton>
              <UserButton :text="'Зарегистрироваться'" :type="'extra'"></UserButton>
            </div>
          </template>
      </Dialog>
  </div>
</template>

<script>
import MyInput from "@/components/Header/User/Login/MyInput";
import UserButton from "@/components/Header/User/LoginButton";
export default {
  components: {UserButton, MyInput},
  props: {
      visible: Boolean,
      type: String
  },
  name: "LoginModal",
  data() {
    return {
      modalShow: this.visible
    }
  },
  methods: {
    hideDialog() {
        this.$emit('hideDialog');
    },
    catchValueInput( value, property ) {
      console.log( value );
      console.log( property );
    },
  },
  watch: {
    visible( value ) {
      this.modalShow = value;
    }
  }
}
</script>

<style>
    #register {
      color: var(--purple-600);
    }
    .login {

    }
    .login-dialog {
      max-width: 100%;
      width: 400px !important;
    }
    .login-dialog .dialog__header {
      width: 100%;
      text-align: center;
    }
    .p-dialog .p-dialog-header {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid var(--purple-200) !important;
        padding-bottom: -100px;
    }
    .p-dialog .p-dialog-header:last-child {

    }
    .content {
      margin-top: 20px;
    }
    .content__login {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .p-dialog  .p-dialog-footer {
      border-top: 1px solid var(--purple-200) !important;
    }
    .dialog__footer {
      display: flex;
      justify-content: center;
    }
</style>