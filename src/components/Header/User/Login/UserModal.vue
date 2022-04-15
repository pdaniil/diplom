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

          <Message severity="warn" v-if="this.errorsLogin.length > 0 && type == 'login'">{{this.errorsLogin[this.errorsLogin.length - 1]}}</Message>
          <Message severity="warn" v-if="this.errorsRegister.length > 0 && type == 'register'">{{this.errorsRegister[0]}}</Message>
          <div class="content" >

              <div class="content__login" v-if="type == 'login'">
                <MyInput v-for="field in loginFields" :key="field"
                    :type="field.type"
                    :placeholder="field.placeholder"
                    :callback="field.callback"
                    :current-value="field.currentValue"
                >
                </MyInput>
              </div>
          </div>
          <div class="register" v-if="type == 'register'">
            <div class="content__login">
              <MyInput v-for="field in regFields" :key="field"
                       :type="field.type"
                       :placeholder="field.placeholder"
                       :callback="field.callback"
                       :current-value="field.currentValue"
              >
              </MyInput>
            </div>
          </div>
          <template #footer>
            <div class="dialog__footer" v-if="type == 'login'">
                <UserButton :text="'Регистрация'" @click="this.$emit('register')" :type="'extra'"></UserButton>
                <UserButton :text="'Войти'" :type="'confirm'" @click="authenticate"></UserButton>
            </div>
            <div class="dialog__footer" v-if="type == 'register'">
              <UserButton :text="'Вход'" :type="'confirm'" @click="this.$emit('login')"></UserButton>
              <UserButton :text="'Зарегистрироваться'" :type="'extra'" @click="register"></UserButton>
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
      modalShow: this.visible,
      loginFields: [
          { type: 'text', placeholder: 'Email', callback: this.__callBackSetEmailLogin, currentValue: this.getEmailLogin },
          { type: 'password', placeholder: 'Пароль', callback: this.__callBackSetPasswordLogin, currentValue: this.getPasswordLogin },
      ],
      regFields: [
        { type: 'text', placeholder: 'Email', callback: this.__callBackSetEmailReg, currentValue: this.getEmailReg },
        { type: 'text', placeholder: 'Имя', callback: this.__callBackSetNameReg, currentValue: this.getNameReg },
        { type: 'password', placeholder: 'Пароль', callback: this.__callBackSetPasswordReg, currentValue: this.getPasswordReg},
        { type: 'password', placeholder: 'Повторите пароль', callback: this.__callbackSetPasswordConfReg, currentValue: this.getPasswordConfReg}
      ],
      errorsLogin: [],
      errorsRegister: []
    }
  },
  methods: {
    hideDialog() {
        this.$emit('hideDialog');
    },
    __callBackSetEmailLogin(value) {
        this.$store.dispatch('setEmail', {type: 'login', value: value });
    },
    getEmailLogin() {
        return this.$store.state.user.authentication.email;
    },
    __callBackSetPasswordLogin( value ) {
        this.$store.dispatch('setPassword', {type: 'login', value: value });
    },
    getPasswordLogin() {
        return this.$store.state.user.authentication.password;
    },
    __callBackSetEmailReg( value ) {
        this.$store.dispatch('setEmail', {type: 'registration', value: value });
    },
    getEmailReg() {
        return this.$store.state.user.registration.email;
    },
    __callBackSetNameReg( value ) {
        this.$store.dispatch('setName', {type: 'registration', value: value });
    },
    getNameReg() {
        return this.$store.state.user.registration.name;
    },
    __callBackSetPasswordReg( value ){
        this.$store.dispatch('setPassword', {type: 'registration', value: value });
    },
    getPasswordReg(){
        return this.$store.state.user.registration.password;
    },
    __callbackSetPasswordConfReg( value ) {
        this.$store.dispatch('setPasswordConfirm', {type: 'registration', value: value });
    },
    getPasswordConfReg(){
        return this.$store.state.user.registration.password_confirmed;
    },
    fetchPostUserData(  url, body ) {
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        let queryParams = new URLSearchParams();
        let keys = Object.keys(body);
        let params = Object.values(body);
        keys.forEach((el, index) => {
            queryParams.append(el, params[index]);
        });
        console.log( url );
        const init = {
            method: 'POST',
            headers: myHeaders,
            body: queryParams,
            redirect: 'follow'
        };
        return fetch(this.$store.state.baseQueryUrl + url, init)
            .then(response => response.json())
            .then(data => {
                this.responseProcessed( data, url );
            });
    },
    responseProcessed( response, url ) {
        const errors = Object.values(response.errors);
        if ( url == 'register' )
        {
          if (errors.length > 0)
            this.errorsRegister.push(errors[0]);
          else
           this.errorsRegister = [];
        }


        if ( url == 'login' )
        {
            if (errors.length > 0)
              this.errorsLogin.push(errors[0]);
            else
              this.errorsLogin = [];
        }
    },
    getDataReg(){
        return {
          email: this.getEmailReg(),
          password: this.getPasswordReg(),
          password_confirmed: this.getPasswordConfReg(),
          name: this.getNameReg(),
        };
    },
    getDataAuth(){
          return {
            email: this.getEmailLogin(),
            password: this.getPasswordLogin(),
          };
    },
    authenticate(){
        this.fetchPostUserData( 'login', this.getDataAuth() );
    },
    register() {
        this.fetchPostUserData('register', this.getDataReg() );
    }
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