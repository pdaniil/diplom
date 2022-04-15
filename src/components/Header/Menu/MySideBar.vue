<template>
  <div class="bar">
    <Sidebar v-model:visible="visibleLeft" @hide="this.$emit('hide')">
      <h3>Меню</h3>
      <div class="bar__menu">
        <Menu :model="items"></Menu>
      </div>
    </Sidebar>
    <!--<Button icon="pi pi-list" class="p-button-success p-button-rounded p-button-outlined" @click="visibleLeft = true" />-->
  </div>

</template>

<script>
import Sidebar from 'primevue/sidebar';
import Menu from 'primevue/menu';
export default {
  props: {
    visible: Boolean
  },
  name: "MySideBar",
  components: {
    Sidebar,Menu
  },
  data() {
    return {
      visibleLeft: this.visible,
      items: [
        {
          label: 'Главная',
          icon: 'pi pi-home',
          command: () => {
            this.$router.push('/');
            this.visibleLeft = false;
          }
        },
        {
          label: 'Поиск товаров',
          icon: 'pi pi-search',
          command: () => {
            this.$router.push('/search');
            this.visibleLeft = false;
          }
        },
        {
          label: 'Сообщения',
          icon: 'pi pi-envelope',
          command: () => {
            this.$router.push('/manage-chat');
            this.visibleLeft = false;
          }
        },
        {
          label: 'Мой профиль',
          icon: 'pi pi-user',
          command: () => {
            this.$router.push('/profile');
            this.visibleLeft = false;
          }
        },
      ]
    }
  },
  methods: {
      hideSideBar() {
        this.$emit('hide');
      }
  },
  watch: {
    visible( value ) {
        this.visibleLeft = value;
    }
  }
}
</script>

<style>
  .bar .p-sidebar {
    max-width: 100% !important;
  }
  .bar__menu .p-menu {
    border: 0px solid #dee2e6 !important;
  }
  .bar .p-menu-list {
    border: 0px solid !important;
  }
  .bar .p-button {
    height: 50px !important;
    width: 50px !important;
    border: 1px solid var(--green-300)!important;
  }
  .bar .p-button .p-button-icon {
    color: var(--gray-400);
    font-size: 1rem !important;
    font-weight: 100 !important;
  }
  .bar__menu .p-menuitem-link {
    border: 0px !important;
  }
  .p-menuitem-icon {

  }
  .p-menuitem-text {

  }
</style>