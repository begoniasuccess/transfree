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

            <div class="items flex_col" :class="{ selectHide: !open }">

              <p class="option_title">請選擇縣市</p>
              <div class="select_scrollbar">
                <div class="select_option" v-for="(city, i) in cities" :key="i" @click="selected = city;open = false;">
                  {{city.text}}
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
        <div class="block_sec flex_col">
        </div>
      </div>

      <!--block_list:白箱狀態-->
<!--      <div class="block_list">-->
<!--        <div class="content_list">-->
<!--          <div class="list_top flex_col_cc">搜尋清單</div>-->
<!--          <div class="list_bottom flex_col_cc">-->
<!--            <div class="img_box"></div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

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
        <div class="content_list">
          <div class="list_top flex_row_cb">
            <!--模式切換-->
            <i class="i_model_map"></i>
            <p>搜尋清單</p>
            <div class="flex_row_ce">
              <i class="i_update"></i>
              <i class="i_info"></i>
            </div>
          </div>

          <!-- tab -->


          <div class="bookmark_container">
            <button class="active">預設頁籤</button>
            <button>頁籤選項</button>
          </div>



          <div class="list_bottom flex_col">
            <div></div>
            <div class="select_scrollbar">

              <div class="list_inner">
                <div class="flex_row">
                  <label class="bus_status1"><span>4</span>分</label>
                  <p>公車站牌名稱</p>
                </div>
                <div class="flex_row_ce">
                  <p class="text_primary">590-GT</p>
                  <i class="i_a11ybus"></i>
                </div>
              </div>

              <div class="list_inner">
                <div class="flex_row">
                  <label class="bus_status1"><span>4</span>分</label>
                  <p >公車站牌名稱</p>
                </div>
                <div class="flex_row_ce">
                  <p class="text_primary">590-GT</p>
                  <i class="i_a11ybus"></i>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {CITIES} from "../constant/city";

export default {
  name: "SearchBus",
  data() {
    return {
      cities: CITIES,
      selected: CITIES[0],
      open: false
    }
  }
}
</script>

<style src="../assets/css/global_modules.css"></style>
<style scoped></style>


