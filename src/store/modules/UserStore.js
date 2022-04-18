const user = {
    state: () => ({
        authentication: {
            email: '',
            password: ''
        },
        registration: {
            'email': '',
            'name' : '',
            'password' : '',
            'password_confirmed': ''
        },
        profile: {
            'email': '',
            'name' : '',
            'password' : '',
            'avatar' : ''
        },
        is_admin: false,
        is_auth: false,
        auth_token: '',
    }),
    mutations: {
        setAuthEmail( state, value ) {
            state.authentication.email = value;
        },
        setAuthPassword( state, value ) {
            state.authentication.password = value;
        },
        setRegEmail( state, value ) {
            state.registration.email = value;
        },
        setRegPassword( state, value ) {
            state.registration.password = value;
        },
        setRegPasswordConf( state, value ) {
            state.registration.password_confirmed = value;
        },
        setRegName( state, value ) {
            state.registration.name = value;
        },

        setUserLogin( state ) {
            state.is_auth = true;
        },

        setUserToken( state, token ) {
            state.auth_token = token;
        }

    },
    actions: {
        setEmail( { commit }, value ) {
            let handler = value.type == 'login' ? commit('setAuthEmail', value.value) : commit('setRegEmail', value.value);
            return handler;
        },
        setPassword( { commit }, value ) {
            let handler = value.type == 'login' ? commit('setAuthPassword', value.value) : commit('setRegPassword', value.value);
            return handler;
        },
        setName( { commit }, value ) {
          commit('setRegName', value.value);
        },
        setPasswordConfirm( { commit }, value ) {
            commit('setRegPasswordConf', value.value);
        },
        loginUser( {commit}, value ) {
            commit( 'setUserLogin' );
            commit( 'setUserToken', value );
        }
    }
}

export default user;