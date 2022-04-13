const sorted = {
    state: () => ({
        request: {
            byPrice: true,
            byDate: false,
            byExist: false,
            byBrand: false,
            direction: true
        },
        analogs: {
            byPrice: true,
            byDate: false,
            byExist: false,
            byBrand: false,
            direction: true
        }
    }),
    mutations: {
        request(state, objState) {
            state.request = objState;
        },
        analogs(state, objState){
            state.analogs = objState;
        }
    },
    actions: {
        sort( context , setting ) {


            let objState = setting.table == 'request' ? context.state.request : context.state.analogs;
            objState = setting.handler(objState);

            if (setting.table == 'request')
                context.commit('request', objState);
            else
                context.commit('analogs', objState);
        }
    }
}

export default sorted;