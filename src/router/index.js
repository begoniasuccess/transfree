import Vue from "vue";
import VueRouter from "vue-router";
import SearchBus from "../components/SearchBus";
import SearchList from "../components/SearchList";
import SearchMap from "../components/SearchMap";
// import NearbyMap from "../components/NearbyMap";
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
          path: "/:city/:routeName",
          name: "SearchList",
          component: SearchList,
        },
        {
          path: "search-map/:city/:routeName",
          name: "SearchMap",
          component: SearchMap,
        },
        {
          path: "estimated-time-of-arrival/:city/:routeName",
          name: "EstimatedTimeOfArrival",
          component: EstimatedTimeOfArrival,
        }        
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
      children: [
        {
          path: "",
          name: "BlankList",
          component: BlankList,
        },
        {
          path: "/:city/:routeName",
          name: "SearchList",
          component: SearchList,
        },
        // {
        //   path: "nearby-map/:city",
        //   name: "NearbyMap",
        //   component: NearbyMap,
        // },
        {
          path: "estimated-time-of-arrival/:city/:routeName",
          name: "EstimatedTimeOfArrival",
          component: EstimatedTimeOfArrival,
        }        
      ],
    },
  ],
});
