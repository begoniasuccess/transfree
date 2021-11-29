<template>
  <div class="h_100 w_100">
    <div class="flex_row_cb w_100 h_100">
      <div class="flex_col w_100 h_100">
        <div class="content_list">
          <div class="list_top flex_row_cb">
            <!-- 模式切換 -->
            <i
              class="i_model_list"
              @click="switchMode('EstimatedTimeOfArrival')"
            ></i>
            <p>公車號碼</p>
            <div class="flex_row_ce">
              <i class="i_update"></i>
              <i class="i_info"></i>
            </div>
          </div>

          <!-- tab  -->
          <div class="bookmark_container">
            <button
              :class="{ active: isgoStopListActive }"
              @click="isgoStopListActive = true"
            >
              去
            </button>
            <button
              :class="{ active: !isgoStopListActive }"
              @click="isgoStopListActive = false"
            >
              返
            </button>
          </div>

          <div class="list_bottom flex_col">
            <div class="select_scrollbar">
              <!-- 地圖區域 -->
              <div class="map_inner">
                <i
                  :class="{ i_zoomin: true, active: zoomMode == 'in' }"
                  @click="
                    zoomSize++;
                    zoomMode = 'in';
                  "
                ></i>
                <i
                  :class="{ i_zoomout: true, active: zoomMode == 'out' }"
                  @click="
                    zoomSize--;
                    zoomMode = 'out';
                  "
                ></i>

                <!-- 站牌資訊 -->
                <div
                  class="content_card"
                  v-if="isPopUpActive && popUpMode == 'stop'"
                >
                  <div class="flex_row_cb">
                    <p
                      v-if="
                        this.$store.getters.getMultilingual ===
                        multilingualChinese
                      "
                      class="title_card_txt"
                    >
                      {{ activeStop.StopName.Zh_tw }}
                    </p>
                    <p v-else class="title_card_txt">
                      {{ activeStop.StopName.En }}
                    </p>
                    <i class="i_close" @click="isPopUpActive = false"></i>
                  </div>
                  <label class="flex_row_cb">
                    <p>路線</p>
                    <p>{{ this.$route.params.routeName }}</p>
                  </label>
                  <label class="flex_row_cb">
                    <p>站序</p>
                    <p>{{ activeStop.StopIndex }}</p>
                  </label>
                </div>

                <Map
                  :center="center"
                  :stopsData="activeList"
                  :zoom="zoomSize"
                  @show-stop-popup="showStopInfo"
                ></Map>
                <router-view></router-view>
              </div>
              <div class="black_overlay"></div>
            </div>
            <p class="text_info">更新時間 {{ updateTime }}</p>
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
import Map from "./Map";

export default {
  name: "SearchMap",
  data() {
    return {
      routeName: "",
      goStopList: [],
      backStopList: [],
      isgoStopListActive: true,
      updateTime: getCurrentDateTime(),
      busList: [],
      allRouteCityStops: [],
      interval: "",
      multilingualChinese: GLOBAL_MULTILINGUAL_CHINESE,
      multilingualEnglish: GLOBAL_MULTILINGUAL_ENGLISH,
      center: [22.612961, 120.304167],
      zoomSize: 13,
      popUpMode: "route",
      isPopUpActive: true,
      zoomMode: "in",
      activeStop: {},
      operatorName: "",
      plateNumb: "",
    };
  },
  components: {
    Map,
  },
  mounted() {
    this.getStopOfRoute();
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
      this.getBusList();
    },
    switchMode(mode) {
      this.$router.push({
        name: mode,
        params: {
          city: this.$route.params.city,
          routeName: this.$route.params.routeName,
        },
      });
    },
    getStopOfRoute() {
      const city = this.$route.params.city;
      const routeName = this.$route.params.routeName;
      sendRequest(
        "get",
        `${BUS_URL_V2}/StopOfRoute/City/${city}/${routeName}?$format=${RESPONSE_DATA_FORMAT_JSON}`
      )
        .then((res) => {
          this.allRouteCityStops = res.data;

          this.goStopList = this.makeStopList(res.data[1]);
          this.backStopList = this.makeStopList(res.data[0]);
          this.operatorName = res.data[0].Operators[0].OperatorName;
          this.setCenter();
        })
        .catch((err) => {
          window.alert("Get getStopOfRoute occurs error：" + err);
        });
    },
    makeStopList(dataFromRouteCityStops) {
      let stops = dataFromRouteCityStops.Stops;
      let stopList = [];
      stops.forEach((aStop, index) => {
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
      if (this.activeList.length > 10) {
        this.center = this.activeList[9].StopPosition;
      } else if (this.activeList.length > 5) {
        this.center = this.activeList[4].StopPosition;
      } else {
        this.center = this.activeList[0].StopPosition;
      }
    },
    showStopInfo(stopIndex) {
      console.log("showStopInfo", { stopIndex });
      this.isPopUpActive = true;
      this.popUpMode = "stop";
      this.activeStop = this.activeList[stopIndex];
      console.log({ activeStop: this.activeStop });
    },
    getBusList() {
      const city = this.$route.params.city;
      const routeName = this.$route.params.routeName;
      sendRequest(
        "get",
        `${BUS_URL_V2}/RealTimeNearStop/City/${city}/${routeName}?$format=${RESPONSE_DATA_FORMAT_JSON}`
      )
        .then((res) => {
          this.busList = res.data;
        })
        .catch((err) => {
          window.alert("Get RealTimeNearStop occurs error：" + err);
        });
    },
    getBusNearByStop(stopName, direction) {
      const nearBy = this.busList.filter(
        (data) =>
          data.StopName.Zh_tw === stopName && data.Direction === direction
      );
      if (nearBy.length === 0) {
        return "";
      } else {
        return nearBy;
      }
    },
    isBarrierFree(plateNumb) {
      if (plateNumb !== "") {
        const bus = this.allBusInCity.filter(
          (data) => data.PlateNumb === plateNumb
        );
        return bus.length !== 0 && bus[0].VehicleType === 1;
      } else {
        return false;
      }
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

