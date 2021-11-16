import Vue from "vue";
import VueRouter from 'vue-router'
import SearchBus from "../components/SearchBus";
import SearchBus from "../components/Settings";
import EstimatedTimeOfArrival from "../components/EstimatedTimeOfArrival";

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
            component: SearchBus,
            children: [
                {
                    path: 'estimated-time-of-arrival/:city/:routeName',
                    name: 'EstimatedTimeOfArrival',
                    component: EstimatedTimeOfArrival
                }
            ]
        },
        {
            path: '/settings',
            name: 'Settings',
            component: Settings
        }
    ]
})
