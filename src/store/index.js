import Vue from "vue";
import Vuex from 'vuex';
import {GLOBAL_FONT_SIZE_NORMAL} from "../constant/common";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        fontSize: GLOBAL_FONT_SIZE_NORMAL
    },
    mutations: {
        setFontSize(state, fontSize) {
            state.fontSize = fontSize;
        }
    },
    actions: {
        setFontSize(context, fontSize) {
            context.commit('setFontSize', fontSize);
        }
    },
    getters: {
        getFontSize(state) {
            return state.fontSize;
        }
    }
})

export default store;
