<template>
  <div class="h_100 w_100">

    <div class="flex_row_cb w_100 h_100">

      <div class="flex_col w_100 h_100">

        <!--主要列表-->
        <div class="block_primary flex_col">
          <p class="title_txt">公車搜尋</p>


          <div class="custom-select" @blur="open = false">
            <div class="selected" :class="{ open: open }" @click="open = !open">
              {{ selected.text }}
            </div>

            <div class="items flex_col" :class="{ selectHide: !open }">

              <p class="option_title">請選擇縣市</p>
              <div class="select_scrollbar">
                <div class="select_option" v-for="(city, i) in cities" :key="i" @click="selected = city;open = false;">
                  {{ city.text }}
                </div>
              </div>
            </div>
          </div>

          <!-- 路線-input -->
          <input type="text" class="inner_group" placeholder="請輸入路線、站名">

          <!--＝搜尋時間-->
          <p class="text_info">搜尋時間 2021/11/21 20:22:11</p>
        </div>

        <!--次要列表-->
        <div class="block_sec flex_col select_scrollbar">
          <p class="title_txt">公車相關資訊</p>

          <!--卡片式資訊-->
          <div class="content_card">
            <p class="title_card_txt">票價</p>
            <label class="flex_row_cb">
              <p>營運業者</p>
              <p>連絡電話</p>
            </label>
            <label class="flex_row_cb">
              <p>收費方式</p>
              <p>兩段式</p>
            </label>
            <label class="flex_row_cb">
              <p>分段緩衝</p>
              <p>民權松江路口-銘傳大學</p>
            </label>
          </div>

          <!--卡片式資訊-->
          <div class="content_card">
            <p class="title_card_txt">平日發車</p>
            <div class="flex_row_sb">
              <div class="w_100">
                <label class="flex_row_cb">
                  <p>首班車</p>
                  <p>05:10</p>
                </label>
                <label class="flex_row_cb">
                  <p>尖峰班距</p>
                  <p>4~6分</p>
                </label>
              </div>

              <div class="w_100">
                <label class="flex_row_cb">
                  <p>末班車</p>
                  <p>22:30</p>
                </label>
                <label class="flex_row_cb">
                  <p>離峰班距</p>
                  <p>5~10分</p>
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
              <div class="w_100">
                <label class="flex_row_cb">
                  <p>首班車</p>
                  <p>05:10</p>
                </label>
                <label class="flex_row_cb">
                  <p>尖峰班距</p>
                  <p>4~6分</p>
                </label>
              </div>

              <div class="w_100">
                <label class="flex_row_cb">
                  <p>末班車</p>
                  <p>22:30</p>
                </label>
                <label class="flex_row_cb">
                  <p>離峰班距</p>
                  <p>5~10分</p>
                </label>
              </div>
            </div>
            <label class="w_100">
              <p>備註</p>
            </label>
          </div>
        </div>
      </div>

      <!--右側列表-->
      <!--block_list:白箱狀態-->
      <!--            <div class="block_list">-->
      <!--              <div class="content_list">-->
      <!--                <div class="list_top flex_col_cc">搜尋清單</div>-->
      <!--                <div class="list_bottom flex_col_cc">-->
      <!--                  <div class="img_box"></div>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--            </div>-->

      <!--block_list:搜尋列表-->
      <!--      <div class="block_list">-->
      <!--        <div class="content_list">-->
      <!--          <div class="list_top flex_row_cc">搜尋清單</div>-->
      <!--          <div class="list_bottom flex_col">-->
      <!--            <div class="select_scrollbar">-->
      <!--                <div class="list_inner">-->
      <!--                   <div class="flex_col">-->
      <!--                      <p class="text_b">公車號碼</p>-->
      <!--                      <p class="text_sec">行車方向</p>-->
      <!--                   </div>-->
      <!--                   <div class="flex_row_ce">-->
      <!--                      <i class="i_love"></i>-->
      <!--                      <i class="i_next"></i>-->
      <!--                   </div>-->
      <!--                </div>-->
      <!--                <div class="list_inner">-->
      <!--                    <div class="flex_col">-->
      <!--                      <p class="text_b">公車號碼</p>-->
      <!--                      <p class="text_sec">行車方向</p>-->
      <!--                    </div>-->
      <!--                  <div class="flex_row_ce">-->
      <!--                      <i class="i_love"></i>-->
      <!--                      <i class="i_next"></i>-->
      <!--                  </div>-->
      <!--                </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->


      <!--block_list:動態公車列表-->
      <div class="block_list">
        <router-view></router-view>
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

<style src="../assets/css/global_modules.css"></style>
<style scoped></style>


