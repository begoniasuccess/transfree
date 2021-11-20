<template>
  <div class="h_100 w_100">

    <div class="flex_row_cb w_100 h_100">
      <!--左側列表設定-->
      <div class="flex_col w_100 h_100">

        <!--個人設定-->
        <div class="block_primary flex_col">
          <p class="title_txt">個人設定</p>

          <!--字體大小-->
          <div class="custom-select" @blur="isFontSizeOpen = false">
            <div class="selected" :class="{ open: isFontSizeOpen }" @click="isFontSizeOpen = !isFontSizeOpen">
              {{ selectedFontSizeText }}
            </div>

            <div class="items flex_col" :class="{ selectHide: !isFontSizeOpen }">
              <p class="option_title">請選擇字體大小</p>
              <div class="select_scrollbar">
                <div class="select_option"
                     @click="selectedFontSizeText=fontSizeTextSmall; selectedFontSizeValue=fontSizeSmall;isFontSizeOpen=false">{{fontSizeTextSmall}}
                </div>
                <div class="select_option"
                     @click="selectedFontSizeText=fontSizeTextNormal; selectedFontSizeValue=fontSizeNormal;isFontSizeOpen=false">{{fontSizeTextNormal}}
                </div>
                <div class="select_option"
                     @click="selectedFontSizeText=fontSizeTextBig; selectedFontSizeValue=fontSizeBig;isFontSizeOpen=false">{{fontSizeTextBig}}
                </div>
                <div class="select_option"
                     @click="selectedFontSizeText=fontSizeTextBigger; selectedFontSizeValue=fontSizeBigger;isFontSizeOpen=false">{{fontSizeTextBigger}}
                </div>
              </div>
            </div>
          </div>

          <!--語系-->
          <div class="custom-select">
            <div class="selected">中文</div>
            <div class="items flex_col" style="display: none">>
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
          <div class="custom-switch">
            <div class="selected">路線資料自動更新</div>
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
          </div>


          <!--更新頻率-->
          <div class="custom-select">
            <div class="selected">到站時間更新頻率 15秒</div>

            <div class="items flex_col" style="display: none;">

              <p class="option_title">請選擇到站時間更新頻率</p>
              <div class="select_scrollbar">
                <div class="select_option">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--版本資訊-->
        <div class="block_primary flex_col">
          <p class="title_txt">版本資訊</p>

          <!--版本資訊-->
          <div class="content_card">
            <p class="title_card_txt">票價</p>
            <label class="flex_row_cb">
              <p>程式版本</p>
              <p>V1.1.1</p>
            </label>
            <label class="flex_row_cb">
              <p>路線版本</p>
              <p>V2</p>
            </label>
          </div>
        </div>
      </div>

      <!--右側列表功能-->
      <div class="flex_row  w_100 h_100">
        <div class="block_setting">
          <div class="flex_col_cc h_100">
            <i class="i_reset"></i>
            <p class="text_b">重設常用公車</p>
          </div>
        </div>

        <div class="block_setting">
          <div class="flex_col_cc h_100">
            <i class="i_contact"></i>
            <p class="text_b">聯絡我們</p>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import {
  GLOBAL_FONT_SIZE_BIG,
  GLOBAL_FONT_SIZE_BIGGER,
  GLOBAL_FONT_SIZE_NORMAL,
  GLOBAL_FONT_SIZE_SMALL,
  GLOBAL_FONT_SIZE_TEXT_BIG,
  GLOBAL_FONT_SIZE_TEXT_BIGGER,
  GLOBAL_FONT_SIZE_TEXT_NORMAL,
  GLOBAL_FONT_SIZE_TEXT_SMALL
} from '../constant/common';

export default {
  name: "Settings.vue",
  data() {
    return {
      fontSizeSmall: GLOBAL_FONT_SIZE_SMALL,
      fontSizeNormal: GLOBAL_FONT_SIZE_NORMAL,
      fontSizeBig: GLOBAL_FONT_SIZE_BIG,
      fontSizeBigger: GLOBAL_FONT_SIZE_BIGGER,
      fontSizeTextSmall: GLOBAL_FONT_SIZE_TEXT_SMALL,
      fontSizeTextNormal: GLOBAL_FONT_SIZE_TEXT_NORMAL,
      fontSizeTextBig: GLOBAL_FONT_SIZE_TEXT_BIG,
      fontSizeTextBigger: GLOBAL_FONT_SIZE_TEXT_BIGGER,
      isFontSizeOpen: false,
      selectedFontSizeValue: this.$store.getters.getFontSize
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
    }
  },
  watch: {
    // eslint-disable-next-line
    selectedFontSizeValue: function (newValue, oldValue) {
      this.$store.dispatch('setFontSize', newValue);
    }
  },
  methods: {
    getFontSizeText(fontSize) {
      switch (fontSize) {
        case 0.75:
          return this.fontSizeTextSmall;
        case 1:
          return this.fontSizeTextNormal;
        case 1.25:
          return this.fontSizeTextBig;
        case 1.5:
          return this.fontSizeTextBigger;
      }
    }
  }

}
</script>

<style scoped>

</style>
