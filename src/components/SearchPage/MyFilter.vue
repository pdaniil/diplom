<template>
  <Sidebar v-model:visible="visibleLeft">
    <div class="filter">
      <h3>Фильтры</h3>
      <div class="fields" v-if="this.$store.state.filter.showFilter">
        <div class="filter_property">
          <div class="property_description">
            Показ запрошенных: <Checkbox name="showRequest" @click="this.$store.commit('changeRequest')" value="showRequest" v-model="showTables"></Checkbox>
          </div>
        </div>

        <div class="filter_property">
          <div class="property_description">
            Показ аналогов: <Checkbox name="showAnalogs" @click="this.$store.commit('changeAnalogs')" value="showAnalogs" v-model="showTables"></Checkbox>
          </div>
        </div>

        <div class="filter_property" id="brands">
          <div class="property_input_value">
            <MultiSelect
                v-model="selectedBrands"
                :options="allBrands"
                filter="true"
                maxSelectedLabels="2"
                selectedItemsLabel="Выбрано { this.selectedBrands.length }"
                optionLabel="brand" placeholder="Выберите брэнды"/>
          </div>
        </div>

        <div class="filter_property">
          <div class="property_description">
            Цена: от {{this.price[0]}} до {{this.price[1]}}
          </div>
          <div class="property_input_value">
            <Slider v-model="price" :range="true" :min="0" :max="this.$store.state.filter.maxPrice" @slideend="changePrice"/>
          </div>

        </div>
        <div class="filter_property">
          <div class="property_description">
            Минимальное количество: {{exist}}
          </div>
          <div class="property_input_value">
            <Slider v-model="exist"  :min="0" :max="this.$store.state.filter.maxExist" :step="1"  @slideend="changeExist"/>
          </div>

        </div>
        <div class="filter_property" id="storages">
          <div class="property_input_value">
            <MultiSelect
                v-model="selectedStorages"
                :options="allStorages"
                filter="true"
                maxSelectedLabels="2"
                selectedItemsLabel="Выбрано { this.selectedStorages.length }"
                optionLabel="storage" placeholder="Выберите склады"/>
          </div>
        </div>
      </div>
    </div>
  </Sidebar>
  <Button icon="pi pi-filter-slash"  class="p-button-danger p-button-outlined mt-5 " @click="resetFilter" />
  <Button icon="pi pi-filter" label="Фильтры" class="p-button-success mt-5 ml-1" @click="visibleLeft = true"/>
</template>

<script>


export default {
  name: "MyFilter",
  props: {
  },
  data() {
    return {
        showTables: [],
        selectedBrands: null,
        selectedStorages: null,
        allBrands: [],
        allStorages: [],
        price: [0, this.$store.state.filter.maxPrice],
        exist: this.$store.state.filter.maxExist,
        visibleLeft: false
    }
  },
  methods: {
      changePrice( event ) {
        this.$store.commit('changeSelectedPrice', event.value);
      },
      changeExist( event ) {
        this.$store.commit('changeSelectedExist', event.value);
      },
      resetFilter() {
        this.$store.commit('resetFilter');
        this.showTables = [];
        this.showTables.push('showAnalogs');
        this.showTables.push('showRequest');
        this.selectedBrands = [];
        this.selectedStorages = [];
        this.price =  [0, this.$store.state.filter.maxPrice];
        this.exist = this.$store.state.filter.maxExist;
      }
  },
  watch: {
      selectedBrands( value ) {
          //value - array of Proxy {brand - value}
          this.$store.commit('changeSelectedBrands', value);
      },
      selectedStorages( value ) {
        //value - array of Proxy {brand - value}
          this.$store.commit('changeSelectedStorages', value);
      }
  },
  mounted() {
      if (this.$store.state.filter.showAnalogs)
        this.showTables.push('showAnalogs');

      if (this.$store.state.filter.showRequest)
        this.showTables.push('showRequest');

      this.$store.state.filter.brands.forEach((el) => {
        let obj = { brand: el, value: el };
        this.allBrands.push(obj);
      });
      this.$store.state.filter.storages.forEach((el) => {
        let obj = { storage: el, value: el };
        this.allStorages.push(obj);
      });
  }
}
</script>

<style>
  .filter {
    margin-top: 20px;
  }
  .fields {

  }
  .filter_property {

  }
  .p-multiselect-panel {
    max-width: 270px;
  }
  .property_description {
    margin-top: 10px;
  }
  .property_input_value {
    margin-top: 10px;
  }
  .p-slider {
    width: 200px;
  }
</style>