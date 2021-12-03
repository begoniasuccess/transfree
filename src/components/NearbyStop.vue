<template>
  <div class="h_100 w_100">
    <div class="flex_row_sb w_100 h_100">
      <div class="flex_col w_100 h_100 auto">
        <Test></Test>
        <SearchForNearby
          v-on:getInputValue="getInputValue"
          :nowCity="$route.params.city"
          :inputValue="inputValue"
          :page="page"
          :inputHint="inputHint"
        ></SearchForNearby>

        <!--初始圖-->
        <div class="block_sec img_first flex_col">
          <div class="img_02"></div>
        </div>
      </div>

      <!--block_list:附近站牌-->
      <!--
        <div class="block_list">
          <NearbyMap
            :zoom="zoom"
            :center="center"
            :city="$route.params.city"
            :limitDist="inputValue"
          ></NearbyMap>
        </div>
      -->
    </div>
  </div>
</template>

<script>
import SearchForNearby from "./SearchForNearby";
// import NearbyMap from "./NearbyMap";
import Test from "./Test";


export default {
  name: "NearbyStop",
  // components: { SearchForNearby, NearbyMap },
  components: { SearchForNearby, Test },

  data() {
    return {
      page: "nearbyStop",
      inputHint: "distanceFromCenter",
      open: false,
      isDynamicKeyboardShow: false,
      isBusInfoShow: false,
      searchBusList: new Array(),
      inputValue: 2,
      isMobileOpenBusInfo: true,
      zoom: 13,
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
    getSearchCity: function (city) {
      this.selected = city;
    },
    getInputValue: function (inputValue) {
      // this.isDynamicKeyboardShow = true;
      // this.isMobileOpenBusInfo = true;
      // this.isBusInfoShow = false;
      this.inputValue = inputValue;
    },
    mobileSwitchBusInfo() {
      this.isMobileOpenBusInfo = !this.isMobileOpenBusInfo;
    },
    loadNearbyStop() {
      this.$router.replace(`/nearby-stop/nearby-map`).catch(() => {});
    },
  },
  watch: {
    selected: function () {
      this.isDynamicKeyboardShow = true;
      if (this.selected.value !== "" && this.inputValue !== "") {
        this.loadNearbyStop();
      }
    },
    inputValue: function () {
      this.isDynamicKeyboardShow = true;
      if (this.selected.value !== "" && this.inputValue !== "") {
        this.loadNearbyStop();
      }
    },
  },
  mounted(){
    // this.inputValue = this.$route.params.city;
  }
};
</script>
<style scoped>
.flex_row_sb w_100 h_100 > .h_100 {
  height: inherit;
}
</style>