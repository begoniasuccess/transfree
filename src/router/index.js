import Vue from "vue";
import VueRouter from "vue-router";
import SearchBus from "../components/SearchBus";
import SearchList from "../components/SearchList";
import Settings from "../components/Settings";
import EstimatedTimeOfArrival from "../components/EstimatedTimeOfArrival";
import CommonlyUsedBus from "../components/CommonlyUsedBus";
import BlankList from "../components/BlankList";
import NearbyStop from "../components/NearbyStop";

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
          path: "",
          name: "BlankList",
          component: BlankList,
        },
        {
          path: "search-list",
          name: "SearchList",
          component: SearchList,
        },
        {
          path: "estimated-time-of-arrival/:city/:routeName",
          name: "EstimatedTimeOfArrival",
          component: EstimatedTimeOfArrival,
        },
        {
          path: "/:city/:routeName",
          name: "SearchList",
          component: SearchList,
        },
      ],
    },
    {
      path: "/commonly-used-bus",
      name: "CommonlyUsedBus",
      component: CommonlyUsedBus,
      children: [
        {
          path: "estimated-time-of-arrival/:city/:routeName",
          name: "EstimatedTimeOfArrival",
          component: EstimatedTimeOfArrival,
        },
      ],
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings,
    },
    {
      path: "/nearby-stop",
      name: "NearbyStop",
      component: NearbyStop,
    },
  ],
});
