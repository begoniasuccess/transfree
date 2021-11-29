<template>
  <!--主要搜尋列表-->
  <div class="block_primary flex_col">
    <p class="title_txt">{{ $t(page) }}</p>

    <div class="custom-select" @blur="open = false">
      <div class="selected" :class="{ open: open }" @click="open = !open">
        {{ $t(selected.value) }}
      </div>

      <div class="items flex_col" :class="{ selectHide: !open }">
        <p class="option_title">{{ $t("selectCity") }}</p>
        <div class="select_scrollbar">
          <div
            class="select_option"
            v-for="(city, i) in cities"
            :key="i"
            @click="
              selected = city;
              open = false;
            "
          >
            {{ $t(city.value) }}
          </div>
        </div>
      </div>
    </div>

    <!-- 路線-input -->
    <input
      type="text"
      class="inner_group text_overflow"
      :placeholder="$t(inputHint)"
      v-model="inputValue"
      @focus="focusInputValue()"
    />

    <!--搜尋時間-->
    <p class="text_info" v-if="searchTimestamp != ''">
      {{ $t("searchTimestamp") }} {{ searchTimestamp }}
    </p>
  </div>
</template>

<script>
import { CITIES } from "../constant/city";
import { getCurrentDateTime } from "../utils/date";

export default {
  name: "Search",
  props: {
    selectedCity: String,
    inputValue: String,
    page: String,
    inputHint: String,
  },
  data() {
    return {
      cities: CITIES,
      selected: CITIES[0],
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
      this.$emit("getSearchCity", this.selected);
      this.$emit("getInputValue", this.inputValue);
      if (this.inputValue !== "") {
        this.updateSearchTimestamp();
      }
    },
  },
};
</script>

<style src="../assets/css/global_all.css"></style>
<style scoped></style>
