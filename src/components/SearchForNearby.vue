<template>
  <!--主要搜尋列表-->
  <div class="block_primary flex_col">
    <p class="title_txt">{{ $t(page) }}</p>

    <div class="custom-select" @blur="open = false">
        {{ $t("currentCity") }}：{{ $t(nowCity) }}
    </div>

    <!-- 距離範圍input -->
    <div class="form-group">
        <label class="custom-select" for="distanceInput">{{$t(inputHint)}}</label>
        <input
            name="distanceInput"
            type="text"
            class="inner_group text_overflow"
            :placeholder="$t('distanceUnit')"
            v-model="inputValue"
            @focus="focusInputValue()"
        />
    </div>
    

    <!--搜尋時間-->
    <p class="text_info" v-if="searchTimestamp != ''">
      {{ $t("searchTimestamp") }} {{ searchTimestamp }}
    </p>
  </div>
</template>

<script>
import { getCurrentDateTime } from "../utils/date";

export default {
  name: "SearchForNearby",
  props: {
    nowCity: String,
    inputValue: Number,
    page: String,
    inputHint: String,
  },
  data() {
    return {
      open: false,
      searchTimestamp: "",
    };
  },
  mounted() {},
  methods: {
    focusInputValue() {
      this.$emit("getInputValue", this.inputValue);
    },
    updateSearchTimestamp() {
      this.searchTimestamp = getCurrentDateTime();
    },
  },
  watch: {
    inputValue: function () {
      this.$emit("getInputValue", this.inputValue);
      this.updateSearchTimestamp();
    },
    selected: function () {
      this.$emit("getInputValue", this.inputValue);
      if (this.inputValue !== "") {
        this.updateSearchTimestamp();
      }
    },
  },
};
</script>

<style scoped></style>
