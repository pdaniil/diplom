<template>
  <div v-if="this.$store.state.screenState.fullScreen" class="component">
    <TabMenu @tab-change="chatLink" id="tabstrip" class="p-tag-warning" :model="items" />
  </div>
</template>

<script>

export default {
  name: "LinkedList",
  data() {
    return {
      items: [
        {label: 'Искать товары', icon: 'pi pi-fw pi-search', to: '/search', defaultIcon : 'pi pi-fw pi-search'},
        {label: 'Мой профиль', icon: 'pi pi-fw pi-user', to:'/profile', defaultIcon : 'pi pi-fw pi-user'},
        {label: 'Сообщения', icon: 'pi pi-fw pi-envelope', to:'/manage-chat', defaultIcon : 'pi pi-fw pi-envelope'},
      ],
      currentItem: 0,
      firstChange: true,
      articleSearch: ''
    }
  },
  methods: {
    chatLink(item)
    {

      if (!this.firstChange)
      {
        this.items[item.index].icon = 'pi pi-circle-fill';
        this.items[this.currentItem].icon = this.items[this.currentItem].defaultIcon;
        this.currentItem = item.index;
      }
      else
      {
        this.currentItem = item.index;
        this.items[item.index].icon = 'pi pi-circle-fill';
        this.firstChange = false;
      }
    }
  }
}
</script>

<style scoped>
  .component {
    display: flex;
    align-items: flex-end;
  }
  #tabstrip .p-tabmenuitem  {
    color: red;
  }
</style>