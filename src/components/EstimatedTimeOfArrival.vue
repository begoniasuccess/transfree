<template>
  <div class="content_list">
    <div class="list_top flex_row_cb">
      <!--模式切換-->
      <i class="i_model_map" @click="switchMode('SearchMap')"></i>
      <p>{{ routeName }}</p>
      <div class="flex_row_ce">
        <i class="i_update" @click="clickUpdateData"></i>
        <i class="i_info" @click="mobileSwitchBusInfo"></i>
      </div>
    </div>

    <!-- tab -->

    <div class="bookmark_container">
      <button
        :class="{ active: isGoListActive }"
        @click="
          isGoListActive = true;
          resetData();
        "
      >
        {{ $t("go") }}
      </button>
      <button
        :class="{ active: !isGoListActive }"
        @click="
          isGoListActive = false;
          resetData();
        "
      >
        {{ $t("back") }}
      </button>
    </div>

    <div class="list_bottom flex_col">
      <div class="select_scrollbar">
        <div v-for="(data, i) in activeList" :key="i" class="list_inner">
          <div class="flex_row_c">
            <span v-if="data.StopStatus == 0">
              <label class="bus_status1" v-if="data.EstimateTime / 60 >= 1">
                <span>{{ parseInt(data.EstimateTime / 60) }}</span
                >{{ $t("minutes") }}
              </label>
              <label class="bus_status2" v-if="data.EstimateTime / 60 < 1">
                <span>{{ $t("pitting") }}</span>
              </label>
            </span>
            <span v-if="data.StopStatus == 1"
              ><label class="bus_status0">{{ $t("hasNotDeparted") }}</label>
            </span>
            <span v-if="data.StopStatus == 2"
              ><label class="bus_status0">{{
                $t("trafficControlDoNotStop")
              }}</label></span
            >
            <span v-if="data.StopStatus == 3"
              ><label class="bus_status0">{{
                $t("lastBusHasPassed")
              }}</label></span
            >
            <span v-if="data.StopStatus == 4"
              ><label class="bus_status0">{{
                $t("notOperatingToday")
              }}</label></span
            >
            <div v-if="$store.getters.getMultilingual === multilingualChinese">
              {{ data.StopName.Zh_tw }}
            </div>
            <div v-if="$store.getters.getMultilingual === multilingualEnglish">
              {{ data.StopName.En }}
            </div>
          </div>
          <div class="flex_col">
            <div
              v-for="(bus, i) in getBusNearByStop(
                data.StopName.Zh_tw,
                data.Direction
              )"
              :key="i"
              class="flex_row_ce"
            >
              <p class="text_primary">{{ bus.PlateNumb }}</p>
              <i class="i_a11ybus" v-if="isBarrierFree(bus.PlateNumb)"></i>
            </div>
          </div>
        </div>
      </div>
      <p class="text_info">{{ $t("updateTimestamp") }} {{ updateTime }}</p>
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

export default {
  name: "EstimatedTimeOfArrival",
  data() {
    return {
      routeName: "",
      goList: [],
      backList: [],
      isGoListActive: true,
      updateTime: getCurrentDateTime(),
      busList: [],
      allBusInCity: [],
      interval: "",
      multilingualChinese: GLOBAL_MULTILINGUAL_CHINESE,
      multilingualEnglish: GLOBAL_MULTILINGUAL_ENGLISH,
    };
  },
  mounted() {
    this.getAllBusInCity();
    this.getStopList();
    this.getBusList();
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
      this.getBusList();
    },
    getAllBusInCity() {
      const city = this.$route.params.city;
      sendRequest(
        "get",
        `${BUS_URL_V2}/Vehicle/City/${city}?$format=${RESPONSE_DATA_FORMAT_JSON}`
      )
        .then((res) => {
          this.allBusInCity = res.data;
        })
        .catch((err) => {
          window.alert("Get AllBusInCity occurs error：" + err);
        });
    },
    getStopList() {
      const city = this.$route.params.city;
      const routeName = this.$route.params.routeName;
      sendRequest(
        "get",
        `${BUS_URL_V2}/EstimatedTimeOfArrival/City/${city}/${routeName}?$format=${RESPONSE_DATA_FORMAT_JSON}`
      )
        .then((res) => {
          console.log({ getStopListRes: res.data });
          if (
            this.$store.getters.getMultilingual === GLOBAL_MULTILINGUAL_CHINESE
          ) {
            this.routeName = res.data[0].RouteName.Zh_tw;
          } else {
            this.routeName = res.data[0].RouteName.En;
          }

          this.goList = res.data
            .filter((data) => data.Direction == 0)
            .sort((stop1, stop2) => stop1.StopID - stop2.StopID);
          this.backList = res.data
            .filter((data) => data.Direction == 1)
            .sort((stop1, stop2) => stop1.StopID - stop2.StopID);
          this.updateTime = getCurrentDateTime();
        })
        .catch((err) => {
          window.alert("Get EstimatedTimeOfArrival occurs error：" + err);
        });
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
        console.log({ stopName, direction, nearBy });
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
    clickUpdateData() {
      this.resetData();
      if (this.$store.getters.getIsAutoUpdate) {
        clearInterval(this.interval);
        const updateSecond = this.$store.getters.getUpdateFrequency * 1000;
        this.interval = setInterval(() => {
          this.resetData();
        }, updateSecond);
      }
    },
    mobileSwitchBusInfo() {
      this.$emit("mobileSwitchBusInfo");
    },
    showSearchMode() {
      this.$emit("searchMode", "search-map");
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
  },
  computed: {
    activeList: {
      get() {
        if (this.isGoListActive) {
          console.log({ estGoList: this.goList });
          return this.goList;
        } else {
          return this.backList;
        }
      },
      // eslint-disable-next-line
      set(value) {},
    },
  },
  watch: {
    isGoListActive: function (newVal, oldVal) {
      if (newVal && !oldVal) {
        this.activeList = this.goList;
      } else {
        this.activeList = this.backList;
      }
    },
  },
};
</script>

<style scoped>
</style>
