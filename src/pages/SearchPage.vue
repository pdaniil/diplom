<template>
  <div class="searchPage">
    <div class="headLine">
      Поиск товаров
    </div>
    <div class="content_place">

      <div class="search_window">
        <div class="searchString">
          <div>&nbsp;</div>
          <MySearchString :articleSearch="article" :load="onload" @article="search"></MySearchString>
        </div>
        <div class="onload text-center mt-3 mb-1" v-if="onload">
          Идёт поиск товаров <i class="pi pi-spin pi-spinner" style="font-size: 1.5rem"></i>
        </div>
        <div class="onload text-center mt-3 mb-1" v-if="first_open">
          Тут отобразятся результаты поиска
        </div>

        <MyFilter v-if="(isset_request || isset_analogs) && !first_open && !onload"></MyFilter>

        <!--Таблица по запросу-->
        <div class="tableResult" v-if="isset_request && this.$store.state.filter.showRequest">
          <div>&nbsp;</div>
          <MyTableProducts :products="this.arrayRequest" :table="'request'">Запрошенный артикул</MyTableProducts>
        </div>
        <div class="onload text-center mt-3 mb-1" v-else-if="!first_open && this.$store.state.filter.showRequest && !onload">
          По данному артикулу нет рeзультатов
        </div>
        <!--Аналоги-->
        <div class="tableResult" v-if="isset_analogs && this.$store.state.filter.showAnalogs">
          <div></div>
          <MyTableProducts :products="arrayAnalogs" :table="'analogs'">Аналоги и заменители</MyTableProducts>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import MySearchString from "@/components/SearchPage/MySearchString";
import MyTableProducts from "@/components/SearchPage/TableProducts/MyTableProducts";
import Product from "@/classes/Product";
import MyFilter from "@/components/SearchPage/MyFilter";


export default {
  name: "SearchPage",
  components: {MyFilter, MyTableProducts, MySearchString},
  data() {
    return {
      article: '',
      first_open: true,
      isset_request: false,
      isset_analogs: false,
      onload: false,
      response: [],
      arrayRequest: [],
      arrayAnalogs: [],
      arrStoragesId: [],
    }
  },
  methods: {
    resetCurrentField(article) {
      this.isset_request = false;
      this.isset_analogs = false;
      this.first_open = false;
      this.article = article;
      this.onload = true;
      this.arrayRequest = [];
      this.arrayAnalogs = [];
    },
    appendProducts ( products ) {

      let modRequest = 0;
      let modAnalogs = 0;
      products.forEach((el) => {
        let product = new Product(el);

        if (product.article.toUpperCase() == this.article.toUpperCase())
        {
          if ((modRequest % 2) == 0)
            product.darkBack = true
          modRequest++;

          this.arrayRequest.push(product);
          this.isset_request = true;
        }
        else
        {
          if ((modAnalogs % 2) == 0)
            product.darkBack = true
          modAnalogs++;
          this.arrayAnalogs.push(product);
          this.isset_analogs = true;
        }

      });
    },
    search( article ) {
      this.$store.commit('resetBrands');

      this.resetCurrentField( article );
      let promiseArr = [];
      this.arrStoragesId.forEach((el) => {
        promiseArr.push(this.fetchProducts( el ));
      });

      Promise.all( promiseArr )
      .then(() => {
          console.log('done');
          this.onload = false;
          this.setFilterProperties();
      });
    },
    fetchStoragesId() {
        fetch('http://partshop.site/backend/public/api/get-storages-id')
            .then((response) => {
               return response.json();
            })
            .then((data) => {
              this.arrStoragesId = data.data;
            });
    },
    fetchProducts( id ) {
        const body = {
          "article" : this.article,
          "id" : id
        };
        const init =
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(body),
            };

        return fetch('http://partshop.site/backend/public/api/search', init)
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                this.appendProducts( data.products );
              });
    },
    setEachFilterField( array ) {
        array.forEach((el) => {
              this.$store.commit('setMinPrice', el.price);
              this.$store.commit('setMaxPrice', el.price);
              this.$store.commit('appendBrand', el.brand);
              this.$store.commit('changeExist', el.exist);
              this.$store.commit('appendStorage', el.storage);
        });
    },
    setFilterProperties() {
        this.setEachFilterField( this.arrayAnalogs );
        this.setEachFilterField( this.arrayRequest );
    }
  },
  mounted() {
      this.fetchStoragesId();
  }
}
</script>

<style scoped>
  .searchPage {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
  }
  .headLine {
    align-self: center;
    font-size: 48px;
    color: var(--gray-800);
    font-weight: 300;
  }
  .content_place {
    display: grid;

  }

  .onload {
    display: flex;
    justify-content: center;
    align-items: center;

  }
  .onload i {
    margin-left: 10px !important;
    font-size: 10px;
    color: var(--green-500);
  }
  .search_window {

  }
  .content_place:last-child {

  }
  .searchString {


  }
  .tableResult {

  }

</style>