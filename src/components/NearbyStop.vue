<template>
  <div class="h_100 w_100">
    <div class="flex_row_sb w_100 h_100">
      <div class="flex_col w_100 h_100">
        <Search
          v-on:getSearchCity="getSearchCity"
          v-on:getInputValue="getInputValue"
        ></Search>

        <!--次要列表-->
        <div
          class="block_sec flex_col select_scrollbar"
          v-if="isDynamicKeyboardShow == true || isBusInfoShow == true"
        >
          <span v-if="isDynamicKeyboardShow">
            <DynamicKeyboard @clickKeyboard="clickKeyboard"></DynamicKeyboard>
          </span>
          <span v-if="isBusInfoShow">
            <BusInfo
              :city="$route.params.city"
              :routeName="$route.params.routeName"
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
      <!-- block_list:附近站牌 -->
      <div class="block_list">
        <div class="content_list">
          <div class="list_top flex_row_cb">
            <i></i>
            <p>附近站牌</p>
            <div class="flex_row_ce">
              <i class="i_update" @click="getList"></i>
            </div>
          </div>

          <div class="list_bottom flex_col">
            <div class="select_scrollbar">
              <!-- 地圖區域 -->
              <div class="map_inner map_stop">
                <i class="i_zoomin"></i>
                <i class="i_zoomout active"></i>

                <!-- 站牌相關公車資訊 -->
                <div class="content_card">
                  <div class="flex_row_cb">
                    <p class="title_card_txt">2380 捷運北屯總站(松竹路)</p>
                    <i class="i_close"></i>
                  </div>
                  <label class="flex_row_cb">
                    <p>站牌公車</p>
                    <p>33,234</p>
                  </label>
                  <label class="flex_row_cb">
                    <p>距離</p>
                    <div class="flex_row">
                      <p>300</p>
                      <p>m</p>
                    </div>
                  </label>
                </div>
                <div class=" black_overlay"></div>
              </div>
            </div>
            <p class="text_info map_stop">更新時間 {{ updateTime }}</p>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>

import { CITIES } from "../constant/city";
import { BusObj } from "../constant/bus";
// import SearchList from "./SearchList";
import Search from "./Search";
import { BUS_URL_V2, sendRequest } from "../utils/https";
import BusInfo from "./BusInfo";
import DynamicKeyboard from "./DynamicKeyboard";
import { getCurrentLocationInfo } from "../utils/location";
// import Map from "./Map";
import moment from 'moment';

export default {
  name: "SearchBus",
//   components: { DynamicKeyboard, BusInfo, SearchList, Search },
  components: { DynamicKeyboard, BusInfo, Search},

  data() {
    return {
      cities: CITIES,
      selected: CITIES[0],
      open: false,
      isDynamicKeyboardShow: true,
      isBusInfoShow: false,
      searchBusList: new Array(),
      routeName: String, // 路線名稱
      bus: BusObj,
      inputValue: "",
      busNum: "",
      isGoListActive:true,
      updateTime: moment().format('YYYY/MM/DD, h:mm:ss a'),
      clientPos:[0, 0], 
      block_mode :{
        now: "searchList",
        select:{
          list: "searchList",
          route: "routeDeatil",
          map:"searchMap"
        }        
      }
      
    };
  },
  //TODO need to remove(for testing axios and location)
  mounted() {
    let self = this;
    sendRequest(
      "get",
      `${BUS_URL_V2}/RealTimeByFrequency/Streaming/City/Hsinchu?$top=30&$format=JSON`
    ).then((res) => {
      res;
      // console.log({RealTimeByFrequency:res});
    }).catch((err) => {
        console.log({RealTimeByFrequency:err});
    });      
    
    //取得使用者當前位置
    getCurrentLocationInfo()
      .then((res) => {
        let pos = [res.data.lat,res.data.lon];
        self.clientPos = pos;
        console.log({nowLoc:self.clientPos});
      })
      .catch((err) => {
        console.log({nowLocErr:err});
      });
  },
  methods: {
    clickKeyboard(value) {
      console.log("parent:" + value);
      //TODO Do something to the search input.
      if (Number.isInteger(value)) {
        //Append value to input value.
      } else if ("reset" === value) {
        //Reset the input value.
      } else if ("back" === value) {
        //Backspace the input value
      } else {
        //Set the input value as value.
      }
    },
    getBusNum: function (busNum) {
      this.busNum = busNum;
    },
    getSearchCity: function (city) {
      console.log("getSearchValue:" + city + "/");
      this.selected = city;
    },
    getInputValue: function (inputValue) {
      console.log("getSearchValue:" + inputValue + "/");
      this.inputValue = inputValue;
    },
    getList(){
      return true;
    }
  },
  watch: {
    busNum: function () {
      console.log("watch father busNum:" + this.busNum);
    },
  },
};
</script>

<style src="../assets/css/global_all.css"></style>
<style scoped>

</style>
