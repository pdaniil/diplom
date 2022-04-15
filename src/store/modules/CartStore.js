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

export default shopCart;