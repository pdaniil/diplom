<template>
  <div class="linked_list">
    <div  @click="toLink(link.to, link.id)" class="linked_item" v-bind:class="{ active: link.isActive }" v-for="link in links" :key="link.id">
      <div class="content"><i v-bind:class="link.icon"></i> {{link.content}}</div>
      <transition name="fade">
        <div v-show="link.isActive" class="border__active"></div>
      </transition>
        <div v-show="!link.isActive" class="border"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LinkList",
  data() {
    return {
      links: [
        {id: 0, to: '/', isActive: false, content: 'Главная', icon: 'pi pi-home'},
        {id: 1, to: '/search', isActive: false, content: 'Поиск товаров', icon: 'pi pi-search'},
        {id: 2, to: '/chat', isActive: false, content: 'Сообщения', icon: 'pi pi-envelope'}
      ],
      currentLinkId: null,
      currentLink: ''
    }
  },
  methods: {
    toLink(path, id) {
        this.$router.push(path);
        if (this.currentLinkId != null)
          this.links[this.currentLinkId].isActive = false;

        this.links[id].isActive = true;
        this.currentLinkId = id;
    }
  },
  mounted() {
  },
  watch:{
    $route() {
      this.currentLink = this.$route.path;
      this.links.forEach((el) => {
        if (el.to == this.currentLink)
          this.toLink(el.to, el.id);
      });
    }
  }
}
</script>

<style scoped>
  .linked_list {
    display: flex;
  }
  .linked_list .linked_item {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
    cursor: pointer;
  }
  .linked_list .active {
    cursor: default;
  }
  .linked_list .active .border {
    border-bottom: 2px solid var(--gray-300);
    width: 120%;
  }
  .linked_list .active .border__active {
    border-bottom: 2px solid var(--green-300);
    padding: 0px 120%;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

</style>