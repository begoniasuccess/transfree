<template>
  <div class="h_100 w_100">
    <div class="flex_row_cb w_100 h_100">
      <div class="flex_col w_100 h_100">
        <div class="content_list">
          <div class="list_top flex_row_cb">
            <i></i>
            <p>{{ $t("nearbyStop") }}</p>
            <div class="flex_row_ce">
              <i class="i_update"></i>
            </div>
          </div>

          <div class="list_bottom flex_col">
            <div class="select_scrollbar">
              <div class="map_inner map_stop">
                <i class="i_zoomin"></i>
                <i class="i_zoomout active"></i>

                <Map
                  :center="center"
                  :stopsData="stopList"
                  :zoom="zoom"
                  @show-stop-popup="showStopInfo"
                ></Map>
                <div class="black_overlay"></div>
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
import { BUS_URL_V2, sendRequest } from "../utils/https";
import { RESPONSE_DATA_FORMAT_JSON } from "../constant/common";
import { getCurrentDateTime } from "../utils/date";
import { getCurrentLocation, distance } from "../utils/location";

import Map from "./Map";

export default {
  name: "NearbyMap",
  props: {
    zoom: Number,
    limitDist: Number,
    city:Object
  },
  data() {
    return {
      updateTime: getCurrentDateTime(),
      stopList: [],
      interval: "",
      center: [22.612961, 120.304167],
      isPopUpActive: false,
      zoomMode: "in",
      activeStop: {},
      operatorName: "",
      plateNumb: "",
      rawStopList: [],
    };
  },
  components: {
    Map,
  },

  mounted() {
    console.log({City:this.city});
    this.setCenter(this.city);

    if (this.$store.getters.getIsAutoUpdate) {
      const updateSecond = this.$store.getters.getUpdateFrequency * 1000;
      this.interval = setInterval(() => {
        this.resetData();
      }, updateSecond);
    }
  },
  beforeDestroy() {
    console.log("clearInterval");
    clearInterval(this.interval);
  },
  methods: {
    resetData() {
      this.getStopList();
    },
    makeStopList(dataFromCityStops) {
      let stopList = [];
      dataFromCityStops.forEach((aStop, index) => {
        let aLocObj = {
          StopID: aStop.StopID,
          StopName: aStop.StopName,
          StopPosition: [
            aStop.StopPosition.PositionLat,
            aStop.StopPosition.PositionLon,
          ],
          StopIndex: index + 1,
        };
        stopList.push(aLocObj);
      });
      return stopList;
    },
    setCenter(getStops) {
      let self = this;
      getCurrentLocation()
        .then((geoData) => {
          self.center = [geoData.lat, geoData.lon];
          if (getStops) self.getStopList();
        })
        .catch((err) => {
          console.log({ setCenterErr: err });
        });
    },
    showStopInfo() {
      this.isPopUpActive = true;
      this.popUpMode = "stop";
    },
    getStopList() {
      let self = this;
      //一個縣市的站牌數量眾多，設置skip以利分批呼叫
      let skip = this.rawStopList.length;
      let city = self.city.value;
      sendRequest(
        "get",
        `${BUS_URL_V2}/Stop/City/${city}?$format=${RESPONSE_DATA_FORMAT_JSON}&$top=200&$skip=${skip}`
      )
        .then((res) => {
          // console.log({ getStopList: res });

          //為 stops 加上 與使用者當前的距離(km)
          res.data.forEach((aStop, index)=>{
            // if (!index) console.log({aStop});
            let stopLat = aStop.StopPosition.PositionLat;
            let stopLon = aStop.StopPosition.PositionLon;
            let distFromCenter = distance(self.center[0], self.center[1], stopLat, stopLon);
            res.data[index].distance = distFromCenter;
          });

          //將stops寫入rawStopList
          self.rawStopList = self.rawStopList.concat(res.data);

          self.setStopList();

          //未搜尋完的站牌，分批呼叫
          //注意：實作local快取機制前，暫時設置總搜尋上限避免本頁loading時間過長
          //餘下的資料由背景更新function-->resetData()去實現
          if (res.data.length == 200 && self.rawStopList.length < 3000) {
            self.getStopList();
          }
          
        })
        .catch((err) => {
          window.alert("Get getStopList occurs error：" + err);
        });
    },
    setStopList(){
      let self = this;
      let stopListInRange = self.rawStopList.filter((aRawStop) => {            
        return (aRawStop.distance <= (self.limitDist/1000));
      });
      self.stopList = self.makeStopList(stopListInRange);
    }
  },  
  computed: {
  },
  watch: {
    limitDist(){
      this.setStopList();
    },
    city(){
      this.getStopList();
    }
  },
};
</script>

<style scoped>
</style>

