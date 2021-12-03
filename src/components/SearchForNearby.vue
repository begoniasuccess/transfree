<template>
  <!--主要搜尋列表-->
  <div class="block_primary flex_col">
    <p class="title_txt">{{ $t(page) }}</p>

    <!-- 當前縣市select -->
    <div class="form-group">
      <label class="custom-select" for="">{{$t("currentCity")}}</label>
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
    </div>

    <!-- 距離範圍input -->
    <div class="form-group">
        <label class="custom-select" for="distanceInput">{{$t(inputHint)}}</label>
        <input
            name="distanceInput"
            type="number"
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
import { CITIES } from "../constant/city";
import { getCurrentDateTime } from "../utils/date";

export default {
  name: "SearchForNearby",
  props: {
    inputValue: Number,
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
      this.$emit("getSelected", this.selected);
      if (this.selected !== "") {
        this.updateSearchTimestamp();
      }
    },
  },
};
</script>

<style scoped></style>
