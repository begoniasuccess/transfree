<template>
  <div class="h_100 w_100">

    <div class="flex_row_cb w_100 h_100">
      <div class="flex_col_cc w_100 h_100">
        <div class="block_primary">search</div>
        <div class="block_sec">data</div>
      </div>

      <div class="block_list">list</div>
    </div>

  </div>
</template>

<script>
export default {
  name: "SearchBus"
}
</script>

<style scoped>

.block_primary{
  width: 100%;
  height:233px;
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
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  box-shadow: 0px 2px 20px 0px rgba(145, 145, 145, 0.6);
  margin-left: 36px;
}


</style>
