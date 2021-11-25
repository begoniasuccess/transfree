/* eslint-disable */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import tw from './tw.json';
import en from './en.json';
import {GLOBAL_MULTILINGUAL_CHINESE} from "../constant/common";

Vue.use(VueI18n);

//default
const locale = GLOBAL_MULTILINGUAL_CHINESE;

const messages = {
    tw, en
}

const i18n = new VueI18n({
    locale,
    messages
})

export default i18n;
