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
            <div class="selected">
            </div>

            <div class="items flex_col">

              <p class="option_title">請選擇字體大小</p>
              <div class="select_scrollbar">
                <div class="select_option">
                </div>
              </div>
            </div>
          </div>

          <!--語系-->
          <div class="custom-select">
            <div class="selected">
            </div>

            <div class="items flex_col">

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

          <!--更新頻率-->
          <div class="custom-select">
            <div class="selected">
            </div>

            <div class="items flex_col">

              <p class="option_title">請選擇到站時間更新頻率</p>
              <div class="select_scrollbar">
                <div class="select_option">
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
export default {
  name: "Settings.vue"
}
</script>

<style scoped>

</style>
