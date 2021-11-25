<template>
  <div class="h_100 w_100">
    <div class="flex_row_cb w_100 h_100">
      <div class="flex_col w_100 h_100">
        <!--block_list:搜尋列表-->
        <div class="block_list">
          <div class="content_list">
            <div class="list_top flex_row_cc">搜尋清單</div>
            <div class="list_bottom flex_col">
              <div class="select_scrollbar">
                <div
                  class="list_inner"
                  v-for="(bus, i) in searchBusList"
                  :key="i"
                >
                  <div class="flex_col" @click="getThisBus(bus.zh_tw)">
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
                    <i class="i_next" @click="getThisBus(bus.zh_tw)"></i>
                  </div>
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
import { addBus, removeBus } from "../utils/commonly-used-bus.js";
// import { DEFAULT_NUMBER_OF_QUERY_RECORDS } from "../constant/common";

export default {
  name: "SearchList",
  props: {
    selectedCity: String,
    search: String,
  },
  data() {
    return {
      cities: CITIES,
      selected: CITIES[0],
      open: false,
      isDynamicKeyboardShow: false,
      isBusInfoShow: false,
      searchBusList: new Array(),
      cityBusList: new Array(),
      routeName: String, // 路線名稱
      // bus: BusObj,
      busNum: "", // 選擇的busNum
      // isLoved: false, // 常用標記
    };
  },
  //TODO need to remove(for testing axios and location)
  mounted() {
    this.sendRequest();
  },
  methods: {
    sendRequest() {
      // const city = this.$route.params.city;
      // const routeName = this.$route.params.routeName;
      sendRequest(
        "get",
        `${BUS_URL_V2}/Route/City/${this.selectedCity}?$top=10&$format=${RESPONSE_DATA_FORMAT_JSON}`
      )
        .then((res) => {
          console.log("SearchList sendRequest this.selected=", this.selected);
          console.log("res=", res);
          console.log("this.searchBusList=", this.searchBusList);
          console.log("search=", this.search);
          this.searchBus(res);
        })
        .catch((err) => {
          //TODO Change to popup
          window.alert("Get SearchList occurs error：" + err);
        });
    },
    searchBus(res) {
      this.searchBusList = [];
      this.cityBusList = [];
      res.data.forEach((element) => {
        const item = new BusObj(
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
      this.busNum = bus;
      this.$emit("getBusNum", this.busNum);
    },
    setLoveList(bus) {
      console.log("setLoveList bus=", bus);
      this.cityBusList.forEach((element) => {
        if (element.zh_tw == bus.zh_tw) {
          element.isLove = !bus.isLove;
        }
      });
      if (bus.isLove) {
        addBus(bus);
      } else {
        removeBus(bus);
      }
      console.log("setLoveList this.cityBusList=", this.cityBusList);

      console.log("after setLoveList bus=", bus);
    },
  },
  watch: {
    selectedCity: function () {
      this.sendRequest();
    },
    search: function () {
      this.searchKeyWord();
    },
  },
};
</script>

<style src="../assets/css/global_modules.css"></style>
<style scoped></style>
