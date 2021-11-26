<template>
  <div class="h_100 w_100">
    <div class="flex_row_sb w_100 h_100">
      <div class="flex_col w_100 h_100">
        <Search
            v-on:getSearchCity="getSearchCity"
            v-on:getInputValuee="getInputValuee"
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
          <div class="list_top flex_col_cc">搜尋清單</div>
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
                  <i class="i_love active"></i>
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
// const LOCALSTORAGE_KEY = "TRANSFREE_COMMONLY_USED_BUS"; , addBus, removeBus
import {getAllBus} from "../utils/commonly-used-bus.js";
import Search from "./Search";

export default {
  name: "CommonlyUsedBus",
  components: {Search},
  data() {
    return {
      open: false,
      isDynamicKeyboardShow: false,
      isBusInfoShow: false,
      busList: new Array(),
      busNum: "", // 選擇的busNum
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      let allBus = getAllBus();
      allBus.forEach((element) => {
        this.busList.push(element);
      });
    },
    getSearchCity: function (city) {
      console.log("getSearchValue:" + city + "/");
      this.selected.value = city;
    },
    getInputValuee: function (inputValue) {
      console.log("getSearchValue:" + inputValue + "/");
      this.inputValue = inputValue;
    },
    getThisBus(bus) {
      this.busNum = bus;
      this.$emit("getBusNum", this.busNum);
    },
  },
};
</script>

<style scoped>

</style>
