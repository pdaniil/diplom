const shopCart = {
    state: () => ({
        products: [],
        countProducts: 0,
        totalPrice: 0,
        user_id: 0
    }),
    mutations: {

        appendProduct(state, product) {
            state.products.push(product);
            state.countProducts++;
        },

        removeProduct(state, product) {
            state.products = state.products.filter(el => JSON.stringify( el ) != JSON.stringify(product) );
            state.countProducts--;
        },

        changeTotalPrice( state, obj) {
                  state.totalPrice += obj.flag == true ? obj.price : -obj.price;
        },

        initCart( state, cart ) {
            state.products = cart.products;
            state.totalPrice = cart.totalPrice;
            state.countProducts = cart.countProducts;
            state.user_id = cart.user_id;
        },
        clearCart( state ) {
            state.products = [];
            state.countProducts = 0;
            state.user_id = 0;
            state.totalPrice = 0;
        }
    },
    actions: {
        setCartData( {commit}, cart ) {
            commit('initCart', cart);
        },

        pushProductToCart( { commit }, product ) {
            commit('changeTotalPrice', {price: product.price * product.count, flag : true});
            commit('appendProduct', product);
        },

        deleteProductFromCart( { commit }, product  ) {
            commit('changeTotalPrice', {price: product.price * product.count, flag : false});
            commit('removeProduct', product);
        },
        clearCart( {commit} ) {
            commit('clearCart');
        }
    }
}

export default shopCart;