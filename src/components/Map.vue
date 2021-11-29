<template>
  <div id="map-cpn">
    <!-- 初始化地圖設定 -->
    <l-map
      ref="myMap"
      :zoom="zoom"
      :center="center"
      :options="options"
      style="height: 100vh"
    >
      <!-- 載入圖資 -->
      <l-tile-layer :url="url" :attribution="attribution" />

      <!-- 自己所在位置 -->
      <l-marker ref="location" :lat-lng="center">
        <l-popup> 你的位置 </l-popup>
      </l-marker>
      <!-- 創建標記點 -->
      <l-marker
        :lat-lng="aStop.StopPosition"
        v-for="(aStop, index) in stopsData"
        :key="aStop.StopID"
        @click="selectedIndex(index)"
      >
        <!-- 標記點樣式判斷 -->
        <l-icon
          :icon-url="icon.type.gold"
          :shadow-url="icon.shadowUrl"
          :icon-size="icon.iconSize"
          :icon-anchor="icon.iconAnchor"
          :popup-anchor="icon.popupAnchor"
          :shadow-size="icon.shadowSize"
        />
        <!-- 彈出視窗 -->
        <l-popup>
          {{ aStop.StopName.Zh_tw + " " + aStop.StopName.En }}
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
// import { getCurrentLocationInfo } from "../utils/location";
import {
  GLOBAL_MULTILINGUAL_CHINESE,
  GLOBAL_MULTILINGUAL_ENGLISH,
} from "../constant/common";
export default {
  name: "Map",
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: `© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`,
      options: {},
      icon: {
        type: {
          red: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
          blue: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
          orange:
            "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
          gold: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
        },
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      },
      multilingualChinese: GLOBAL_MULTILINGUAL_CHINESE,
      multilingualEnglish: GLOBAL_MULTILINGUAL_ENGLISH,
    };
  },
  props: ["center", "stopsData", "zoom"],
  methods: {
    selectedIndex(stopListIndex) {
      this.$emit("show-stop-popup", stopListIndex);
    },
  },
  mounted() {},
};
</script>
<style scoped>
#map-cpn {
  /* background: chocolate; */
  /* color:cornflowerblue; */
  height: 100%;
  overflow: hidden;
}
</style>