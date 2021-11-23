<template>
  <div>
    <p class="title_txt">公車相關資訊</p>

    <!--卡片式資訊-->
    <div class="content_card">
      <p class="title_card_txt">票價</p>
      <label class="flex_row_cb">
        <p>{{operatorName}}</p>
        <p>{{operatorPhoneNumber}}</p>
      </label>
      <label class="flex_row_cb">
        <p>收費方式</p>
        <p>{{ticketPriceDescription}}</p>
      </label>
      <label class="flex_row_cb">
        <p>分段緩衝</p>
        <p>{{fareBufferZoneDescription}}</p>
      </label>
    </div>

    <!--卡片式資訊-->
    <div class="content_card">
      <p class="title_card_txt">平日發車</p>
      <div class="flex_row_sb">
        <div class="w_100">
          <label class="flex_row_cb">
            <p>首班車</p>
            <p>{{firstBusTime}}</p>
          </label>
          <label class="flex_row_cb">
            <p>尖峰班距</p>
            <p>(4~6分)</p>
          </label>
        </div>

        <div class="w_100">
          <label class="flex_row_cb">
            <p>末班車</p>
            <p>{{lastBusTime}}</p>
          </label>
          <label class="flex_row_cb">
            <p>離峰班距</p>
            <p>(5~10分)</p>
          </label>
        </div>
      </div>
      <label class="w_100">
        <p>備註</p>
      </label>
    </div>

    <!--卡片式資訊-->
    <div class="content_card">
      <p class="title_card_txt">假日發車</p>
      <div class="flex_row_sb">
        <div class="flex_col w_100">
          <label class="flex_row_cb">
            <p>首班車</p>
            <p>{{holidayFirstBusTime}}</p>
          </label>
          <label class="flex_row_cb">
            <p>尖峰班距</p>
            <p>(4~6分)</p>
          </label>
        </div>

        <div class="flex_col w_100">
          <label class="flex_row_cb">
            <p>末班車</p>
            <p>{{holidayLastBusTime}}</p>
          </label>
          <label class="flex_row_cb">
            <p>離峰班距</p>
            <p>(5~10分)</p>
          </label>
        </div>
      </div>
      <label class="w_100">
        <p>備註</p>
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
      //TODO change to popup
      console.log(err);
    })
  }
}
</script>

<style scoped>

</style>
