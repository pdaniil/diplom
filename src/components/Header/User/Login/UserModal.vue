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

          <Message severity="warn" v-if="this.currentErrorLogin != '' && this.issetErrorsLogin">{{this.currentErrorLogin}}</Message>
          <Message severity="warn" v-if="this.currentErrorRegister != '' && this.issetErrorsRegister ">{{this.currentErrorRegister}}</Message>
          <Message severity="success" v-if="type == 'register'  && this.successMessage ">Вы успешно прошли регистрацию!</Message>
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
          <div class="register" v-if="type == 'register' && !this.successMessage">
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
            <div class="dialog__footer" v-else-if="type == 'register' ">
              <UserButton :text="'Вход'" :type="'confirm'" @click="this.$emit('login')"></UserButton>
              <UserButton :text="'Зарегистрироваться'"  v-if="!this.successMessage" :type="'extra'" @click="register"></UserButton>
            </div>
            <div class="" v-else>
                Теперь Вы можете войти на сайт
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
      currentErrorLogin: '',
      issetErrorsLogin: false,
      currentErrorRegister: '',
      issetErrorsRegister: false,
      successMessage: false
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
        let errors = [];
        if (response.errors != null)
           errors = Object.values(response.errors);

        if (this.errorsProcessed( errors , url))
        {
            this.currentErrorRegister = '';
            this.currentErrorLogin = '';

            if (url == 'login')
              this.$emit('loginSuccess', response.token);
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
    },
    errorsProcessed( errors, type ) {

        if (type == 'register' && errors.length > 0)
        {
          this.currentErrorRegister = errors[0][0];
          this.issetErrorsRegister = true;
          return false
        }
        else
        {
          this.currentErrorRegister = '';
          this.successMessage = true;
        }


        if (type == 'login' && errors.length > 0)
        {
          this.issetErrorsLogin = true;
          this.currentErrorLogin = errors[0][0];
          return false;
        }
        else
          this.currentErrorLogin = '';

        this.issetErrorsLogin = false;
        this.issetErrorsRegister = false;

        return true;
    }
  },
  watch: {
    visible( value ) {
      this.modalShow = value;
    }
  },
  mounted() {
    this.successMessage = false;
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