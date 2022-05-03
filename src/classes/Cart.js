import Cookie from "@/classes/CookieHelper";
export default
class Cart {
    constructor( store ) {
        this.products = [];
        this.countProducts = 0;
        this.totalPrice = 0;
        this.user_id = 0;
        this.store = store;
    }

    getCartData() {
        let cart =
            { user_id: this.user_id, countProducts: this.countProducts, totalPrice: this.totalPrice, products: this.products };
        return cart;
    }

    initCart( user_id ) {
        this.user_id = user_id;
        const cookieCarts = Cookie.getByCookie('carts');
        if (cookieCarts == '' )
        {   let arrCarts = new Array();
            arrCarts.push(this.getCartData());
            Cookie.storeByCookie('carts', JSON.stringify(arrCarts));
        }
        else
        {
            let carts =  JSON.parse( cookieCarts );
            let userCart = carts.filter( el => el.user_id == user_id );
            if (userCart.length == 0)
            {
               carts.push( this.getCartData() );
               Cookie.storeByCookie('carts', JSON.stringify( carts ));
            }
            else
            {
                console.log(userCart);
                userCart = userCart[0];
                this.countProducts = userCart.countProducts;
                this.totalPrice = userCart.totalPrice;
                this.products = userCart.products;
            }
        }

        this.setCartByStore();

    }

    setCartByStore() {
        this.store.dispatch( 'setCartData', this.getCartData() );
    }


    static updateCarts ( user_id, store ) {
        const cookieCarts = Cookie.getByCookie('carts');
        let carts =  JSON.parse( cookieCarts );

        let userCart = carts.filter( el => el.user_id == user_id );
        userCart = userCart[0];

        userCart.products = store.state.cart.products;
        userCart.totalPrice = store.state.cart.totalPrice;
        userCart.countProducts = store.state.cart.countProducts;

        carts.forEach((el, index) => {
            if (el.user_id == user_id)
                carts[index] = userCart;
        });

        Cookie.storeByCookie('carts', JSON.stringify(carts));
    }
}
