import Vue from "vue";
import VueRouter from 'vue-router';
import SearchBus from "../components/SearchBus";
import Settings from "../components/Settings";
import EstimatedTimeOfArrival from "../components/EstimatedTimeOfArrival";
import Map from "../components/Map";
import Test from "../components/Test";

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
                },
                {
                    path: 'map',
                    name: 'Map',
                    component: Map
                },
                {
                  path: 'test',
                  name: 'Test',
                  component: Test
              },
            ]
        },
        {
            path: '/settings',
            name: 'Settings',
            component: Settings
        }
    ]
})
