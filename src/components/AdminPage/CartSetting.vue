<template>
  <div class="container" :class="params.class" @click="params.callback">
    <Card class="card-setting">
      <template #title>
        {{params.title}}
      </template>
      <template #subtitle>
        {{params.subtitle}}
      </template>
      <template #content>
        {{params.content}}
      </template>
    </Card>
  </div>

</template>

<script>
export default {
  props: {
      params: Object
  },
  name: "CartSetting"
}
</script>

<style>
    .p-card  .p-card-body {
      min-height: 250px;
    }
    .success-100 .p-card  .p-card-body {
      background: var(--green-100) !important;
    }
    .success-200 .p-card  .p-card-body {
      background: var(--green-200) !important;
    }
    .success-300 .p-card  .p-card-body {
      background: var(--green-200) !important;
    }
    .purple-100 .p-card .p-card-body {
      background: var(--purple-100) !important;
    }
    .purple-200 .p-card .p-card-body {
      background: var(--purple-200) !important;
    }
    .purple-300 .p-card .p-card-body {
      background: var(--purple-300) !important;
    }
    .cyan-100 .p-card .p-card-body {
      background: var(--cyan-100) !important;
    }
    .cyan-200 .p-card .p-card-body {
      background: var(--cyan-200) !important;
    }
    .cyan-300 .p-card .p-card-body {
      background: var(--cyan-300) !important;
    }
    .yellow-100 .p-card .p-card-body {
      background: var(--yellow-100) !important;
    }
    .yellow-200 .p-card .p-card-body {
      background: var(--yellow-200) !important;
    }
    .yellow-300 .p-card .p-card-body {
      background: var(--yellow-300) !important;
    }
</style>