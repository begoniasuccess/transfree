<template>
  <div class="w_100">

    <div class="flex_row_sb w_100 h_100">
      <!--左側列表設定-->
      <div class="flex_col w_100 h_100">

        <!--個人設定-->
        <div class="block_primary flex_col">
          <p class="title_txt">{{ $t("personalSettings") }}</p>

          <!--字體大小-->
          <div class="custom-select" @blur="isFontSizeOpen = false">
            <div class="selected" :class="{ open: isFontSizeOpen }"
                 @click="isFontSizeOpen = !isFontSizeOpen; isMultilingualOpen = false; isUpdateFrequencyOpen = false">
              {{ $t(selectedFontSizeText) }}
            </div>

            <div class="items flex_col" :class="{ selectHide: !isFontSizeOpen }">
              <p class="option_title">{{ $t("selectFontSize") }}</p>
              <div class="select_scrollbar">
                <div class="select_option"
                     @click="selectedFontSizeValue=fontSizeSmall;isFontSizeOpen=false">
                  {{ $t("fontSmall") }}
                </div>
                <div class="select_option"
                     @click="selectedFontSizeValue=fontSizeNormal;isFontSizeOpen=false">
                  {{ $t("fontNormal") }}
                </div>
                <div class="select_option"
                     @click="selectedFontSizeValue=fontSizeBig;isFontSizeOpen=false">
                  {{ $t("fontBig") }}
                </div>
                <div class="select_option"
                     @click="selectedFontSizeValue=fontSizeBigger;isFontSizeOpen=false">
                  {{ $t("fontBigger") }}
                </div>
              </div>
            </div>
          </div>

          <!--語系-->
          <div class="custom-select" @blur="isMultilingualOpen = false">
            <div class="selected" :class="{ open: isMultilingualOpen }"
                 @click="isMultilingualOpen = !isMultilingualOpen; isFontSizeOpen = false; isUpdateFrequencyOpen = false">
              {{ $t(selectedMultilingualText) }}
            </div>
            <div class="items flex_col" :class="{ selectHide: !isMultilingualOpen }">
              <p class="option_title">{{ $t("selectMultilingual") }}</p>
              <div class="select_scrollbar">
                <div class="select_option"
                     @click="selectedMultilingualValue=multilingualChinese; isMultilingualOpen=false">
                  {{ $t("tw") }}
                </div>
                <div class="select_option"
                     @click="selectedMultilingualValue=multilingualEnglish; isMultilingualOpen=false">
                  {{ $t("en") }}
                </div>
              </div>
            </div>
          </div>

        </div>

        <!--更新設定-->
        <div class="block_primary flex_col">
          <p class="title_txt">{{ $t("updateSettings") }}</p>

          <!--自動更新-->
          <!-- switch -->
          <div class="custom-switch">
            <div class="selected"><p>{{ $t("autoUpdateRoute") }}</p></div>
            <div class="switch_open_close">
              <input type="checkbox" id="toggle" v-model="selectedIsAutoUpdate">
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
          <div class="custom-select" @blur="isUpdateFrequencyOpen = false">
            <div class="selected" :class="{ open: isUpdateFrequencyOpen }"
                 @click="isUpdateFrequencyOpen = !isUpdateFrequencyOpen; isFontSizeOpen = false; isMultilingualOpen = false">
              <p class="text_overflow">
              {{ $t("arrivalTimeUpdateFrequency") }} {{ selectUpdateFrequency }} {{ $t("seconds") }}</p>
            </div>

            <div class="items flex_col" :class="{ selectHide: !isUpdateFrequencyOpen }">

              <p class="option_title">{{ $t("selectUpdateFrequency") }}</p>
              <div class="select_scrollbar">
                <div class="select_option"
                     @click="selectUpdateFrequency=updateFrequencyFaster;isUpdateFrequencyOpen=false">
                  {{ $t("arrivalTimeUpdateFrequency") }} {{ updateFrequencyFaster }} {{ $t("seconds") }}
                </div>
                <div class="select_option"
                     @click="selectUpdateFrequency=updateFrequencyFast;isUpdateFrequencyOpen=false">
                  {{ $t("arrivalTimeUpdateFrequency") }} {{ updateFrequencyFast }} {{ $t("seconds") }}
                </div>
                <div class="select_option"
                     @click="selectUpdateFrequency=updateFrequencyMedian;isUpdateFrequencyOpen=false">
                  {{ $t("arrivalTimeUpdateFrequency") }} {{ updateFrequencyMedian }} {{ $t("seconds") }}
                </div>
                <div class="select_option"
                     @click="selectUpdateFrequency=updateFrequencySlow;isUpdateFrequencyOpen=false">
                  {{ $t("arrivalTimeUpdateFrequency") }} {{ updateFrequencySlow }} {{ $t("seconds") }}
                </div>
                <div class="select_option"
                     @click="selectUpdateFrequency=updateFrequencySlower;isUpdateFrequencyOpen=false">
                  {{ $t("arrivalTimeUpdateFrequency") }} {{ updateFrequencySlower }} {{ $t("seconds") }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--版本資訊-->
        <div class="block_primary flex_col">
          <p class="title_txt">{{ $t("versionSettings") }}</p>

          <!--版本資訊-->
          <div class="content_card">
            <p class="title_card_txt">{{ $t("versionInfo") }}</p>
            <label class="flex_row_cb">
              <p>{{ $t("programVersion") }}</p>
              <p>{{ programVersion }}</p>
            </label>
            <label class="flex_row_cb">
              <p>{{ $t("routeVersion") }}</p>
              <p>{{ routeVersion }}</p>
            </label>
          </div>
        </div>
      </div>

      <!--右側列表功能-->
      <div class="flex_row w_100 margin_top">
        <div class="block_setting">
          <div class="flex_col_cc h_100">
            <i class="i_reset"></i>
            <p class="text_b">{{ $t("resetCommonBus") }}</p>
          </div>
        </div>

        <address class="block_setting">
          <a href="mailto:transfree@gmail.com">
            <div class="flex_col_cc h_100">
              <i class="i_contact"></i>
              <p class="text_b">{{ $t("contactUs") }}</p>
            </div>
          </a>
        </address>
      </div>

      <!--初始圖-->
      <div class="img_04"></div>

    </div>
  </div>

</template>

<script>
import {
  GLOBAL_FONT_SIZE_BIG,
  GLOBAL_FONT_SIZE_BIGGER,
  GLOBAL_FONT_SIZE_NORMAL,
  GLOBAL_FONT_SIZE_SMALL,
  GLOBAL_MULTILINGUAL_CHINESE,
  GLOBAL_MULTILINGUAL_ENGLISH,
  GLOBAL_UPDATE_FREQUENCY_FAST,
  GLOBAL_UPDATE_FREQUENCY_FASTER,
  GLOBAL_UPDATE_FREQUENCY_MEDIAN,
  GLOBAL_UPDATE_FREQUENCY_SLOW,
  GLOBAL_UPDATE_FREQUENCY_SLOWER,
  PROGRAM_VERSION,
  ROUTE_VERSION
} from '../constant/common';

export default {
  name: "Settings.vue",
  data() {
    return {
      programVersion: PROGRAM_VERSION,
      routeVersion: ROUTE_VERSION,
      fontSizeSmall: GLOBAL_FONT_SIZE_SMALL,
      fontSizeNormal: GLOBAL_FONT_SIZE_NORMAL,
      fontSizeBig: GLOBAL_FONT_SIZE_BIG,
      fontSizeBigger: GLOBAL_FONT_SIZE_BIGGER,
      isFontSizeOpen: false,
      selectedFontSizeValue: this.$store.getters.getFontSize,
      updateFrequencyFaster: GLOBAL_UPDATE_FREQUENCY_FASTER,
      updateFrequencyFast: GLOBAL_UPDATE_FREQUENCY_FAST,
      updateFrequencyMedian: GLOBAL_UPDATE_FREQUENCY_MEDIAN,
      updateFrequencySlow: GLOBAL_UPDATE_FREQUENCY_SLOW,
      updateFrequencySlower: GLOBAL_UPDATE_FREQUENCY_SLOWER,
      isUpdateFrequencyOpen: false,
      selectUpdateFrequency: this.$store.getters.getUpdateFrequency,
      selectedIsAutoUpdate: this.$store.getters.getIsAutoUpdate,
      isMultilingualOpen: false,
      selectedMultilingualValue: this.$store.getters.getMultilingual,
      multilingualChinese: GLOBAL_MULTILINGUAL_CHINESE,
      multilingualEnglish: GLOBAL_MULTILINGUAL_ENGLISH
    }
  },
  props: {
    globalFontSize: Number
  },
  computed: {
    selectedFontSizeText: {
      get() {
        return this.getFontSizeText(this.selectedFontSizeValue);
      },
      // eslint-disable-next-line
      set(value) {

      }
    },
    selectedMultilingualText: {
      get() {
        // return this.getMultilingualText(this.selectedMultilingualValue);
        return this.selectedMultilingualValue;
      },
      // eslint-disable-next-line
      set(value) {

      }
    }
  },
  watch: {
    // eslint-disable-next-line
    selectedFontSizeValue: function (newValue, oldValue) {
      this.$store.dispatch('setFontSize', newValue);
    },
    // eslint-disable-next-line
    selectedMultilingualValue: function (newValue, oldValue) {
      this.$store.dispatch('setMultilingual', newValue);
    },
    // eslint-disable-next-line
    selectedIsAutoUpdate: function (newValue, oldValue) {
      this.$store.dispatch('setIsAutoUpdate', newValue);
    },
    // eslint-disable-next-line
    selectUpdateFrequency: function (newValue, oldValue) {
      this.$store.dispatch('setUpdateFrequency', newValue);
    }
  },
  methods: {
    getFontSizeText(fontSize) {
      switch (fontSize) {
        case GLOBAL_FONT_SIZE_SMALL:
          return "fontSmall";
        case GLOBAL_FONT_SIZE_NORMAL:
          return "fontNormal";
        case GLOBAL_FONT_SIZE_BIG:
          return "fontBig";
        case GLOBAL_FONT_SIZE_BIGGER:
          return "fontBigger";
      }
    }
  }

}
</script>

<style scoped>

</style>
