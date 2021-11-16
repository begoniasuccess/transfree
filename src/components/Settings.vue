<template>
  <div class="h_100 w_100">

    <div class="flex_row_cb w_100 h_100">
      <!--左側列表設定-->
      <div class="flex_col w_100 h_100">

        <!--個人設定-->
        <div class="block_primary flex_col">
          <p class="title_txt">個人設定</p>

          <!--字體大小-->
          <div class="custom-select">
            <div class="selected">字體 正常</div>
            <div class="items flex_col" style="display: none">
              <p class="option_title">請選擇字體大小</p>
              <div class="select_scrollbar">
                <div class="select_option">
                </div>
              </div>
            </div>
          </div>

          <!--語系-->
          <div class="custom-select">
            <div class="selected">中文</div>
            <div class="items flex_col" style="display: none">>
              <p class="option_title">請選擇語言</p>
              <div class="select_scrollbar">
                <div class="select_option">
                </div>
              </div>
            </div>
          </div>

        </div>

        <!--更新設定-->
        <div class="block_primary flex_col">
          <p class="title_txt">更新設定</p>

          <!--自動更新-->
          <!-- switch -->
          <div class="custom-switch">
            <div class="selected">路線資料自動更新</div>
            <div class="switch_open_close">
              <input type="checkbox" id="toggle">
              <label for="toggle">
                <i></i>
                <div class="flex_row_cb">
                  <p>ON</p>
                  <p>OFF</p>
                </div>
              </label>
            </div>
          </div>


          <!--更新頻率-->
          <div class="custom-select">
            <div class="selected">到站時間更新頻率 15秒</div>

            <div class="items flex_col" style="display: none;">

              <p class="option_title">請選擇到站時間更新頻率</p>
              <div class="select_scrollbar">
                <div class="select_option">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--版本資訊-->
        <div class="block_primary flex_col">
          <p class="title_txt">版本資訊</p>

          <!--版本資訊-->
          <div class="content_card">
            <p class="title_card_txt">票價</p>
            <label class="flex_row_cb">
              <p>程式版本</p>
              <p>V1.1.1</p>
            </label>
            <label class="flex_row_cb">
              <p>路線版本</p>
              <p>V2</p>
            </label>
          </div>
        </div>
      </div>

      <!--右側列表功能-->
      <div class="flex_row  w_100 h_100">
        <div class="block_setting">
          <div class="flex_col_cc h_100">
            <i class="i_reset"></i>
            <p class="text_b">重設常用公車</p>
          </div>
        </div>

        <div class="block_setting">
          <div class="flex_col_cc h_100">
            <i class="i_contact"></i>
            <p class="text_b">聯絡我們</p>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
export default {
  name: "Settings.vue"
}
</script>

<style scoped>

</style>
