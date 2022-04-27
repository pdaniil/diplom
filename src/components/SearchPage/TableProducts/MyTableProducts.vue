<template>
  <div v-if="arrayLength > 0">
    <h3><slot></slot></h3>
    <div class="table__products" >
      <MyTableHeader :table="table"></MyTableHeader>
      <div class="table__body" >
        <MyTableRow v-for="product in arrCurrentPage" :key="product.index" :darkBack="(product.index % 2) == 0" :product="product"></MyTableRow>
      </div>
    </div>
    <Paginator :rows="10" :totalRecords="arrayLength" @page="changePage" :pageLinkSize="3"></Paginator>
  </div>
</template>

<script>

import MyTableHeader from "@/components/SearchPage/TableProducts/MyTableHeader";
import MyTableRow from "@/components/SearchPage/TableProducts/MyTableRow";
export default {
  name: "MyTableProducts",
  props: {
    products: Array,
    table: String,
    isCart: Boolean
  },
  components: {
    MyTableHeader, MyTableRow
  },
  data() {
    return {
        currentPage: 1,
        currentTable: String
    }
  },
  methods: {
      changePage( event ) {
          this.currentPage = event.page + 1;
      },
      byField( field, sub, direction ) {
          let arr = [];
          sub.forEach((a) => {
            let keysA = Object.keys(a);
            let valuesA = Object.values(a);

            let arrA = [];
            keysA.forEach((el, index) => {
              arrA[el] = valuesA[index];
            });
            arr.push(arrA);
          });

          return arr.sort( function (a, b) {
              if (direction)
              {
                if (a[field] > b[field])
                  return 1;
                else if (a[field] < b[field])
                  return -1;

                return 0;
              }
              else {
                if (a[field] < b[field])
                  return 1;
                else if (a[field] > b[field])
                  return -1;

                return 0;
              }
          });
      },
  },
  computed: {
      arrCurrentPage() {
        let arr = [];

        //pagination
        this.filteredArray.forEach((el, index) => {
            if (index < (this.currentPage * 10) && index >= this.currentPage * 10 - 10)
              arr.push(el);
        });

        return arr;
      },
      sortedArray() {
          let arr = [];
          arr = this.products;

          if (this.table == 'request')
          {
              switch (true) {
                  case this.$store.state.sorted.request.byDate :
                      arr =  this.byField('time', arr, this.$store.state.sorted.request.direction);
                    break;
                case this.$store.state.sorted.request.byExist :
                    arr =  this.byField('exist', arr, this.$store.state.sorted.request.direction);
                  break;
                case this.$store.state.sorted.request.byPrice :
                    arr =  this.byField('price', arr, this.$store.state.sorted.request.direction);
                  break;
                case this.$store.state.sorted.request.byBrand :
                    arr =  this.byField('brand', arr, this.$store.state.sorted.request.direction);
                  break;
              }
          }
          else if (this.table == 'analogs')
          {
            switch (true) {
              case this.$store.state.sorted.analogs.byDate :
                  arr =  this.byField('time', arr, this.$store.state.sorted.analogs.direction);
                break;
              case this.$store.state.sorted.analogs.byExist :
                  arr =  this.byField('exist', arr, this.$store.state.sorted.analogs.direction);
                break;
              case this.$store.state.sorted.analogs.byPrice :
                  arr =  this.byField('price', arr, this.$store.state.sorted.analogs.direction);
                break;
              case this.$store.state.sorted.analogs.byBrand :
                  arr =  this.byField('brand', arr, this.$store.state.sorted.analogs.direction);
                break;
            }
          }
          return arr;
      },
      filteredArray() {
        let arr = this.sortedArray;
        if (this.$store.state.filter.selectedBrands.length > 0)
          arr = this.sortedArray.filter(a => this.$store.state.filter.selectedBrands.includes( a.brand ));

        if (this.$store.state.filter.selectedStorages.length > 0)
          arr = this.sortedArray.filter(a => this.$store.state.filter.selectedStorages.includes( a.storage ));

        return arr.filter(a => this.$store.state.filter.selectedPrice[0] <= a.price && a.price <= this.$store.state.filter.selectedPrice[1] && this.$store.state.filter.selectedExist < a.exist);

      },
      arrayLength() {
          document.querySelectorAll('.p-paginator').forEach((el) => {
              el.style.display = 'none';
              el.style.display = 'flex';
          });
          return this.filteredArray.length;
      }
  },
  mounted() {
    this.arrayLength = this.products.length;
    this.currentTable = this.table;
  }
}
</script>

<style scoped>

</style>