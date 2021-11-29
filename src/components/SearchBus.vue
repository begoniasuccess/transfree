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

        <!--次要列表-->
        <div
          class="block_sec flex_col select_scrollbar"
          :style="[
            isMobileOpenBusInfo ? { display: 'block' } : { display: 'none' },
          ]"
          v-if="isDynamicKeyboardShow == true || isBusInfoShow == true"
        >
          <span v-if="isDynamicKeyboardShow">
            <DynamicKeyboard
              @clickKeyboard="clickKeyboard"
              @mobileSwitchBusInfo="mobileSwitchBusInfo"
            ></DynamicKeyboard>
          </span>
          <span v-if="isBusInfoShow">
            <BusInfo
              :city="$route.params.city"
              :routeName="$route.params.routeName"
              @mobileSwitchBusInfo="mobileSwitchBusInfo"
            ></BusInfo>
          </span>
        </div>

        <!--初始圖-->
        <div class="block_sec img_first flex_col" v-else>
          <div class="img_01"></div>
        </div>
      </div>

      <!--右側列表-->

      <!--block_list:動態公車列表模式-->
      <div class="block_list">
        <router-view
          @mobileSwitchBusInfo="mobileSwitchBusInfo"
          @showBusInfo="
            isBusInfoShow = true;
            isDynamicKeyboardShow = false;
          "
          :selectedCity="selected"
          :search="inputValue"
        ></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { CITIES } from "../constant/city";
import { BusObj } from "../constant/bus";
import Search from "./Search";
import BusInfo from "./BusInfo";
import DynamicKeyboard from "./DynamicKeyboard";

export default {
  name: "SearchBus",
  components: { DynamicKeyboard, BusInfo, Search },
  data() {
    return {
      page: "searchBus",
      inputHint: "enterRouteName",
      cities: CITIES,
      selected: CITIES[0],
      open: false,
      isDynamicKeyboardShow: false,
      isBusInfoShow: false,
      searchBusList: new Array(),
      routeName: "", // 路線名稱
      bus: BusObj,
      inputValue: "",
      busNum: "",
      isMobileOpenBusInfo: true,
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
    loadSearchList() {
      this.$router.replace(`/search-bus/search-list`).catch(() => {});
    },
  },
  watch: {
    busNum: function () {
      console.log("watch father busNum:" + this.busNum);
    },
    selected: function () {
      this.isDynamicKeyboardShow = true;
      if (this.selected.value !== "" && this.inputValue !== "") {
        this.loadSearchList();
      }
    },
    inputValue: function () {
      this.isDynamicKeyboardShow = true;
      if (this.selected.value !== "" && this.inputValue !== "") {
        this.loadSearchList();
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
