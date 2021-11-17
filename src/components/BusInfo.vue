<template>
  <div>
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
</template>

<script>
export default {
  name: "BusInfo"
}
</script>

<style scoped>

</style>
