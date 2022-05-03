import { createStore } from 'vuex'
import filter from "@/store/modules/FilterStore";
import sorted from "@/store/modules/SortedStore";
import user from "@/store/modules/UserStore";
import widthScreen from "@/store/modules/ScreenStore";
import shopCart from "@/store/modules/CartStore";
import ordering from "@/store/modules/OrderingStore";

export const store = createStore({
            state: () => ({
                baseQueryUrl : 'http://partshop.site/backend/public/api/'
            }),
            modules: {
                screenState: widthScreen,
                cart: shopCart,
                filter: filter,
                sorted: sorted,
                user: user,
                ordering: ordering
            },
        })



