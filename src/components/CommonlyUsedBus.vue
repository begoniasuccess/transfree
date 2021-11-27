<template>
  <div class="h_100 w_100">
    <div class="flex_row_sb w_100 h_100">
      <div class="flex_col w_100 h_100">
        <Search
          v-on:getSearchCity="getSearchCity"
          v-on:getInputValue="getInputValue"
        ></Search>

        <!--次要列表-->
        <div class="block_sec img_first flex_col_cc">
          <div class="img_03"></div>
        </div>
      </div>

      <!--右側列表-->
      <!--block_list:白箱狀態-->
      <div class="block_list" v-if="busList.length < 1">
        <div class="content_list">
          <div class="list_top flex_col_cc">{{ $t("searchList") }}</div>
          <div class="list_bottom flex_col_cc">
            <div class="img_box"></div>
          </div>
        </div>
      </div>

      <!--block_list:常用搜尋列表-->
      <div class="block_list" v-if="busList.length >= 1">
        <div class="content_list">
          <div class="list_top flex_row_cc">搜尋清單</div>
          <div class="list_bottom h_100 flex_col">
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
                  <i class="i_info"></i>
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
// const LOCALSTORAGE_KEY = "TRANSFREE_COMMONLY_USED_BUS";
import { CITIES } from "../constant/city";
import { getAllBus, addBus, removeBus } from "../utils/commonly-used-bus.js";
import Search from "./Search";

export default {
  name: "CommonlyUsedBus",
  components: { Search },
  data() {
    return {
     cities: CITIES,
      selected: CITIES[0],
      open: false,
      isDynamicKeyboardShow: false,
      isBusInfoShow: false,
      busList: new Array(), // 篩選過的List
      cityBusList: new Array(), // city的List
      allBusList: new Array(), // 完整的List
      busNum: "", // 選擇的busNum
      inputValue: "",
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
   setCityBusList() {
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
      this.inputValue = inputValue;
    },
    getThisBus(bus) {
      this.busNum = bus;
      this.$emit("getBusNum", this.busNum);
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
  },
  watch: {
    inputValue: function () {
      this.searchKeyWord();
    },
  },
};
</script>

<style scoped>
</style>