<template>
  <div class="h_100 w_100">
    <div class="flex_row_cb w_100 h_100">
      <div class="flex_col w_100 h_100">
        <div class="content_list">
          <div class="list_top flex_row_cc">{{ $t("searchList") }}</div>
          <div class="list_bottom h_100 flex_col">
            <div class="select_scrollbar">
              <div
                class="list_inner"
                v-for="(bus, i) in searchBusList"
                :key="i"
              >
                <div class="flex_col" @click="getThisBus(bus)">
                  <p class="text_b">{{ bus.zh_tw }}</p>
                  <p class="text_sec">
                    {{ bus.departureStopNameZh }}-{{
                      bus.destinationStopNameZh
                    }}
                  </p>
                </div>
                <div class="flex_row_ce">
                  <i
                    class="i_love"
                    :class="{ 'i_love active': bus.isLove }"
                    @click="setLoveList(bus)"
                  ></i>
                  <i class="i_next" @click="getThisBus(bus)"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CITIES } from "../constant/city";
import {
  BUS_URL_V2,
  RESPONSE_DATA_FORMAT_JSON,
  sendRequest,
} from "../utils/https";
import { BusObj } from "../constant/bus";
import { getAllBus, addBus, removeBus } from "../utils/commonly-used-bus.js";

export default {
  name: "SearchList",
  props: {
    selectedCity: Object,
    search: String,
  },
  data() {
    return {
      cities: CITIES,
      selected: CITIES[0],
      open: false,
      isDynamicKeyboardShow: false,
      isBusInfoShow: false,
      searchBusList: new Array(), // 篩選過的List
      cityBusList: new Array(), // 完整的List
      routeName: String, // 路線名稱
      busNum: "", // 選擇的busNum
    };
  },
  mounted() {
    this.sendRequest();
  },
  methods: {
    sendRequest() {
      sendRequest(
        "get",
        `${BUS_URL_V2}/Route/City/${this.selectedCity.value}?&$format=${RESPONSE_DATA_FORMAT_JSON}`
      )
        .then((res) => {
          console.log("res=", res);
          this.searchBus(res);
          this.getLoveList();
          this.searchKeyWord();
        })
        .catch((err) => {
          window.alert("Get SearchList occurs error：" + err);
        });
    },
    searchBus(res) {
      this.searchBusList = [];
      this.cityBusList = [];
      res.data.forEach((element) => {
        const item = new BusObj(
          element.RouteUID,
          element.RouteName.Zh_tw,
          element.RouteName.En,
          element.DepartureStopNameZh,
          element.DestinationStopNameZh
        );
        this.searchBusList.push(item);
      });
      this.cityBusList = this.searchBusList;
    },
    searchKeyWord() {
      let tmplist = [];
      this.searchBusList = this.cityBusList;
      this.searchBusList.forEach((element) => {
        element.zh_tw.indexOf(this.search);
        if (element.zh_tw.indexOf(this.search) != -1) {
          tmplist.push(element);
        }
      });
      this.searchBusList = tmplist;
    },
    getThisBus(bus) {
      this.busNum = bus.zh_tw;
      this.order();
      this.$emit("getBusNum", this.busNum);
    },
    setLoveList(bus) {
      this.cityBusList.forEach((element) => {
        if (element.routeUID == bus.routeUID) {
          element.isLove = !bus.isLove;
        }
      });
      if (bus.isLove) {
        addBus(bus);
      } else {
        removeBus(bus);
      }
    },
    getLoveList() {
      let allBus = getAllBus();
      if (allBus == null) {
        return;
      }
      let tmpList = [];
      allBus.forEach((element) => {
        if (element.routeUID.substring(0, 3) == this.selectedCity.id) {
          tmpList.push(element);
        }
      });
      this.cityBusList.forEach((element) => {
        tmpList.forEach((tmpBus) => {
          if (tmpBus.routeUID == element.routeUID) {
            element.isLove = true;
          }
        });
      });
    },
    order() {
      this.$emit("showBusInfo");
      this.$router.push({
        name: "EstimatedTimeOfArrival",
        params: { city: this.selectedCity.value, routeName: this.busNum },
      });
    },
  },
  watch: {
    selectedCity: function () {
      this.sendRequest();
      this.getLoveList();
    },
    search: function () {
      this.searchKeyWord();
    },
  },
};
</script>

<style src="../assets/css/global_all.css"></style>
<style scoped>
</style>

