<template>
  <div class="h_100 w_100">
    <div class="flex_row_cb w_100 h_100">
      <div class="flex_col w_100 h_100">
        <div class="content_list">
            <div class="list_top flex_row_cb">
                <!-- 模式切換 -->
                <i class="i_model_list" @click="switchMode('EstimatedTimeOfArrival')"></i>
                <p>公車號碼</p>
                <div class="flex_row_ce">
                    <i class="i_update"></i>
                    <!-- <i class="i_update" @click="getList"></i> -->
                    <i class="i_info"></i>
                </div>
            </div>

            <!-- tab  -->
            <div class="bookmark_container">
                <button :class="{active : isGoListActive}" @click="isGoListActive = true">去</button>
                <button :class="{active : !isGoListActive}" @click="isGoListActive = false">返</button>
            </div>

            <div class="list_bottom flex_col">
                <div class="select_scrollbar">
                    <!-- 地圖區域 -->
                    <div class="map_inner">
                    <i class="i_zoomin"></i>
                    <i class="i_zoomout active"></i>

                    <!-- 站牌資訊 -->
                    <div class="content_card">
                        <div class="flex_row_cb">
                            <p class="title_card_txt">站牌名稱</p>
                            <i class="i_close"></i>
                        </div>
                        <label class="flex_row_cb">
                            <p>路線</p>
                            <p>路1</p>
                        </label>
                        <label class="flex_row_cb">
                            <p>站序</p>
                            <p>1</p>
                        </label>
                    </div>

                    <!-- 公車資訊 -->
                    <div class="content_card">
                        <div class="flex_row_cb">
                            <p class="title_card_txt">站牌名稱</p>
                            <i class="i_close"></i>
                        </div>

                        <label class="flex_row_cb">
                            <p>營運業者</p>
                            <p>統聯客運</p>
                        </label>

                        <label class="flex_row_cb">
                            <p>車牌號碼</p>
                            <div class="flex_row_ce">
                                <p class="text_primary">590-GT</p>
                                <i class="i_a11ybus"></i>
                            </div>
                        </label>
                    </div>
                    <div class=" black_overlay"></div>
                    <Map :center="center"></Map>
                    <router-view></router-view>
                    </div>
                </div>
                <p class="text_info">更新時間 {{ updateTime }}</p>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {BUS_URL_V2, sendRequest} from "../utils/https";
import {GLOBAL_MULTILINGUAL_CHINESE, GLOBAL_MULTILINGUAL_ENGLISH, RESPONSE_DATA_FORMAT_JSON} from "../constant/common";
import {getCurrentDateTime} from "../utils/date";

export default {
  name: "EstimatedTimeOfArrival",
  data() {
    return {
      routeName: '',
      goList: [],
      backList: [],
      isGoListActive: true,
      updateTime: getCurrentDateTime(),
      busList: [],
      // allBusInCity: [],
      allRouteCity: [],
      interval: "",
      multilingualChinese: GLOBAL_MULTILINGUAL_CHINESE,
      multilingualEnglish: GLOBAL_MULTILINGUAL_ENGLISH,
      center:[0,0]
    };
  },
  mounted() {
    // this.getAllBusInCity();
    // this.getStopList();
    // this.getBusList();
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
      // this.getStopList();
      // this.getBusList();
      this.getStopOfRoute();
    },
    // getAllBusInCity() {
    //   const city = this.$route.params.city;
    //   sendRequest(
    //       "get",
    //       `${BUS_URL_V2}/Vehicle/City/${city}?$format=${RESPONSE_DATA_FORMAT_JSON}`
    //   )
    //       .then((res) => {
    //         this.allBusInCity = res.data;
    //       })
    //       .catch((err) => {
    //         window.alert("Get AllBusInCity occurs error：" + err);
    //       });
    // },
    // getStopList() {
    //   const city = this.$route.params.city;
    //   const routeName = this.$route.params.routeName;
    //   sendRequest(
    //       "get",
    //       `${BUS_URL_V2}/EstimatedTimeOfArrival/City/${city}/${routeName}?$format=${RESPONSE_DATA_FORMAT_JSON}`
    //   )
    //       .then((res) => {
    //         console.log({getStopListRes:res.data});
    //         if(this.$store.getters.getMultilingual === GLOBAL_MULTILINGUAL_CHINESE) {
    //           this.routeName = res.data[0].RouteName.Zh_tw;
    //         } else {
    //           this.routeName = res.data[0].RouteName.En;
    //         }

    //         this.goList = res.data
    //             .filter((data) => data.Direction == 0)
    //             .sort((stop1, stop2) => stop1.StopID - stop2.StopID);
    //         this.backList = res.data
    //             .filter((data) => data.Direction == 1)
    //             .sort((stop1, stop2) => stop1.StopID - stop2.StopID);
    //         this.updateTime = getCurrentDateTime();
    //       })
    //       .catch((err) => {
    //         window.alert("Get EstimatedTimeOfArrival occurs error：" + err);
    //       });
    // },
    // getBusList() {
    //   const city = this.$route.params.city;
    //   const routeName = this.$route.params.routeName;
    //   sendRequest(
    //       "get",
    //       `${BUS_URL_V2}/RealTimeNearStop/City/${city}/${routeName}?$format=${RESPONSE_DATA_FORMAT_JSON}`
    //   )
    //       .then((res) => {
    //         this.busList = res.data;
    //       })
    //       .catch((err) => {
    //         window.alert("Get RealTimeNearStop occurs error：" + err);
    //       });
    // },
    // getBusNearByStop(stopName, direction) {
    //   const nearBy = this.busList.filter(
    //       (data) =>
    //           data.StopName.Zh_tw === stopName && data.Direction === direction
    //   );
    //   if (nearBy.length === 0) {
    //     return "";
    //   } else {
    //     return nearBy;
    //   }
    // },
    // isBarrierFree(plateNumb) {
    //   if (plateNumb !== "") {
    //     const bus = this.allBusInCity.filter(
    //         (data) => data.PlateNumb === plateNumb
    //     );
    //     return bus.length !== 0 && bus[0].VehicleType === 1;
    //   } else {
    //     return false;
    //   }
    // },
    // clickUpdateData() {
    //   this.resetData();
    //   if (this.$store.getters.getIsAutoUpdate) {
    //     clearInterval(this.interval);
    //     const updateSecond = this.$store.getters.getUpdateFrequency * 1000;
    //     this.interval = setInterval(() => {
    //       this.resetData();
    //     }, updateSecond);
    //   }
    // },
    // mobileSwitchBusInfo() {
    //   this.$emit("mobileSwitchBusInfo")
    // },
    switchMode(mode) {
      this.$router.push({
        name: mode,
        params: { city: this.$route.params.city, routeName: this.$route.params.routeName },
      });
    },
    getStopOfRoute(){
      const city = this.$route.params.city;
      const routeName = this.$route.params.routeName;
      sendRequest(
          "get",
          `${BUS_URL_V2}/StopOfRoute/City/${city}/${routeName}?$format=${RESPONSE_DATA_FORMAT_JSON}`
      )
          .then((res) => {
            this.allRouteCity = res.data;
            console.log({allRouteCity:res.data});
          })
          .catch((err) => {
            window.alert("Get getStopOfRoute occurs error：" + err);
          });
    }
  },
  computed: {
    activeList: {
      // eslint-disable-next-line
      get() {
        if (this.isGoListActive) {
          return this.goList;
        } else {
          return this.backList;
        }
      },
      // eslint-disable-next-line
      set(value) {
      },
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

