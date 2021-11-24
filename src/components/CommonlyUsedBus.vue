<template>
  <div class="h_100 w_100">

    <div class="flex_row_cb w_100 h_100">

      <div class="flex_col w_100 h_100">

        <!--主要搜尋列表-->
        <div class="block_primary flex_col">
          <p class="title_txt">公車搜尋</p>

          <div class="custom-select" @blur="open = false">
            <div class="selected" :class="{ open: open }" @click="open = !open">
              當前所在縣市
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
          <input type="text" class="inner_group" placeholder="請輸入路線、站名搜尋">

          <!--＝搜尋時間-->
          <p class="text_info">搜尋時間 2021/11/21 20:22:11</p>
        </div>

        <!--次要列表-->
        <div class="block_sec img_first flex_col_cc">
          <div class="img_03"></div>
        </div>
      </div>

      <!--右側列表-->
      <!--block_list:白箱狀態-->
      <!--      <div class="block_list">-->
      <!--        <div class="content_list">-->
      <!--          <div class="list_top flex_col_cc">搜尋清單</div>-->
      <!--          <div class="list_bottom flex_col_cc">-->
      <!--            <div class="img_box"></div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->


      <!--block_list:常用搜尋列表-->
<!--      <div class="block_list">-->
<!--        <div class="content_list">-->
<!--          <div class="list_top flex_row_cc">搜尋清單</div>-->
<!--          <div class="list_bottom flex_col">-->
<!--            <div class="select_scrollbar">-->
<!--              <div class="list_inner">-->
<!--                <div class="flex_col">-->
<!--                  <p class="text_b">公車號碼</p>-->
<!--                  <p class="text_sec">行車方向</p>-->
<!--                </div>-->
<!--                <div class="flex_row_ce">-->
<!--                  <i class="i_love active"></i>-->
<!--                  <i class="i_info"></i>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="list_inner">-->
<!--                <div class="flex_col">-->
<!--                  <p class="text_b">公車號碼</p>-->
<!--                  <p class="text_sec">行車方向</p>-->
<!--                </div>-->
<!--                <div class="flex_row_ce">-->
<!--                  <i class="i_love active"></i>-->
<!--                  <i class="i_info"></i>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

    </div>
  </div>
</template>

<script>
export default {
  name: "CommonlyUsedBus"
}
</script>

<style scoped>

</style>
