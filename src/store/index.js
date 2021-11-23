import Vue from "vue";
import Vuex from 'vuex';
import {GLOBAL_FONT_SIZE_NORMAL, GLOBAL_UPDATE_FREQUENCY_FAST} from "../constant/common";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        fontSize: GLOBAL_FONT_SIZE_NORMAL, /*字體大小*/
        isAutoUpdate: true, /*是否自動更新*/
        updateFrequency: GLOBAL_UPDATE_FREQUENCY_FAST /*自動更新頻率秒數*/
    },
    mutations: {
        setFontSize(state, fontSize) {
            state.fontSize = fontSize;
        },
        setIsAutoUpdate(state, isAutoUpdate) {
            state.isAutoUpdate = isAutoUpdate;
        },
        setUpdateFrequency(state, updateFrequency) {
            state.updateFrequency = updateFrequency;
        }
    },
    actions: {
        setFontSize(context, fontSize) {
            context.commit('setFontSize', fontSize);
        },
        setIsAutoUpdate(context, isAutoUpdate) {
            context.commit('setIsAutoUpdate', isAutoUpdate);
        },
        setUpdateFrequency(context, updateFrequency) {
            context.commit('setUpdateFrequency', updateFrequency);
        }
    },
    getters: {
        getFontSize(state) {
            return state.fontSize;
        },
        getIsAutoUpdate(state) {
            return state.isAutoUpdate;
        },
        getUpdateFrequency(state) {
            return state.updateFrequency;
        }
    }
})

export default store;
