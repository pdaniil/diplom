<template>
  <div class="searchPage">
    <div class="headLine">
      Поиск товаров
    </div>
    <div class="content_place">
      <div class="search_window">
        <div class="searchString">
          <div>&nbsp;</div>
          <MySearchString :articleSearch="article" :load="onload" @article="startSearch"></MySearchString>
        </div>
        <div class="onload text-center mt-3 mb-1" v-if="onload">
          Идёт поиск товаров <i class="pi pi-spin pi-spinner" style="font-size: 1.5rem"></i>
        </div>
        <div class="onload text-center mt-3 mb-1" v-if="first_open">
          Тут отобразятся результаты поиска
        </div>
        <!--Таблица по запросу-->
        <div class="tableResult" v-if="isset_request">
          <div>&nbsp;</div>
          <MyTableProducts :products="this.arrayRequest">Запрошенный артикул</MyTableProducts>
        </div>
        <div class="onload text-center mt-3 mb-1" v-else-if="!first_open && !onload">
          По данному артикулу нет рeзультатов
        </div>
        <!--Аналоги-->
        <div class="tableResult" v-if="isset_analogs">
          <div></div>
          <MyTableProducts :products="arrayAnalogs">Аналоги и заменители</MyTableProducts>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import MySearchString from "@/components/SearchPage/MySearchString";
import MyTableProducts from "@/components/SearchPage/MyTableProducts";
import Product from "@/classes/Product";

export default {
  name: "SearchPage",
  components: { MyTableProducts, MySearchString},
  data() {
    return {
      article: '',
      first_open: true,
      isset_request: false,
      isset_analogs: false,
      onload: false,
      response: [
        {id: 1, article: 'asd123123123', name: 'Насос водяной', brand: 'dolz23123123123123123', price: 23.1, exist: 100},
        {id: 2, article: 'C110', name: 'Насос водяной', description: 'Товар предназначен для терки полов.', brand: 'dolz', price: 23.1, exist: 100},
        {id: 3, article: 'asd', name: 'Насос водяной', brand: 'dolz', price: 30, exist: 100},
        {id: 4, article: 'asd', name: 'Насос водяной', brand: 'dolz', price: 23.1, exist: 100},
        {id: 5, article: 'asd', name: 'Насос водяной', brand: 'dolz', price: 23.1, exist: 100},
        {id: 6, article: 'asd', name: 'Насос водяной', brand: 'dolz', price: 23.1, exist: 100},
        {id: 7, article: 'asd', name: 'Насос водяной', brand: 'dolz', price: 23.1, exist: 100},
        {id: 8, article: 'asd', name: 'Насос водяной', brand: 'dolz', price: 23.1, exist: 100},
        {id: 9, article: 'asd', name: 'Насос водяной', brand: 'dolz', price: 23.1, exist: 100},
        {id: 10, article: 'asd', name: 'Насос водяной', brand: 'dolz', price: 23.1, exist: 100},
        {id: 11, article: 'asd', name: 'Насос водяной', brand: 'dolz', price: 23.1, exist: 100},
        {id: 12, article: 'asd', name: 'Насос водяной', brand: 'dolz', price: 22, exist: 100},
        {id: 13, article: 'asd', name: 'Насос водяной', brand: 'dolz', price: 100, exist: 100},
      ],

      arrayRequest: [],
      arrayAnalogs: [],
    }
  },
  methods: {
    startSearch( article ){
      this.first_open = false;
      this.article = article;
      this.onload = true;

      this.arrayRequest = [];
      this.arrayAnalogs = [];

      this.fetchProducts();

      let modRequest = 0;
      let modAnalogs = 0;

      this.response.forEach((el, index) => {
          let product = new Product(el);

          if (product.article == this.article)
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

            setTimeout(()=> {this.arrayAnalogs.push(product);}, 1000 *  (index + 1));
            this.isset_analogs = true;
          }
          setTimeout(()=> {this.onload = false;}, 14000);

      });

    },
    fetchProducts() {
        //Выполняем API запрос
    }
  },
  mounted() {

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
    grid-template-columns: 1fr 4fr;
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
    padding: 20px;
  }
  .content_place:last-child {
    padding: 20px;
  }
  .searchString {
      display: grid;
      grid-template-columns: 1fr 30fr;
  }
  .tableResult {
    display: grid;
    grid-template-columns: 1fr 30fr;
  }

</style>