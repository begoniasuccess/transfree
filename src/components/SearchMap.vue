<template>
  <div class="h_100 w_100">
    <div class="flex_row_cb w_100 h_100">
      <div class="flex_col w_100 h_100">
        <div class="content_list">
            <div class="list_top flex_row_cb">
                <!-- 模式切換 -->
                <i class="i_model_list"></i>
                <p>公車號碼</p>
                <div class="flex_row_ce">
                    <i class="i_update" @click="getList"></i>
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
import { CITIES } from "../constant/city";
import {
  BUS_URL_V2,
  RESPONSE_DATA_FORMAT_JSON,
  sendRequest,
} from "../utils/https";
import { BusObj } from "../constant/bus";
import { getAllBus, addBus, removeBus } from "../utils/commonly-used-bus.js";
// import { DEFAULT_NUMBER_OF_QUERY_RECORDS } from "../constant/common";
import Map from "./Map";

export default {
  name: "SearchMap",
  components:{Map},
  props: {
    selectedCity: Object,
    search: String,
  },
  data() {
    return {
      cities: CITIES,
      selected: CITIES[0],
      open: false,
      isDynamicKeyboardShow: false,
      isBusInfoShow: false,
      searchBusList: new Array(), // 篩選過的List
      cityBusList: new Array(), // 完整的List
      routeName: String, // 路線名稱
      // bus: BusObj,
      busNum: "", // 選擇的busNum
      // isLoved: false, // 常用標記
    };
  },
  //TODO need to remove(for testing axios and location)
  mounted() {
    this.sendRequest();
  },
  methods: {
    sendRequest() {
      // const city = this.$route.params.city;
      // const routeName = this.$route.params.routeName;
      sendRequest(
        "get",
        `${BUS_URL_V2}/Route/City/${this.selectedCity.value}?&$format=${RESPONSE_DATA_FORMAT_JSON}`
      )
        .then((res) => {
          console.log("SearchList sendRequest this.selected=", this.selected);
          console.log("res=", res);
          console.log("this.searchBusList=", this.searchBusList);
          console.log("search=", this.search);
          this.searchBus(res);
          this.getLoveList();
          this.searchKeyWord();
        })
        .catch((err) => {
          //TODO Change to popup
          window.alert("Get SearchList occurs error：" + err);
        });
    },
    searchBus(res) {
      this.searchBusList = [];
      this.cityBusList = [];
      res.data.forEach((element) => {
        const item = new BusObj(
          element.RouteUID,
          element.RouteName.Zh_tw,
          element.RouteName.En,
          element.DepartureStopNameZh,
          element.DestinationStopNameZh
        );
        this.searchBusList.push(item);
      });
      this.cityBusList = this.searchBusList;
    },
    searchKeyWord() {
      let tmplist = [];
      this.searchBusList = this.cityBusList;
      this.searchBusList.forEach((element) => {
        element.zh_tw.indexOf(this.search);
        if (element.zh_tw.indexOf(this.search) != -1) {
          tmplist.push(element);
        }
      });
      this.searchBusList = tmplist;
    },
    getThisBus(bus) {
      this.busNum = bus.zh_tw;
      this.order();
      this.$emit("getBusNum", this.busNum);
    },
    setLoveList(bus) {
      this.cityBusList.forEach((element) => {
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
    getLoveList() {
      let allBus = getAllBus();
      if (allBus == null) {
        return;
      }
      let tmpList = [];
      allBus.forEach((element) => {
        if (element.routeUID.substring(0, 3) == this.selectedCity.id) {
          tmpList.push(element);
        }
      });
      this.cityBusList.forEach((element) => {
        tmpList.forEach((tmpBus) => {
          if (tmpBus.routeUID == element.routeUID) {
            element.isLove = true;
          }
        });
      });
    },
    order() {
      this.$emit("showBusInfo");
      this.$router.push({
        name: "EstimatedTimeOfArrival",
        params: { city: this.selectedCity.value, routeName: this.busNum },
      });
    },
  },
  watch: {
    selectedCity: function () {
      this.sendRequest();
      this.getLoveList();
    },
    search: function () {
      this.searchKeyWord();
    },
  },
};
</script>

<style scoped>
</style>

