import { createStore } from 'vuex'


const widthScreen = {
    state: () => ({
        fullScreen: false,
        middleScreen: false,
        smallScreen: false
    }),
    mutations: {
        changeScreen(state, obj){
            state.fullScreen = obj.fullScreen;
            state.middleScreen = obj.middleScreen;
            state.smallScreen = obj.smallScreen;
        }
    }
}

const shopCart = {
    state: () => ({
        products: [],
        countProduct: 0,
        totalPrice: 0
    }),
    mutations: {

        appendProduct(state, product) {
            state.products.push(product);
            state.countProduct++;
        },

        removeProduct(state, product) {
            state.products = state.products.filter(el => el.id != product.id);
            state.countProduct--;
        }
    }
}

export const store = createStore({
            modules: {
                screenState: widthScreen,
                cart: shopCart
            },
        })



