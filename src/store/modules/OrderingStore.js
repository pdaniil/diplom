const ordering = {
    state: () => ({
        payment: '',
        delivery: '',
        products: []
    }),
    mutations: {
        setPayment( state, type ) {
            state.payment = type;
        },
        setDelivery( state, type ) {
            state.delivery = type
        },
        setProducts( state, products ) {
            state.products = products;
        }
    },
    actions: {
        payment( {commit}, type ) {
            commit('setPayment', type);
        },
        delivery( {commit}, type ) {
            commit('setDelivery', type);
        },
        products( {commit}, products) {
            commit('setProducts', products);
        }
    }
}

export default ordering;