export default
    class User {
        constructor(  ) {
            this.name = '';
            this.email = '';
            this.token = '';
        }

        fetchUserData() {

        }

        storeTokenByCookie(token )  {
            document.cookie = "token=" + token + '; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT';
        }

        resetCookie() {
            document.cookie = "token=";
        }

        getTokenByCookie(token = 'token') {
            let matches = document.cookie.match(new RegExp(
                "(?:^|; )" + token.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"
            ));
            return matches ? decodeURIComponent(matches[1]) : '';
        }



        login( token ) {
            if (token != null)
                this.storeTokenByCookie( token );

            this.token = this.getTokenByCookie();

            this.fetchUserData();
        }

        logout() {
            this.name = '';
            this.email = '';
            this.token = '';
            this.resetCookie();
        }

        tryInit() {
            this.token = this.getTokenByCookie();
            if ( this.token != '')
                this.login( this.token );
            else
                return false;

            return true;
        }
    }
