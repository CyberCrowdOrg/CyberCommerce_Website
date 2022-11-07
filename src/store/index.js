import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [createPersistedState({
        key: 'vuex'
    })],
    state: {
        loginStatus:false,
        isLinkAccount:false,
    },
    getters: {

    },
    mutations: {
        setLoginStatus(state, status){
            state.loginStatus = status;
        },
        setLinkAccountStatus(state, status){
            state.isLinkAccount = status;
        },
    }
})

export default store
