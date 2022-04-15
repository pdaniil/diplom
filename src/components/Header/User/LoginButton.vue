<template>
  <div class="component">

    <div class="confirm" v-if="type == 'confirm'">
      <Button  :label="text" :icon="icon" iconPos="right" class="p-button-text"  @click="this.$emit('click')" />
    </div>
    <div class="confirm-mobile" v-if="type == 'confirm-mobile'">
      <Button  :label="text" :icon="icon" iconPos="right" class="p-button-rounded p-button-outlined p-button-success"  @click="this.$emit('click')" />
    </div>
    <div class="cancel" v-if="type == 'cancel'" >
      <Button  :label="text" :icon="icon" iconPos="right" class="p-button-text"  @click="this.$emit('click')" />
    </div>
    <div class="extra" v-if="type == 'extra'" >
      <Button  :label="text" :icon="icon" iconPos="right" class="p-button-text"  @click="this.$emit('click')" />
    </div>
    <div class="extra-mobile" v-if="type == 'extra-mobile'">
      <Button  :label="text" :icon="icon" iconPos="right" class="p-button-rounded p-button-outlined p-button-success"  @click="this.$emit('click')" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
      text: String,
      icon: String,
      type: String
  },
  name: "UserButton",
  data() {
    return {
    }
  }
}
</script>

<style>
  /*CONFIRM*/
  .component .confirm .p-button {
    min-width: 150px !important;
    border: 1px solid var(--green-400) !important;
  }
  .p-button:not(.p-disabled):focus {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: none !important;
  }
  .component .confirm .p-button-label {
    color: var(--green-500);
  }
  .component .confirm .p-button-icon {
    color: var(--green-400);
  }

  /*CANCEL*/
  .cancel .p-button {
    min-width: 150px !important;
    border: 1px solid var(--gray-400) !important;
  }
  .cancel .p-button-label {
    color: var(--gray-800);
  }
  .cancel .p-button-icon {
    color: var(--gray-400);
  }

  /*EXTRA*/

  .extra .p-button {
    min-width: 150px !important;
    border: 1px solid var(--purple-200) !important;
  }
  .extra .p-button-label {
    color: var(--purple-500);
  }
  .extra .p-button-icon {
    color: var(--purple-400);
  }

  /*confirm-mobile*/

  .confirm-mobile .p-button {
      width: 50px !important;
      height: 50px !important;
      border: 1px solid var(--green-300) !important;
  }
  .confirm-mobile .p-button .p-button-icon {
      font-size: 18px;
      color: var(--gray-400);
    }

  /*extra-mobile*/

  .extra-mobile .p-button {
    width: 50px !important;
    height: 50px !important;
    border: 1px solid var(--green-400) !important;
  }
  .extra-mobile .p-button .p-button-icon {
    font-size: 18px;
    color: var(--purple-200);
  }

</style>