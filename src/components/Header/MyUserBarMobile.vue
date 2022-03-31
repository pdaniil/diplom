<template>
  <div class="user_bar">
    <SpeedDial :model="items" direction="down" showIcon="pi pi-user" hideIcon="pi pi-chevron-up" buttonClass="p-button-success p-button-rounded p-button-outlined"></SpeedDial>
  </div>
</template>

<script>
import SpeedDial from 'primevue/speeddial';
export default {
  components: {
    SpeedDial
  },
  name: "MyUserBarMobile",
  data() {
    return {
      items: [
        {
          icon: 'pi pi-sign-in'
        },
        {
          icon: 'pi pi-user'
        },
        {
          icon: 'pi pi-user'
        },
        {
          icon: 'pi pi-user'
        },
        {
          icon: 'pi pi-user'
        },
        {
          icon: 'pi pi-user'
        },
        {
          icon: 'pi pi-user'
        },

      ],
    }
  }
}
</script>

<style>
.user_bar {
}
.p-speeddial {
  position: relative !important;
}
.p-speeddial-list {
  position: absolute;
  margin-top: 70px;
}
.user_bar .p-button {
  border: 1px solid var(--gray-600) !important;
}
.user_bar .p-button .p-button-icon {
  color: var(--green-300);
  font-size: 1.5rem !important;
  font-weight: 100 !important;
}

</style>