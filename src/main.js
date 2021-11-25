import Vue from "vue";
import App from "./App.vue";
import router from './router';
import axios from 'axios'
import VueAxios from 'vue-axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import store from "./store";
import i18n from "./lang/lang";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


export const app = new Vue({
  render: (h) => h(App),
  router,
  store,
  i18n
}).$mount("#app");
