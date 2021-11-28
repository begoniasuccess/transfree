<template>
  <div>
    <div class="flex_row_cb">
      <p class="title_txt">{{ $t("busInfo") }}</p>
      <i class="i_close" @click="mobileSwitchBusInfo"></i>
    </div>

    <!--卡片式資訊-->
    <div class="content_card">
      <p class="title_card_txt">{{ $t("fare") }}</p>
      <label class="flex_row_cb">
        <p>{{ operatorName }}</p>
        <p>{{ operatorPhoneNumber }}</p>
      </label>
      <label class="flex_row_cb">
        <p>{{ $t("chargingMethod") }}</p>
        <p>{{ ticketPriceDescription }}</p>
      </label>
      <label class="flex_row_cb">
        <p>{{ $t("segmentedBuffer") }}</p>
        <p>{{ fareBufferZoneDescription }}</p>
      </label>
    </div>

    <!--卡片式資訊-->
    <div class="content_card">
      <p class="title_card_txt">{{ $t("weekdayDeparture") }}</p>
      <div class="flex_row_sb">
        <div class="w_100">
          <label class="flex_row_cb">
            <p>{{ $t("firstBus") }}</p>
            <p>{{ firstBusTime }}</p>
          </label>
        </div>

        <div class="w_100">
          <label class="flex_row_cb">
            <p>{{ $t("lastBus") }}</p>
            <p>{{ lastBusTime }}</p>
          </label>
        </div>
      </div>
      <label class="w_100">
        <p>{{ $t("remark") }}</p>
      </label>
    </div>

    <!--卡片式資訊-->
    <div class="content_card">
      <p class="title_card_txt">{{ $t("holidayDeparture") }}</p>
      <div class="flex_row_sb">
        <div class="flex_col w_100">
          <label class="flex_row_cb">
            <p>{{ $t("lastBus") }}</p>
            <p>{{ holidayFirstBusTime }}</p>
          </label>
        </div>

        <div class="flex_col w_100">
          <label class="flex_row_cb">
            <p>{{ $t("lastBus") }}</p>
            <p>{{ holidayLastBusTime }}</p>
          </label>
        </div>
      </div>
      <label class="w_100">
        <p>{{ $t("remark") }}</p>
      </label>
    </div>
  </div>
</template>

<script>
import {BUS_URL_V2, sendRequest} from "../utils/https";
import {formatTimeStamp} from "../utils/date";
import {RESPONSE_DATA_FORMAT_JSON} from "../constant/common";

export default {
  name: "BusInfo",
  props: {
    city: String,
    routeName: String,
  },
  data() {
    return {
      operatorName: '',
      operatorPhoneNumber: '',
      ticketPriceDescription: '',
      fareBufferZoneDescription: '',
      firstBusTime: '',
      lastBusTime: '',
      holidayFirstBusTime: '',
      holidayLastBusTime: ''
    }
  },
  mounted() {
    sendRequest('get', `${BUS_URL_V2}/Route/City/${this.city}/${this.routeName}?$format=${RESPONSE_DATA_FORMAT_JSON}`)
        .then(res => {
          const {data} = res;
          this.operatorName = data[0].Operators[0].OperatorName.Zh_tw;
          this.ticketPriceDescription = data[0].TicketPriceDescriptionZh;
          this.fareBufferZoneDescription = data[0].FareBufferZoneDescriptionZh;
          this.firstBusTime = formatTimeStamp(data[0].SubRoutes[0].FirstBusTime);
          this.lastBusTime = formatTimeStamp(data[0].SubRoutes[0].LastBusTime);
          this.holidayFirstBusTime = formatTimeStamp(data[0].SubRoutes[0].HolidayFirstBusTime);
          this.holidayLastBusTime = formatTimeStamp(data[0].SubRoutes[0].HolidayLastBusTime);

          sendRequest('get', `${BUS_URL_V2}/Operator/City/${this.city}?format=${RESPONSE_DATA_FORMAT_JSON}`)
              .then(res => {
                this.operatorPhoneNumber = res.data.filter(d => d.OperatorNo === data[0].Operators[0].OperatorNo)[0].OperatorPhone;
              })
        }).catch(err => {
      console.log(err);
    })
  },
  methods: {
    mobileSwitchBusInfo() {
      this.$emit("mobileSwitchBusInfo");
    }
  }
}
</script>

<style scoped>

</style>
