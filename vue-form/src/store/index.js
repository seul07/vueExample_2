import Vue from 'vue';
import Vuex from 'vuex';
import {
    getAuthFromCookie,
    getUserFromCookie,
    saveAuthToCookie,
    saveUserToCookie,
} from '@/utils/cookies';
import { loginUser } from '@/api/auth';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        memId: getUserFromCookie() || '',
        token: getAuthFromCookie() || '',
    },
    getters: {
        isLogin(state) {
            console.log('islogin???');
            console.log(state);
            return state.memId !== '';
        },
    },
    mutations: {
        setUsername(state, memId) {
            state.memId = memId;
        },
        clearUsername(state) {
            console.log(state);
            state.memId = '';
        },
        setToken(state, token) {
            state.token = token;
        },
        clearToken(state) {
            console.log(state.token);
            state.token = '';
        },
    },
    actions: {
        async LOGIN({ commit }, userData) {
            const { data } = await loginUser(userData);
            commit('setToken', data.token);
            commit('setUsername', data.resultMap.data.memId);
            saveAuthToCookie(data.token);
            saveUserToCookie(data.resultMap.data.memId);
            return data;
        },
    },
});