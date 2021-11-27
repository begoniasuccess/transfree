<template>
  <!--主要搜尋列表-->
  <div class="block_primary flex_col">
    <p class="title_txt">{{ $t("searchBus") }}</p>

    <div class="custom-select" @blur="open = false">
      <div class="selected" :class="{ open: open }" @click="open = !open">
        {{ selected.text }}
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
            {{ city.text }}
          </div>
        </div>
      </div>
    </div>

    <!-- 路線-input -->
    <input
        type="text"
        class="inner_group"
        :placeholder="$t('enterRouteName')"
        v-model="inputValue"
    />

    <!--＝搜尋時間-->
    <p class="text_info">{{ $t("searchTimestamp") }} 2021/11/21 20:22:11</p>
  </div>
</template>

<script>
import {CITIES} from "../constant/city";

export default {
  name: "Search",
  props: {
    selectedCity: String,
    search: String,
  },
  data() {
    return {
      cities: CITIES,
      selected: CITIES[0],
      open: false,
      inputValue: "",
    };
  },
  //TODO need to remove(for testing axios and location)
  mounted() {
  },
  methods: {
    clickKeyboard(value) {
      console.log("parent:" + value);
      //TODO Do something to the search input.
      if (Number.isInteger(value)) {
        //Append value to input value.
      } else if ("reset" === value) {
        //Reset the input value.
      } else if ("back" === value) {
        //Backspace the input value
      } else {
        //Set the input value as value.
      }
    },
  },
  watch: {
    inputValue: function () {
      this.$emit("getInputValuee", this.inputValue);
    },
    selected: function () {
      this.$emit("getSearchCity", this.selected.value);
    },
  },
};
</script>

<style src="../assets/css/global_all.css"></style>
<style scoped></style>
