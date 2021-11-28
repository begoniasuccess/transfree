<template>
  <div class="h_100 w_100">
    <div class="flex_row_sb w_100 h_100">
      <div class="flex_col w_100 h_100 auto">
        <Search
          v-on:getSearchCity="getSearchCity"
          v-on:getInputValue="getInputValue"
          :inputValue="inputValue"
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

          <!--站牌公車-->
          <!--          <div>-->
          <!--            <p class="title_txt">站牌公車</p>-->
          <!--            &lt;!&ndash;卡片式資訊&ndash;&gt;-->
          <!--            <div class="content_card">-->
          <!--              <div class="flex_row_cb">-->
          <!--                <div class="flex_col">-->
          <!--                  <p class="text_b">公車號碼</p>-->
          <!--                  <p class="text_sec">行車方向</p>-->
          <!--                </div>-->
          <!--                <div class="flex_row_ce">-->
          <!--                  <i class="i_love active"></i>-->
          <!--                  <i class="i_next"></i>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
        </div>

        <!--初始圖-->
        <div class="block_sec img_first flex_col" v-else>
          <div class="img_01"></div>
        </div>
      </div>

      <!--右側列表-->
      <!--block_list:白箱狀態-->
      <!--            <div class="block_list">-->
      <!--              <div class="content_list">-->
      <!--                <div class="list_top flex_col_cc">搜尋清單</div>-->
      <!--                <div class="list_bottom flex_col_cc">-->
      <!--                  <div class="img_box"></div>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--            </div>-->

      <!--      <SearchList-->
      <!--        :selectedCity="selected"-->
      <!--        :search="inputValue"-->
      <!--        v-on:getBusNum="getBusNum"-->
      <!--      ></SearchList>-->

      <!-- <router-link :to="`/search-bus/search-list/${selected.value}`"
        >555</router-link
      > -->

      <!--block_list:搜尋列表-->
      <!--      <div class="block_list">-->
      <!--        <div class="content_list">-->
      <!--          <div class="list_top flex_row_cc">搜尋清單</div>-->
      <!--          <div class="list_bottom flex_col">-->
      <!--            <div class="select_scrollbar">-->
      <!--              <div class="list_inner">-->
      <!--                <div class="flex_col">-->
      <!--                  <p class="text_b">公車號碼</p>-->
      <!--                  <p class="text_sec">行車方向</p>-->
      <!--                </div>-->
      <!--                <div class="flex_row_ce">-->
      <!--                  <i class="i_love active"></i>-->
      <!--                  <i class="i_next"></i>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--              <div class="list_inner">-->
      <!--                <div class="flex_col">-->
      <!--                  <p class="text_b">公車號碼</p>-->
      <!--                  <p class="text_sec">行車方向</p>-->
      <!--                </div>-->
      <!--                <div class="flex_row_ce">-->
      <!--                  <i class="i_love"></i>-->
      <!--                  <i class="i_next"></i>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->

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

      <!--block_list:動態公車地圖模式-->
      <!--      <div class="block_list">-->
      <!--        <div class="content_list">-->
      <!--          <div class="list_top flex_row_cb">-->
      <!--            &lt;!&ndash;模式切換&ndash;&gt;-->
      <!--            <i class="i_model_list"></i>-->
      <!--            <p>公車號碼</p>-->
      <!--            <div class="flex_row_ce">-->
      <!--              <i class="i_update" @click="getList"></i>-->
      <!--              <i class="i_info"></i>-->
      <!--            </div>-->
      <!--          </div>-->

      <!--          &lt;!&ndash; tab &ndash;&gt;-->
      <!--          <div class="bookmark_container">-->
      <!--            <button :class="{active : isGoListActive}" @click="isGoListActive = true">去</button>-->
      <!--            <button :class="{active : !isGoListActive}" @click="isGoListActive = false">返</button>-->
      <!--          </div>-->

      <!--          <div class="list_bottom flex_col">-->
      <!--            <div class="select_scrollbar">-->
      <!--              &lt;!&ndash;地圖區域&ndash;&gt;-->
      <!--              <div class="map_inner">-->
      <!--                <i class="i_zoomin"></i>-->
      <!--                <i class="i_zoomout active"></i>-->

      <!--                &lt;!&ndash;站牌資訊&ndash;&gt;-->
      <!--                &lt;!&ndash;                <div class="content_card">&ndash;&gt;-->
      <!--                &lt;!&ndash;                  <div class="flex_row_cb">&ndash;&gt;-->
      <!--                &lt;!&ndash;                    <p class="title_card_txt">站牌名稱</p>&ndash;&gt;-->
      <!--                &lt;!&ndash;                    <i class="i_close"></i>&ndash;&gt;-->
      <!--                &lt;!&ndash;                  </div>&ndash;&gt;-->
      <!--                &lt;!&ndash;                  <label class="flex_row_cb">&ndash;&gt;-->
      <!--                &lt;!&ndash;                    <p>路線</p>&ndash;&gt;-->
      <!--                &lt;!&ndash;                    <p>路1</p>&ndash;&gt;-->
      <!--                &lt;!&ndash;                  </label>&ndash;&gt;-->
      <!--                &lt;!&ndash;                  <label class="flex_row_cb">&ndash;&gt;-->
      <!--                &lt;!&ndash;                    <p>站序</p>&ndash;&gt;-->
      <!--                &lt;!&ndash;                    <p>1</p>&ndash;&gt;-->
      <!--                &lt;!&ndash;                  </label>&ndash;&gt;-->
      <!--                &lt;!&ndash;                </div>&ndash;&gt;-->

      <!--                &lt;!&ndash;公車資訊&ndash;&gt;-->
      <!--                <div class="content_card">-->
      <!--                  <div class="flex_row_cb">-->
      <!--                    <p class="title_card_txt">站牌名稱</p>-->
      <!--                    <i class="i_close"></i>-->
      <!--                  </div>-->

      <!--                  <label class="flex_row_cb">-->
      <!--                    <p>營運業者</p>-->
      <!--                    <p>統聯客運</p>-->
      <!--                  </label>-->

      <!--                  <label class="flex_row_cb">-->
      <!--                    <p>車牌號碼</p>-->
      <!--                    <div class="flex_row_ce">-->
      <!--                      <p class="text_primary">590-GT</p>-->
      <!--                      <i class="i_a11ybus"></i>-->
      <!--                    </div>-->
      <!--                  </label>-->
      <!--                </div>-->
      <!--                <div class=" black_overlay"></div>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--            <p class="text_info">更新時間 {{ updateTime }}</p>-->
      <!--          </div>-->

      <!--block_list:附近站牌-->
      <!--      <div class="block_list">-->
      <!--        <div class="content_list">-->
      <!--          <div class="list_top flex_row_cb">-->
      <!--            <i></i>-->
      <!--            <p>附近站牌</p>-->
      <!--            <div class="flex_row_ce">-->
      <!--              <i class="i_update" @click="getList"></i>-->
      <!--            </div>-->
      <!--          </div>-->

      <!--          <div class="list_bottom flex_col">-->
      <!--            <div class="select_scrollbar">-->
      <!--              &lt;!&ndash;地圖區域&ndash;&gt;-->
      <!--              <div class="map_inner map_stop">-->
      <!--                <i class="i_zoomin"></i>-->
      <!--                <i class="i_zoomout active"></i>-->

      <!--                &lt;!&ndash;站牌相關公車資訊&ndash;&gt;-->
      <!--                <div class="content_card">-->
      <!--                  <div class="flex_row_cb">-->
      <!--                    <p class="title_card_txt">2380 捷運北屯總站(松竹路)</p>-->
      <!--                    <i class="i_close"></i>-->
      <!--                  </div>-->
      <!--                  <label class="flex_row_cb">-->
      <!--                    <p>站牌公車</p>-->
      <!--                    <p>33,234</p>-->
      <!--                  </label>-->
      <!--                  <label class="flex_row_cb">-->
      <!--                    <p>距離</p>-->
      <!--                    <div class="flex_row">-->
      <!--                      <p>300</p>-->
      <!--                      <p>m</p>-->
      <!--                    </div>-->
      <!--                  </label>-->
      <!--                </div>-->
      <!--                <div class=" black_overlay"></div>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--            <p class="text_info map_stop">更新時間 {{ updateTime }}</p>-->
      <!--          </div>-->

      <!--        </div>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
import { CITIES } from "../constant/city";
import { BusObj } from "../constant/bus";
// import SearchList from "./SearchList";
import Search from "./Search";
// import { BUS_URL_V2, sendRequest } from "../utils/https";
import BusInfo from "./BusInfo";
import DynamicKeyboard from "./DynamicKeyboard";
// import {getCurrentLocationInfo} from "../utils/location";

export default {
  name: "SearchBus",
  components: { DynamicKeyboard, BusInfo, Search },
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
