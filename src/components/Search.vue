<template>
  <!--主要搜尋列表-->
  <div class="block_primary flex_col">
    <p class="title_txt">{{ $t("searchBus") }}</p>

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
      :placeholder="$t('enterRouteName')"
      v-model="inputValue"
      @focus="focusInputValue()"
    />

    <!--＝搜尋時間-->
    <p class="text_info">{{ $t("searchTimestamp") }} 2021/11/21 20:22:11</p>
  </div>
</template>

<script>
import { CITIES } from "../constant/city";

export default {
  name: "Search",
  props: {
    selectedCity: String,
    inputValue: String,
  },
  data() {
    return {
      cities: CITIES,
      selected: CITIES[0],
      open: false,
    };
  },
  //TODO need to remove(for testing axios and location)
  mounted() {},
  methods: {
    focusInputValue() {
      console.log("focusInputValue");
      this.$emit("getInputValue", this.inputValue);
    },
  },
  watch: {
    inputValue: function () {
      console.log("inputValue");
      this.$emit("getInputValue", this.inputValue);
    },
    selected: function () {
      this.$emit("getSearchCity", this.selected);
      this.$emit("getInputValue", this.inputValue);
    },
  },
};
</script>

<style src="../assets/css/global_all.css"></style>
<style scoped></style>
