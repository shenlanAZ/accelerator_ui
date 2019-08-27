import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import account from "./modules/account";
import layout from "./layout";

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        login: login,
        account: account,
        layout: layout
    }
})