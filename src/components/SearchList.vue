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
                  <div class="flex_col">
                    <p class="text_b">{{ bus.zh_tw }}</p>
                    <p class="text_sec">
                      {{ bus.departureStopNameZh }}-
                      {{ bus.destinationStopNameZh }}
                    </p>
                  </div>
                  <div class="flex_row_ce">
                    <i class="i_love active"></i>
                    <i class="i_next"></i>
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
  // RESPONSE_DATA_FORMAT_JSON,
  sendRequest,
} from "../utils/https";
import { BusObj } from "../constant/bus";
import { DEFAULT_NUMBER_OF_QUERY_RECORDS } from "../constant/common";

export default {
  name: "SearchList",
  props: {
    selectedCity: String,
  },
  data() {
    return {
      cities: CITIES,
      selected: CITIES[0],
      open: false,
      isDynamicKeyboardShow: false,
      isBusInfoShow: false,
      searchBusList: new Array(),
      routeName: String, // 路線名稱
      bus: BusObj,
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
        `${BUS_URL_V2}/Route/City/${this.selectedCity}?$top=${DEFAULT_NUMBER_OF_QUERY_RECORDS}&$format=JSON`
      )
        .then((res) => {
          console.log("SearchList sendRequest this.selected=", this.selected);
          console.log(res);
          this.searchBus(res);
        })
        .catch((err) => {
          //TODO Change to popup
          window.alert("Get SearchList occurs error：" + err);
        });
    },
    searchBus(res) {
      this.searchBusList = [];
      res.data.forEach((element) => {
        this.bus = new BusObj(
          element.RouteName.Zh_tw,
          element.RouteName.En,
          element.DepartureStopNameZh,
          element.DestinationStopNameZh
        );
        this.searchBusList.push(this.bus);
      });
    },
  },
  watch: {
    selectedCity: function () {
      this.sendRequest();
    },
  },
};
</script>

<style src="../assets/css/global_modules.css"></style>
<style scoped></style>
