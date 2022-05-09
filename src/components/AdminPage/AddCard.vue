<template>
  <div class="add_card" @click="callback">
    <i class="pi pi-plus" style="font-size: 5rem; color: var(--gray-500)"></i>
  </div>
</template>

<script>
export default {
  props: {
    callback: Function
  },
  name: "AddCard"
}
</script>

<style>
.add_card {
  border: 3px solid var(--gray-600);
  padding: 20px;
  width: 120px;
  border-radius: 3px;
  padding-top: 40px;
  padding-bottom: 40px;
  animation: out 0.2s ease-in-out;
  cursor: pointer;
}
@keyframes pulse {
  from { transform: scale(1); }
  to { transform: scale(1.1);  }
}
@keyframes out {
  from { transform: scale(1.1) }
  to { transform: scale(1) }
}
.add_card:hover {
  transform: scale(1.1);
  animation: pulse 0.2s ease-in-out;
  border-color: var(--green-500) !important;
}
</style>