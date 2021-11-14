import Vue from "vue";
import VueRouter from 'vue-router'
import SearchBus from "../components/SearchBus";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/search-bus'
        },
        {
            path: '/search-bus',
            name: 'SearchBus',
            component: SearchBus
        }
    ]
})
