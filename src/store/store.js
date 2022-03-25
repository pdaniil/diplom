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

export const store = createStore({
            modules: {
                screenState: widthScreen,
            },
        })



