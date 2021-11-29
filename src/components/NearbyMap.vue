<template>
  <div class="h_100 w_100">
    <div class="flex_row_cb w_100 h_100">
      <div class="flex_col w_100 h_100">
        <div class="content_list">
          <div class="list_top flex_row_cb">
            <i></i>
            <p>附近站牌</p>
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
import {
  GLOBAL_MULTILINGUAL_CHINESE,
  GLOBAL_MULTILINGUAL_ENGLISH,
  RESPONSE_DATA_FORMAT_JSON,
} from "../constant/common";
import { getCurrentDateTime } from "../utils/date";
import { getCurrentLocationInfo } from "../utils/location";

import Map from "./Map";

export default {
  name: "NearbyMap",
  props: {
    zoom: Number,
  },
  data() {
    return {
      isgoStopListActive: true,
      updateTime: getCurrentDateTime(),
      stopList: [],
      interval: "",
      multilingualChinese: GLOBAL_MULTILINGUAL_CHINESE,
      multilingualEnglish: GLOBAL_MULTILINGUAL_ENGLISH,
      center: [22.612961, 120.304167],
      isPopUpActive: false,
      zoomMode: "in",
      activeStop: {},
      operatorName: "",
      plateNumb: "",
      city: "",
      rawStopList: [],
    };
  },
  components: {
    Map,
  },

  mounted() {
    this.setCenter();
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
    setCenter() {
      let self = this;
      getCurrentLocationInfo()
        .then((data) => {
          console.log({ locData: data });
          let city = data.data.city.replace(" ", "");
          self.city = city;
          self.center = [data.data.lat, data.data.lon];
          console.log({ setCenter: self.center });
          this.$router
            .replace(`/nearby-stop/nearby-map/${city}`)
            .catch(() => {});
          self.getStopList();
        })
        .catch((err) => {
          console.log({ setCenterErr: err });
        });
    },
    showStopInfo(stopIndex) {
      console.log("showStopInfo", { stopIndex });
      this.isPopUpActive = true;
      this.popUpMode = "stop";
      this.activeStop = this.activeList[stopIndex];
      console.log({ activeStop: this.activeStop });
    },
    getStopList() {
      let self = this;
      let skip = this.rawStopList.length;
      const city = this.$route.params.city;
      sendRequest(
        "get",
        `${BUS_URL_V2}/Stop/City/${city}?$format=${RESPONSE_DATA_FORMAT_JSON}&$top=200&$skip=${skip}`
      )
        .then((res) => {
          self.rawStopList = self.rawStopList.concat(res.data);
          if (res.data.length == 200 && self.rawStopList.length < 1000) {
            self.getStopList();
          }
          self.stopList = self.makeStopList(self.rawStopList);
          console.log({ getStopList: res });
        })
        .catch((err) => {
          window.alert("Get getStopList occurs error：" + err);
        });
    },
  },
  computed: {
    activeList: {
      get() {
        if (this.isgoStopListActive) {
          return this.goStopList;
        } else {
          return this.backStopList;
        }
      },
      // eslint-disable-next-line
      set(value) {},
    },
  },
  watch: {
    isgoStopListActive: function (newVal, oldVal) {
      if (newVal && !oldVal) {
        this.activeList = this.goStopList;
      } else {
        this.activeList = this.backStopList;
      }
      this.setCenter();
    },
  },
};
</script>

<style scoped>
</style>

