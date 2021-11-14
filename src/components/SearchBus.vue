<template>
  <div class="h_100 w_100">

    <div class="flex_row_cb w_100 h_100">

      <div class="flex_col_cc w_100 h_100">

        <!--主要列表-->
        <div class="block_primary flex_col">
          <p class="title_txt">公車搜尋</p>

          <!-- 位置-select -->
<!--          <div class="inner_group flex_row_cb">-->
<!--            <div class="select_inner">-->
<!--              <div>當前預設位置</div>-->
<!--              </div>-->
<!--              <i class="i_down"></i>-->
<!--            </div>-->

          <div class="custom-select" @blur="open = false">
            <div class="selected" :class="{ open: open }" @click="open = !open">
              {{ selected.text }}
            </div>
            <div class=" inner_scrollbar">
            <div class="items" :class="{ selectHide: !open }">
              <div class="list_title">請選擇縣市</div>
              <div v-for="(city, i) in cities" :key="i"
                @click="
                  selected = city;
                  open = false;">
                {{city.text}}
              </div>
            </div>
            </div>
          </div>


          <!-- 路線-input -->
          <input type="text" class="inner_group" placeholder="請輸入路線、站名搜尋">
          <p class="text_info">搜尋時間 2021/11/21 20:22:11</p>
        </div>

        <!--次要列表-->
        <div class="block_sec flex_col">

        </div>

      </div>

      <div class="block_list">
        <div class="content_list">
          <div class="list_top">list</div>
          <div></div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import {CITIES} from "../constant/city";
import {BUS_URL_V2, sendRequest} from "../utils/https";

export default {
  name: "SearchBus",
  data() {
    return {
      cities: CITIES,
      selected: CITIES[0],
      open: false
    }
  },
  //TODO need to remove(for testing axios)
  mounted() {
    sendRequest('get', `${BUS_URL_V2}/RealTimeByFrequency/Streaming/City/Hsinchu?$top=30&$format=JSON`)
      .then(res => {
        console.log(res);
      })
  }
}


</script>

<style scoped>

.block_primary{
  width: 100%;
  height:233px;
  padding: 24px 40px;
  background-color: #FAF2E6;
  border-radius: 20px;
  box-shadow: 0px 2px 20px 0px rgba(145, 145, 145, 0.6);
  margin-bottom: 36px;
}

.block_sec{
  width: 100%;
  height: calc(100% - 233px);
  background-color: #E9F4F5;
  border-radius: 20px;
  box-shadow: 0px 2px 20px 0px rgba(145, 145, 145, 0.6);
}

.block_list{
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 24px;

  background-image: url("../assets/images/img_listbg.png");
  background-position: center;
  background-repeat: no-repeat;

  border-radius: 20px;
  box-shadow: 0px 2px 20px 0px rgba(145, 145, 145, 0.6);
  margin-left: 36px;
}
.content_list{
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
  border-radius: 20px;
  box-shadow: 0px 2px 20px 0px rgba(145, 145, 145, 0.6);
}
.list_top{
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-weight: bold;
  box-shadow: 0px 1px 10px 0px rgba(217, 217, 217, 1);
}

.title_txt{
  font-size: 1.375em;
  font-weight: bold;
  color: #2398A1;
  margin-bottom: 16px;
}

.text_info{
  font-size: 0.875em;
  text-align: right;
  width: 100%;
}

/* ---inner背景樣式--- */
.inner_group {
  background-color: #ffffff;
  border-radius: 20px;
  border-color: transparent;
  box-shadow: 0px 0px 8px 0px rgba(145, 145, 145, 0.3);
  padding-right: 16px;
  width: 100%;
  height: 40px;
  margin-bottom: 16px;
}

input{
  padding: 8px 0px 8px 16px;
  /* ---input 游標樣式--- */
  caret-color: #4A4A4A;
}

input::placeholder{
  color: #919191;
}

input:focus{
  border-color:transparent;
  box-shadow: 0px 1px 6px 1px rgba(35, 152, 161, 1);
  outline: 0 none;
}

/* -- input Type: select -- */
.select_inner {
  display: inline-block;
  width: calc(100% - 28px);
  height: 40px;
  padding: 8px 0px 8px 16px;
}

.select_inner>div{
  font-weight: bold;
}



/* -- input Type: 錯誤狀態 -- */
/* ---原為隱藏--- */
.input_text_alert {
  display: none;
}
/* ---input_錯誤文字樣式 --- */
.active_error .input_text_alert {
  background-image: url("../assets/images/icon/i_a11y.svg");
  background-repeat: no-repeat;
  background-position: right;
  color: #FFB13E;

  display: inline-block;
  width: 100%;
  padding: 8px 28px 12px 0px;
  text-align: right;
  /* justify-content: flex-end; */
}

/* ---有active_error時，Input下錯誤顯示--- */
.active_error .input_default {
  border: 1px solid #FFB13E;
}

.active_error .inner_group {
  border: 1px solid #FFB13E;
}

.i_down{
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url("../assets/images/icon/i_down.svg");
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: center;
}


.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 40px;
  line-height: 40px;
  margin-bottom: 16px;
}

.custom-select .selected {
  padding-left: 1em;
  cursor: pointer;
  user-select: none;

  background-color: #ffffff;
  border-radius: 20px;
  border-color: transparent;
  box-shadow: 0px 0px 8px 0px rgba(145, 145, 145, 0.3);
  padding-right: 16px;
  width: 100%;
  height: 40px;
  margin-bottom: 16px;
}

.custom-select .selected.open {
  border-color: transparent;
  box-shadow: 0px 1px 6px 1px rgba(35, 152, 161, 1);
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 9px;
  right: 16px;

  width: 24px;
  height: 24px;
  background-image: url("../assets/images/icon/i_down.svg");
  background-repeat: no-repeat;
  background-size: 20px;
}

.custom-select .selected.open:after{
  background-image: url("../assets/images/icon/i_up.svg");
}

.list_title{
  height: 48px;
  border-bottom: 1px solid #D9D9D9;
  padding-bottom: 12px;
 font-weight: bold;
}
.custom-select .items {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1;
  overflow-y: scroll;

  background-color: #FFFFFF;
  border-radius: 20px;
  box-shadow: 0px 1px 6px 1px rgba(35, 152, 161, 1);
  max-height: 340px;
}

.custom-select .items div {
  height: 48px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  padding-right: 8px;
}

.custom-select .items div:hover {
 color:#2398A1;
}


.selectHide {
  display: none;
}

</style>
