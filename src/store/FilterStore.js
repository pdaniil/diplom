const filter = {
    state: () => ({
        minPrice : 99999999.00,
        maxPrice : 0.00,
        selectedPrice: [0, 99999999.00],
        brands : [],
        selectedBrands: [],
        showAnalogs : true,
        showRequest : true,
        maxExist : 0,
        selectedExist: 0,
        showFilter: true,
        onloadFilter: false,
        storages : [],
        selectedStorages: [],
    }),
    mutations: {
        resetBrands( state ) {
          state.brands = [];
          state.storage = [];
        },
        setMinPrice( state, price ) {
            state.minPrice = state.minPrice > price ? price : state.minPrice;
        },

        setMaxPrice( state, price ) {
            state.maxPrice = state.maxPrice < price ? price : state.maxPrice;
        },

        appendBrand( state, brand ) {
            return state.brands.includes( brand )  ? "" : state.brands.push( brand );
        },
        appendStorage(state, storage) {
            return state.storages.includes( storage )  ? "" : state.storages.push( storage );
        },
        changeExist( state, exist ) {
            state.maxExist = state.maxExist < exist ? exist : state.maxExist;
        },

        changeAnalogs( state ) {
            state.showAnalogs = !state.showAnalogs;
        },
        changeRequest( state ) {
            state.showRequest = !state.showRequest;
        },
        changeSelectedBrands( state, brands ) {
            state.selectedBrands = [];
            brands.forEach((el) => {
                state.selectedBrands.push(el.value);
            });
        },
        changeSelectedStorages( state, storages ) {
            state.selectedStorages = [];
            storages.forEach((el) => {
                state.selectedStorages.push(el.value);
            });
        },
        changeSelectedPrice( state, price ) {
            state.selectedPrice = [];
            state.selectedPrice.push(price[0]);
            state.selectedPrice.push(price[1]);
            console.log(state.selectedPrice);
        },
        changeSelectedExist( state, exist ) {
            state.selectedExist = exist;
        },
        resetFilter( state ) {
            state.selectedBrands = [];
            state.selectedPrice = [0, 99999999.00];
            state.showAnalogs = true;
            state.showRequest = true;
            state.selectedExist  = 0;

        }
    }
}

export default filter;