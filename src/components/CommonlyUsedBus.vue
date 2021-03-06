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
          <span v-if="isBusInfoShow && isDynamicKeyboardShow == false">
            <BusInfo
              :city="this.selected.value"
              :routeName="this.busNum"
              @mobileSwitchBusInfo="mobileSwitchBusInfo"
            ></BusInfo>
          </span>
        </div>

        <!--初始圖-->
        <div class="block_sec img_first flex_col" v-else>
          <div class="img_03"></div>
        </div>
      </div>

      <!--右側列表-->
      <div class="block_list">
        <div
          class="content_list"
          v-if="isSelectedTheBus == false && !showEstimatedTimeOfArrival"
        >
          <div class="list_top flex_row_cc">{{ $t("searchList") }}</div>
          <!--block_list:白箱狀態-->
          <div class="list_bottom flex_col_cc" v-if="busList.length < 1">
            <div class="img_box"></div>
          </div>
          <!--block_list:常用搜尋列表-->
          <div class="list_bottom h_100 flex_col" v-if="busList.length >= 1">
            <div class="select_scrollbar">
              <div class="list_inner" v-for="(bus, i) in busList" :key="i">
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
                  <i class="i_info" @click="getBusInfo(bus)"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--block_list:動態公車列表模式-->
        <router-view
          class="content_list"
          v-if="isSelectedTheBus == true && showEstimatedTimeOfArrival"
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
import { getAllBus, addBus, removeBus } from "../utils/commonly-used-bus.js";
import Search from "./Search";
import BusInfo from "./BusInfo";
import DynamicKeyboard from "./DynamicKeyboard";

export default {
  name: "CommonlyUsedBus",
  components: { DynamicKeyboard, BusInfo, Search },

  data() {
    return {
      page: "commonlyUsed",
      inputHint: "enterRouteName",
      cities: CITIES,
      selected: CITIES[0],
      open: false,
      isDynamicKeyboardShow: false,
      isBusInfoShow: false,
      isMobileOpenBusInfo: true,
      isSelectedTheBus: false,
      busList: new Array(), // 篩選過的List
      cityBusList: new Array(), // city的List
      allBusList: new Array(), // 完整的List
      busNum: "", // 選擇的busNum
      inputValue: "",
      showEstimatedTimeOfArrival: false,
    };
  },
  mounted() {
    let allBus = getAllBus();
    if (allBus == null) {
      this.busList = [];
      return;
    }
    allBus.forEach((element) => {
      this.allBusList.push(element);
    });
    this.setCityBusList();
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
    setCityBusList() {
      this.isDynamicKeyboardShow = false;
      let tmpList = [];
      this.allBusList.forEach((element) => {
        if (element.routeUID.substring(0, 3) == this.selected.id) {
          tmpList.push(element);
        }
      });
      this.cityBusList = tmpList;
      this.busList = this.cityBusList;
    },
    getSearchCity: function (city) {
      this.selected = city;
      this.setCityBusList();
      this.searchKeyWord();
    },
    getInputValue: function (inputValue) {
      this.isDynamicKeyboardShow = true;
      this.isMobileOpenBusInfo = true;
      this.showEstimatedTimeOfArrival = false;
      this.isSelectedTheBus = false;
      this.inputValue = inputValue;
    },
    getThisBus(bus) {
      this.busNum = bus;
      this.order();
      this.$emit("getBusNum", this.busNum);
      this.isSelectedTheBus = true;
    },
    setLoveList(bus) {
      this.busList.forEach((element) => {
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
    searchKeyWord() {
      let tmplist = [];
      this.busList = this.cityBusList;
      this.busList.forEach((element) => {
        element.zh_tw.indexOf(this.inputValue);
        if (element.zh_tw.indexOf(this.inputValue) != -1) {
          tmplist.push(element);
        }
      });
      this.busList = tmplist;
    },
    order() {
      this.$emit("showBusInfo");

      this.$router
        .push(
          `/commonly-used-bus/estimated-time-of-arrival/${this.selected.value}/${this.busNum}`
        )
        .catch(() => {});
      this.showEstimatedTimeOfArrival = true;
    },
    mobileSwitchBusInfo() {
      this.isMobileOpenBusInfo = !this.isMobileOpenBusInfo;
    },
    getBusInfo(bus) {
      this.isDynamicKeyboardShow = !this.isDynamicKeyboardShow;
      this.isBusInfoShow = !this.isBusInfoShow;
      this.busNum = bus.zh_tw;
    },
  },
  watch: {
    inputValue: function () {
      this.searchKeyWord();
    },
    selected: function () {
      this.showEstimatedTimeOfArrival = false;
    },
  },
};
</script>

<style scoped>
</style>
