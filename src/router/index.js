import Vue from "vue";
import VueRouter from "vue-router";
import SearchBus from "../components/SearchBus";
import Settings from "../components/Settings";
import EstimatedTimeOfArrival from "../components/EstimatedTimeOfArrival";
import SearchList from "../components/SearchList";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/search-bus",
    },
    {
      path: "/search-bus",
      name: "SearchBus",
      component: SearchBus,
      children: [
        {
          path: "estimated-time-of-arrival/:city/:routeName",
          name: "EstimatedTimeOfArrival",
          component: EstimatedTimeOfArrival,
        },
        {
          path: "search-list/:city",
          name: "SearchList",
          component: SearchList,
        },
      ],
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings,
    },
  ],
});
