<template>
  <div class="navbar__fullscreen">
    <logo-content></logo-content>
    <linked-list></linked-list>
    <div class="user-group">
      <LoginButton v-if="!this.$store.state.user.is_auth" :text="'Войти'" @click="this.loginVisible = true" :icon="'pi pi-user-plus'" :type="'confirm'"></LoginButton>
        <Button v-if="this.$store.state.user.is_auth" @click="this.$emit('logout')" icon="pi pi-sign-out" class="p-button-danger p-button-outlined mt-5 " />
    </div>
  </div>

  <div class="navbar__middle">
    <LoginButton :text="'Меню'"  @click="this.sidebarVisible = true"  :type="'confirm'"></LoginButton>
    <logo-content></logo-content>
    <div class="user-group" style="align-self: flex-end;">
      <LoginButton v-if="!this.$store.state.user.is_auth" :text="'Войти'" @click="this.loginVisible = true" :icon="'pi pi-user-plus'" :type="'confirm'"></LoginButton>
      <LoginButton @click="$router.push('/profile')"  v-if="this.$store.state.user.is_auth" :text="'Мой профиль'"  :type="'confirm'"></LoginButton>
    </div>
  </div>

  <div class="navbar__mobile">
    <LoginButton  @click="this.sidebarVisible = true" :icon="'pi pi-list'" :type="'extra-mobile'"></LoginButton>
    <LogoText></LogoText>
    <div class="user-group">
      <LoginButton  v-if="!this.$store.state.user.is_auth" @click="this.loginVisible = true" :icon="'pi pi-user-plus'" :type="'extra-mobile'"></LoginButton>
      <LoginButton @click="$router.push('/profile')"  v-if="this.$store.state.user.is_auth" :icon="'pi pi-user'" :type="'extra-mobile'"></LoginButton>
    </div>
  </div>

  <my-side-bar :visible="sidebarVisible" @hide="this.sidebarVisible = false"></my-side-bar>

  <UserModal
      :visible="loginVisible"
      :type="'login'"
      @hideDialog="this.loginVisible = false;"
      @register="this.loginVisible = false; this.registerVisible = true"
      @loginSuccess = "(token) => {this.$emit('login', token); this.loginVisible = false;}"
  >
    Вход
  </UserModal>
  <UserModal
      :visible="registerVisible"
      :type="'register'"
      @hideDialog="this.registerVisible = false;"
      @login = "this.loginVisible = true; this.registerVisible = false"
  >
    Регистрация
  </UserModal>

</template>

<script>
import LinkedList from "@/components/Header/Menu/LinkedList";
import LoginButton from "@/components/Header/User/LoginButton";
import LogoContent from "@/components/Header/LogoContent/LogoContent";
import UserModal from "@/components/Header/User/Login/UserModal";
import MySideBar from "@/components/Header/Menu/MySideBar";
import LogoText from "@/components/Header/LogoContent/LogoText";


export default {
  name: "MyNavbarFullscreen",
  components: {LogoContent, LoginButton,  LinkedList, UserModal, MySideBar, LogoText},
  data() {
    return {
      loginVisible: false,
      registerVisible: false,
      sidebarVisible: false
    }
  },
}
</script>

<style>
  .navbar__fullscreen {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 20px;
    border-bottom: 2px solid var(--green-600);
  }

  .navbar__middle {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 20px;
    border-bottom: 2px solid var(--green-200);
  }

  .navbar__mobile {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 20px;
    border-bottom: 2px solid var(--green-200);
  }

  .group_auth_button {
    display: flex;
    padding: 2px;
  }

  @media (min-width: 1251px) {
    .navbar__fullscreen {
      display: flex;
    }
    .navbar__middle {
      display: none;
    }
    .navbar__mobile {
      display: none;
    }
  }
  @media (max-width: 1250px) and (min-width: 701px) {
    .navbar__fullscreen {
      display: none;
    }
    .navbar__middle {
      display: flex;
    }
    .navbar__mobile {
      display: none;
    }
  }
  @media (max-width: 700px) {
    .navbar__fullscreen {
      display: none;
    }
    .navbar__middle {
      display: none;
    }
    .navbar__mobile {
      display: flex;
    }
  }
</style>