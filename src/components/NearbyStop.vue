<template>
  <div class="h_100 w_100">
    <div class="flex_row_sb w_100 h_100">
      <div class="flex_col w_100 h_100 auto">
        <Search
          v-on:getSearchCity="getSearchCity"
          v-on:getInputValue="getInputValue"
          :inputValue="inputValue"
          :page="page"
          :inputHint="inputHint"
        ></Search>

        <!--初始圖-->
        <div class="block_sec img_first flex_col">
          <div class="img_02"></div>
        </div>
      </div>

      <!--右側列表-->

      <!--block_list:動態公車列表模式-->
      <div class="block_list">
        <NearbyMap
          :zoom="zoom"
          :center="center"
          :city="$route.params.city"
          :routeName="$route.params.routeName"
        ></NearbyMap>
      </div>
    </div>
  </div>
</template>

<script>
import { CITIES } from "../constant/city";
import { BusObj } from "../constant/bus";
import Search from "./Search";
import NearbyMap from "./NearbyMap";

export default {
  name: "NearbyStop",
  components: { Search, NearbyMap },

  data() {
    return {
      page: "nearbyStop",
      inputHint: "enterLocation",
      cities: CITIES,
      selected: CITIES[0],
      open: false,
      isDynamicKeyboardShow: false,
      isBusInfoShow: false,
      searchBusList: new Array(),
      routeName: String, // 路線名稱
      bus: BusObj,
      inputValue: "",
      busNum: "",
      isMobileOpenBusInfo: true,
      zoom: 13,
    };
  },
  methods: {
    clickKeyboard(value) {
      if ("reset" === value) {
        this.inputValue = "";
        //Reset the input value.
      } else if ("back" === value) {
        this.inputValue = this.inputValue.substr(0, this.inputValue.length - 1);
        this.getInputValue(this.inputValue);
        //Backspace the input value
      } else {
        this.inputValue = this.inputValue + value;
        this.getInputValue(this.inputValue);
        //Set the input value as value.
      }
    },
    getBusNum: function (busNum) {
      this.isDynamicKeyboardShow = false;
      this.busNum = busNum;
    },
    getSearchCity: function (city) {
      this.selected = city;
    },
    getInputValue: function (inputValue) {
      this.isDynamicKeyboardShow = true;
      this.isMobileOpenBusInfo = true;
      this.isBusInfoShow = false;
      this.inputValue = inputValue;
    },
    mobileSwitchBusInfo() {
      this.isMobileOpenBusInfo = !this.isMobileOpenBusInfo;
    },
    loadNearbyStop() {
      this.$router.replace(`/nearby-stop/nearby-map`).catch(() => {});
    },
  },
  watch: {
    busNum: function () {
      console.log("watch father busNum:" + this.busNum);
    },
    selected: function () {
      this.isDynamicKeyboardShow = true;
      if (this.selected.value !== "" && this.inputValue !== "") {
        this.loadNearbyStop();
      }
    },
    inputValue: function () {
      this.isDynamicKeyboardShow = true;
      if (this.selected.value !== "" && this.inputValue !== "") {
        this.loadNearbyStop();
      }
    },
  },
};
</script>

<style src="../assets/css/global_all.css"></style>
<style scoped>
.flex_row_sb w_100 h_100 > .h_100 {
  height: inherit;
}
</style>