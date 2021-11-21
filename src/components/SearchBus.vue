<template>
  <div class="h_100 w_100">

    <div class="flex_row_cb w_100 h_100">

      <div class="flex_col w_100 h_100">

        <!--主要搜尋列表-->
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
          <span v-if="isDynamicKeyboardShow">
            <DynamicKeyboard @clickKeyboard="clickKeyboard"></DynamicKeyboard>
          </span>
          <span v-if="isBusInfoShow">
            <BusInfo :city="$route.params.city" :routeName="$route.params.routeName"></BusInfo>
          </span>
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
<!--            <div class="block_list">-->
<!--              <div class="content_list">-->
<!--                <div class="list_top flex_row_cc">搜尋清單</div>-->
<!--                <div class="list_bottom flex_col">-->
<!--                  <div class="select_scrollbar">-->
<!--                    <div class="list_inner">-->
<!--                      <div class="flex_col">-->
<!--                        <p class="text_b">公車號碼</p>-->
<!--                        <p class="text_sec">行車方向</p>-->
<!--                      </div>-->
<!--                      <div class="flex_row_ce">-->
<!--                        <i class="i_love active"></i>-->
<!--                        <i class="i_next"></i>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    <div class="list_inner">-->
<!--                      <div class="flex_col">-->
<!--                        <p class="text_b">公車號碼</p>-->
<!--                        <p class="text_sec">行車方向</p>-->
<!--                      </div>-->
<!--                      <div class="flex_row_ce">-->
<!--                        <i class="i_love"></i>-->
<!--                        <i class="i_next"></i>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->


      <!--block_list:動態公車列表模式-->
      <div class="block_list">
        <router-view></router-view>
      </div>


      <!--block_list:動態公車地圖模式-->
<!--      <div class="block_list">-->
<!--        <div class="content_list">-->
<!--          <div class="list_top flex_row_cb">-->
<!--            &lt;!&ndash;模式切換&ndash;&gt;-->
<!--            <i class="i_model_list"></i>-->
<!--            <p>公車號碼</p>-->
<!--            <div class="flex_row_ce">-->
<!--              <i class="i_update" @click="getList"></i>-->
<!--              <i class="i_info"></i>-->
<!--            </div>-->
<!--          </div>-->

<!--          &lt;!&ndash; tab &ndash;&gt;-->
<!--          <div class="bookmark_container">-->
<!--            <button :class="{active : isGoListActive}" @click="isGoListActive = true">去</button>-->
<!--            <button :class="{active : !isGoListActive}" @click="isGoListActive = false">返</button>-->
<!--          </div>-->

<!--          <div class="list_bottom flex_col">-->
<!--            <div class="select_scrollbar">-->
<!--              &lt;!&ndash;地圖區域&ndash;&gt;-->
<!--              <div class="map_inner">-->
<!--                <i class="i_zoomin"></i>-->
<!--                <i class="i_zoomout active"></i>-->

<!--                &lt;!&ndash;站牌資訊&ndash;&gt;-->
<!--                &lt;!&ndash;                <div class="content_card">&ndash;&gt;-->
<!--                &lt;!&ndash;                  <div class="flex_row_cb">&ndash;&gt;-->
<!--                &lt;!&ndash;                    <p class="title_card_txt">站牌名稱</p>&ndash;&gt;-->
<!--                &lt;!&ndash;                    <i class="i_close"></i>&ndash;&gt;-->
<!--                &lt;!&ndash;                  </div>&ndash;&gt;-->
<!--                &lt;!&ndash;                  <label class="flex_row_cb">&ndash;&gt;-->
<!--                &lt;!&ndash;                    <p>路線</p>&ndash;&gt;-->
<!--                &lt;!&ndash;                    <p>路1</p>&ndash;&gt;-->
<!--                &lt;!&ndash;                  </label>&ndash;&gt;-->
<!--                &lt;!&ndash;                  <label class="flex_row_cb">&ndash;&gt;-->
<!--                &lt;!&ndash;                    <p>站序</p>&ndash;&gt;-->
<!--                &lt;!&ndash;                    <p>1</p>&ndash;&gt;-->
<!--                &lt;!&ndash;                  </label>&ndash;&gt;-->
<!--                &lt;!&ndash;                </div>&ndash;&gt;-->

<!--                &lt;!&ndash;公車資訊&ndash;&gt;-->
<!--                <div class="content_card">-->
<!--                  <div class="flex_row_cb">-->
<!--                    <p class="title_card_txt">站牌名稱</p>-->
<!--                    <i class="i_close"></i>-->
<!--                  </div>-->

<!--                  <label class="flex_row_cb">-->
<!--                    <p>營運業者</p>-->
<!--                    <p>統聯客運</p>-->
<!--                  </label>-->

<!--                  <label class="flex_row_cb">-->
<!--                    <p>車牌號碼</p>-->
<!--                    <div class="flex_row_ce">-->
<!--                      <p class="text_primary">590-GT</p>-->
<!--                      <i class="i_a11ybus"></i>-->
<!--                    </div>-->
<!--                  </label>-->
<!--                </div>-->
<!--                <div class=" black_overlay"></div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <p class="text_info">更新時間 {{ updateTime }}</p>-->
<!--          </div>-->

<!--        </div>-->
<!--      </div>-->

    </div>
  </div>
</template>

<script>
import {CITIES} from "../constant/city";
import {BUS_URL_V2, sendRequest} from "../utils/https";
import BusInfo from "./BusInfo";
import DynamicKeyboard from "./DynamicKeyboard";
import {getCurrentLocationInfo} from "../utils/location";

export default {
  name: "SearchBus",
  components: {DynamicKeyboard, BusInfo},
  data() {
    return {
      cities: CITIES,
      selected: CITIES[0],
      open: false,
      isDynamicKeyboardShow: false,
      isBusInfoShow: false
    }
  },
  //TODO need to remove(for testing axios and location)
  mounted() {
    sendRequest('get', `${BUS_URL_V2}/RealTimeByFrequency/Streaming/City/Hsinchu?$top=30&$format=JSON`)
        .then(res => {
          console.log(res);
        })

    getCurrentLocationInfo()
        .then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err);
    })
  },
  methods: {
    clickKeyboard(value) {
      console.log('parent:' + value);
      //TODO Do something to the search input.
      if(Number.isInteger(value)) {
        //Append value to input value.
      } else if ("reset" === value) {
        //Reset the input value.
      } else if ("back" === value) {
        //Backspace the input value
      } else {
        //Set the input value as value.
      }
    }
  }
}
</script>

<style src="../assets/css/global_modules.css"></style>
<style scoped></style>


