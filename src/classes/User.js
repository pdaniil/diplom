import Cart from "@/classes/Cart";
import Cookie from "@/classes/CookieHelper";
export default
    class User {
        static object = null;
        constructor( store ) {
            if ( User.object == null)
            {
                this.id = 0;
                this.name = '';
                this.email = '';
                this.token = '';
                this.is_admin = false;
                this.store = store;
                this.cart = new Cart( store );
                this.tryInit();
            }
            else
                return  User.object;
        }

        //HELPERS////////////////////////////////////////////////
        tryInit() {
            this.token = Cookie.getByCookie('token');
            if ( this.token != '')
            {
                this.login( this.token );
                this.store.dispatch('loginUser', this.token);
                User.object = this;
            }
            else
                return false;
            return true;
        }

        getUserDataByObject() {
            const user = {
                email : this.email,
                name : this.name,
                id: this.id
            };
            return user;
        }

        setUserDataAfterFetch( user_data ) {
            this.id = user_data.id;
            this.email = user_data.email;
            this.name = user_data.name;
            this.is_admin = user_data.is_admin == 1 ? true : false;
            this.store.dispatch('setUserData', this.getUserDataByObject());
            this.initCart( user_data.id );
        }


        //HELPERS END////////////////////////////////////////////////


        //CART/////////////////////////////////////////////////////////////////////////

        initCart() {
            this.cart.initCart( this.id );
        }

        //CART END/////////////////////////////////////////////////////////////////////////


        //AUTH/////////////////////////////////////////////////////////////////////////////////

        login( token ) {
            if (token != null)
                Cookie.storeByCookie('token', token);

            this.token = Cookie.getByCookie('token');
            this.fetchUserData(this.token);
            this.store.dispatch('loginUser', token);
        }


        logout() {
            this.fetchLogout();
            this.name = '';
            this.email = '';
            this.token = '';
            Cookie.resetCookie('token');
            this.store.dispatch('logoutUser');
            this.store.dispatch('clearCart');
        }
        //AUTH END/////////////////////////////////////////////////////////////////////////////////

        //FETCHES//////////////////////////////////////////////////////////////////////////

        fetchUserData( token ) {
            var myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Authorization", "Bearer " + token);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("http://partshop.site/backend/public/api/profile", requestOptions)
                .then(response => response.json())
                .then((result) => {
                    this.setUserDataAfterFetch( result );
                })
                .catch((error) => {
                    console.log('error', error);
                    return false;
                });
        }


        fetchLogout() {
            let myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Authorization", "Bearer " + this.token);

            let requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("http://partshop.site/backend/public/api/logout", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        }

        //FETCHES END//////////////////////////////////////////////////////////////////////////

    }
