<template>
  <div class="component">
    <TabMenu id="tabstrip" class="p-tag-warning" :model="items" />
  </div>
  <div class="component" v-if="this.$store.state.user.is_auth">
    <TabMenu  class="p-tag-warning" :model="itemsAuth" />
  </div>
</template>

<script>

export default {
  name: "LinkedList",
  data() {
    return {
      items: [
        {label: 'Искать товары', icon: 'pi pi-fw pi-search', to: '/search', defaultIcon : 'pi pi-fw pi-search'},
        {label: 'Мои заказы', icon: 'pi pi-fw pi-shopping-bag', to:'/orders', defaultIcon : 'pi pi-fw pi-user'},
        {label: 'Сообщения', icon: 'pi pi-fw pi-envelope', to:'/manage-chat', defaultIcon : 'pi pi-fw pi-envelope'},
      ],
      itemsAuth: [
        {label: 'Мой профиль', icon: 'pi pi-fw pi-user', to:'/profile', defaultIcon : 'pi pi-fw pi-envelope'},
      ],
      currentItem: 0,
      firstChange: true,
      articleSearch: ''
    }
  },
  methods: {
  }
}
</script>

<style>
  .component {
    display: flex;
    align-items: flex-end;
  }
  .p-menuitem-icon {
    font-weight: 300;
  }
  .p-menuitem-link {
    border-bottom: 2px solid var(--gray-600) !important;
  }
  .p-menuitem-link:hover {
    border-bottom: 2px solid var(--green-300) !important;
  }
  .p-menuitem-link:hover .p-menuitem-text {
    color: var(--green-300);
  }
  .p-menuitem-link:hover .p-menuitem-icon {
    color: var(--green-300);
  }
  .p-menuitem-text {
    font-weight: 300;
  }
  .p-highlight .p-menuitem-link {
    border-bottom: 2px solid var(--green-300) !important;
  }
  .p-highlight .p-menuitem-text {
    color: var(--green-500);
    font-weight: 400;
  }
  .p-highlight .p-menuitem-icon {
    color: var(--green-400);
  }
  .p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link:not(.p-disabled):focus {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: none !important;
  }
</style>