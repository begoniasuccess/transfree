import Vue from "vue";
import Vuex from 'vuex';
import {GLOBAL_FONT_SIZE_NORMAL, GLOBAL_UPDATE_FREQUENCY_FAST} from "../constant/common";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        fontSize: GLOBAL_FONT_SIZE_NORMAL,
        updateFrequency: GLOBAL_UPDATE_FREQUENCY_FAST
    },
    mutations: {
        setFontSize(state, fontSize) {
            state.fontSize = fontSize;
        },
        setUpdateFrequency(state, updateFrequency) {
            state.updateFrequency = updateFrequency;
        }
    },
    actions: {
        setFontSize(context, fontSize) {
            context.commit('setFontSize', fontSize);
        },
        setUpdateFrequency(context, updateFrequency) {
            context.commit('setUpdateFrequency', updateFrequency);
        }
    },
    getters: {
        getFontSize(state) {
            return state.fontSize;
        },
        getUpdateFrequency(state) {
            return state.updateFrequency;
        }
    }
})

export default store;
