<template>
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
            <p>公車站牌名稱</p>
          </div>
          <div class="flex_row_ce">
            <p class="text_primary">590-GT</p>
            <i class="i_a11ybus"></i>
          </div>
        </div>
      </div>
      <p class="text_info">更新時間 yyyy/mm/dd hh/mm/ss</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "EstimatedTimeOfArrival",
  mounted() {
    console.log(this.$route.params.city);
    console.log(this.$route.params.routeName);
  }
}
</script>

<style scoped>

</style>
