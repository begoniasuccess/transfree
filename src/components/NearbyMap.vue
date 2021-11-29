<template>
  <div class="h_100 w_100">
    <div class="flex_row_cb w_100 h_100">
      <div class="flex_col w_100 h_100">
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
              <!-- &lt;!&ndash;地圖區域&ndash;&gt; -->
              <div class="map_inner map_stop">
                <i class="i_zoomin"></i>
                <i class="i_zoomout active"></i>

                <!-- &lt;!&ndash;站牌相關公車資訊&ndash;&gt; -->
                <div class="content_card" v-if="isPopUpActive">
                  <div class="flex_row_cb">
                    <p class="title_card_txt">2380 捷運北屯總站(松竹路132)</p>
                    <i class="i_close" @click="isPopUpActive = false;"></i>
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
                <Map    :center="center" 
                        :stopsData="activeList"
                        :zoom="zoom"
                        @show-stop-popup="showStopInfo"
                    ></Map>
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
import {BUS_URL_V2, sendRequest} from "../utils/https";
import {GLOBAL_MULTILINGUAL_CHINESE, GLOBAL_MULTILINGUAL_ENGLISH, RESPONSE_DATA_FORMAT_JSON} from "../constant/common";
import {getCurrentDateTime} from "../utils/date";
import {getCurrentLocationInfo} from "../utils/location";
import Map from "./Map";

export default {
  name: "NearbyMap",
  props:{
      zoom:Number
  },
  data() {
    return {
      routeName: '',
      goStopList: [],
      backStopList: [],
      isgoStopListActive: true,
      updateTime: getCurrentDateTime(),
      busList: [],
      // allBusInCity: [],
      allRouteCityStops: [
      ],
      interval: "",
      multilingualChinese: GLOBAL_MULTILINGUAL_CHINESE,
      multilingualEnglish: GLOBAL_MULTILINGUAL_ENGLISH,
      center:[22.612961, 120.304167],
    //   zoomSize : 13,
      popUpMode:'route',
      isPopUpActive :false,
      zoomMode:'in',
      activeStop:{},
      operatorName:"",
      plateNumb: "" 
    };
  },
  components:{
    Map
  },
  
  mounted() {
    this.setCenter();
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
      // this.getStopOfRoute();      
    //   this.getBusList();
    },    
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
            this.allRouteCityStops = res.data;
            // console.log({allRouteCityStops:this.allRouteCityStops});
            
            this.goStopList = this.makeStopList(res.data[1]);
            this.backStopList = this.makeStopList(res.data[0]);
            // console.log({goStopList:this.goStopList, backStopList:this.backStopList});
            this.operatorName = res.data[0].Operators[0].OperatorName;
            this.setCenter();
          })
          .catch((err) => {
            window.alert("Get getStopOfRoute occurs error：" + err);
          });
    },
    makeStopList(dataFromRouteCityStops){
      let stops = dataFromRouteCityStops.Stops;
      let stopList = [];
      stops.forEach((aStop, index) => {
          let aLocObj = {
            StopID : aStop.StopID,
            StopName : aStop.StopName,
            StopPosition : [aStop.StopPosition.PositionLat, aStop.StopPosition.PositionLon],
            StopIndex : index+1,
            
          };
          stopList.push(aLocObj);
          
      });      
      return stopList;
    },
    setCenter(){
      let self = this;
      getCurrentLocationInfo().then((data)=>{
        //   console.log({setCenter:data});
          self.center=[data.data.lat, data.data.lon];
          console.log({setCenter:self.center});
      }).catch((err)=>{
          console.log({setCenterErr:err});
      });
      
    },
    showStopInfo(stopIndex){
      console.log("showStopInfo",{stopIndex});
      this.isPopUpActive = true;
      this.popUpMode = 'stop';
      this.activeStop = this.activeList[stopIndex];
      console.log({activeStop:this.activeStop});
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
      // eslint-disable-next-line
      get() {
        if (this.isgoStopListActive) {
          return this.goStopList;
        } else {
          return this.backStopList;
        }
      },
      // eslint-disable-next-line
      set(value) {
      },
    }
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

