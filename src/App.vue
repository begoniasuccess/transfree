<template>
  <div id="app" :style="{fontSize: globalFontSize + 'em'}" :class="{a11y : isA11y, en: isEn}">
    <!--        popup-->
    <div class="content_popup" v-if="isPopupShow">
      <!--版本資訊-->
      <div class="flex_row_cb">
        <p class="title_card_txt">提醒您</p>
        <i class="i_close"></i>
      </div>

      <div class="flex_row_cc">
        <p v-if="isA11y">請問您要切換為一般專區嗎？</p>
        <p v-if="!isA11y">請問您要切換為友善專區嗎？</p>
      </div>

      <div class="flex_row_cc">
        <button class="bus_status2" type="button" @click="isPopupShow = false">取消</button>
        <button class="bus_status1" type="button" @click="isA11y = !isA11y; isPopupShow = false">確定</button>
      </div>
    </div>
    <div class="black_overlay"></div>

    <div class="content">

      <!--左側功能menu-->
      <div class="menu" :style="[isMobileOpenMenu ? '' : {'transform' : 'translate( -100%,0)'}]">

        <!--logo-->
        <div class="img_logo"></div>

        <!--btn-->
        <div class="flex_col_cc h_100">
          <router-link to="/search-bus" class="menu_btn" active-class="active">
            <i class="menu_i_search"></i>
            <div class="menu_btn_txt">
              <!--              公車搜尋-->
              {{ $t("searchBus") }}
            </div>
          </router-link>

          <div class="menu_btn">
            <i class="menu_i_stop"></i>
            <div class="menu_btn_txt">
              {{ $t("nearbyStop") }}
            </div>
          </div>

          <router-link to="/commonly-used-bus" class="menu_btn" active-class="active">
            <i class="menu_i_favoraite"></i>
            <div class="menu_btn_txt">
              {{ $t("commonlyUsed") }}
            </div>
          </router-link>

          <router-link to="/settings" class="menu_btn" active-class="active">
            <i class="menu_i_set"></i>
            <div class="menu_btn_txt">
              {{ $t("settings") }}
            </div>
          </router-link>
        </div>
      </div>


      <!--右側顯示區塊-->
      <div class="search">

        <!--友善專區-->
        <div class="btn_a11y">
          <div v-if="!isA11y" @click="isPopupShow = true">{{ $t("switchToFriendlyArea") }}</div>
          <div v-if="isA11y" @click="isPopupShow = true">{{ $t("switchToNormalArea") }}</div>
          <i class="i_a11y" @click="isPopupShow = true"></i>
        </div>

        <div class="header_mobile flex_row_cb">
          <i class="i_menu" @click="mobileSwitchMenu"> </i>
          <i class="img_logo_mobile"></i>
          <div class="btn_a11y">
            <div v-if="!isA11y" @click="isA11y = !isA11y">{{ $t("switchToFriendlyArea") }}</div>
            <div v-if="isA11y" @click="isA11y = !isA11y">{{ $t("switchToNormalArea") }}</div>
            <i class="i_a11y" @click="isA11y = !isA11y"> </i>
          </div>
        </div>
        <div class="black_overlay"></div>

        <!--功能區塊-->
        <div class="content_function select_scrollbar">
          <router-view></router-view>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
// import Test from "./components/Test.vue";
// import HelloWorld from "./components/HelloWorld.vue";

import {GLOBAL_MULTILINGUAL_ENGLISH} from "./constant/common";

export default {
  name: "App",
  components: {
    // HelloWorld,
    // Test
  },
  data() {
    return {
      globalFontSize: this.$store.getters.getFontSize,
      isA11y: false,
      isEn: false,
      isMobileOpenMenu: true,
      isPopupShow: false
    }
  },
  watch: {
    '$store.state.fontSize': function () {
      this.globalFontSize = this.$store.getters.getFontSize
    },
    '$i18n.locale': function () {
      if (this.$i18n.locale === GLOBAL_MULTILINGUAL_ENGLISH) {
        this.isEn = true
      } else {
        this.isEn = false;
      }
    }
  },
  methods: {
    mobileSwitchMenu() {
      this.isMobileOpenMenu = !this.isMobileOpenMenu;
    }
  }
};
</script>

<style>

/* group [default] ---------------------------------------------------------------------------------------- */
#app {
  font-family: 'Noto Sans CJK TC', 'Microsoft JhengHei';
  font-size: 16px;
  line-height: 24px;
  color: #4A4A4A;
  font-weight: normal;
  text-align: left;
  text-justify: distribute;
  text-justify: inter-ideograph;
  background-color: #FFFFFF;

  -webkit-font-smoothing: antialiased;
  -webkit-overflow-scrolling: touch;
  word-break: break-word;

  display: flex;
  justify-content: center;

  padding: 0;
  margin: 0;
  overflow: hidden;
}

p {
  margin-block-start: auto;
  margin-block-end: auto;
  margin: 0 !important;
}

a {
  color: #4A4A4A !important;
  text-decoration: none !important;
}

@media only screen and (max-width: 320px) {
  #app {
    font-size: 14px;
  }
}


/* End [default] ---------------------------------------------------------------------------------------- */

/* group [position] ---------------------------------------------------------------------------------------- */
/* ---底版位置設定--- */
.content {
  position: fixed;
  width: calc(100vw - 48px);
  max-width: 1392px;
  max-height: 1392px;
  height: calc(100vh - 48px);
  margin: 24px;

  background-color: #2398A1;
  border-radius: 24px;
  box-shadow: 0px 2px 20px 0px rgba(145, 145, 145, 0.6);
  z-index: 9;
}

/* ---menu位置設定--- */
.menu {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 172px;
  height: 100%;
  border-radius: 24px;
  background-color: #2398A1;
  z-index: 99;
}
.a11y .menu,
.a11y .content{
  background-color: #1A777E;
}

/* ---menu按鈕--- */
.menu_btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 76px;
  margin: 24px 48px 0px 36px;
  text-decoration: none;
}

/* ---menu按鈕-底下文字--- */
.menu_btn_txt {
  width: auto;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: #FFFFFF;
  overflow-y: hidden;
  white-space: nowrap;
}

/* ---menu按鈕-active文字--- */
.menu_btn.active .menu_btn_txt {
  color: #FFB13E;
  font-weight: bold;
}

/* ---menu按鈕-hover--- */
.menu_btn:hover {
  transition: .3s;
  transform: scale(1.1);
}

.menu_btn:hover > .menu_btn_txt {
  color: #FFB13E;
}

/* ---右側列表設定--- */
.search {
  position: absolute;
  top: 0;
  right: 0;

  width: calc(100vw - 200px);
  max-width: 1220px;
  height: calc(100vh - 48px);
  max-height: 1392px;

  background-color: #FFFFFF;
  border-radius: 24px;
  z-index: 999;
}

.content_function {
  width: 100%;
  height: calc(100% - 56px);
  padding: 36px;
}

/* ---手機版 header--- */
.header_mobile {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 42px;
  font-weight: bold;
  padding: 16px;
  z-index: 999;
  background-color: white;
  box-shadow: 0px 1px 10px 0px rgba(217, 217, 217, 1);

}

.btn_a11y {
  display: flex;
  flex-direction: row;
  align-items: flex-end !important;
  justify-content: flex-end !important;
  width: auto;
  margin-top: 16px;
  margin-bottom: 16px;
  padding-right: 36px;
  font-weight: bold;
}

div.btn_a11y:hover{
  cursor: pointer;
}


/* End [position] ---------------------------------------------------------------------------------------- */

/* group [flex] ---------------------------------------------------------------------------------------- */

.flex_row {
  display: flex;
  flex-direction: row;
}

.flex_col {
  display: flex;
  flex-direction: column;
}

.flex_row_cb {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.flex_row_sb {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
}


.flex_row_c {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.flex_row_cc {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.flex_row_ce {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.flex_col_cc {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.h_100 {
  height: 100%;
}

.w_100 {
  width: 100%;
}

/* End [flex] ---------------------------------------------------------------------------------------- */

/* ---images--- */
.img_logo {
  display: inline-block;
  width: 105px;
  height: 69px;
  background-image: url("./assets/images/img_logo.svg");
  background-repeat: no-repeat;
  background-size: 105px;
  position: absolute;
  top: 36px;
  left: 24px;
  cursor: auto;
}

.img_logo_mobile {
  display: flex;
  width: 138px;
  height: 22px;
  background-image: url("./assets/images/img_logo_mobile.svg");
  background-repeat: no-repeat;
  background-size: 100%;
  position: absolute;
  top: 10px;
  left: 60px;
  cursor: auto!important;
  transform:none!important;
}

/* ---icon--- */
.i_a11y {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url("./assets/images/icon/i_a11y.svg");
  background-repeat: no-repeat;
  background-size: 24px;
  margin-left: 4px;
  cursor: none;
  transform: none;
  /*background-position: center;*/
}

.i_menu {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url("./assets/images/icon/i_menu.svg");
  background-repeat: no-repeat;
  background-size: 24px;
  margin-left: 4px;
  /*background-position: center;*/
}

/*menu-icon*/
.menu_i_search {
  display: inline-block;
  width: 48px;
  height: 48px;
  background-image: url("./assets/images/icon/i_search_menu.svg");
  background-repeat: no-repeat;
  background-size: 48px;
  background-position: center;
}

.menu_i_favoraite {
  display: inline-block;
  width: 48px;
  height: 48px;
  background-image: url("./assets/images/icon/i_favoraite_menu.svg");
  background-repeat: no-repeat;
  background-size: 48px;
  background-position: center;
}

.menu_i_set {
  display: inline-block;
  width: 48px;
  height: 48px;
  background-image: url("./assets/images/icon/i_set_menu.svg");
  background-repeat: no-repeat;
  background-size: 48px;
  background-position: center;
}

.menu_i_stop {
  display: inline-block;
  width: 48px;
  height: 48px;
  background-image: url("./assets/images/icon/i_stop_menu.svg");
  background-repeat: no-repeat;
  background-size: 48px;
  background-position: center;
}

/*menu-icon-active 設定*/
.menu_btn.active .menu_i_search {
  background-image: url("./assets/images/icon/i_search_menu_s.svg");
}

.menu_btn.active .menu_i_favoraite {
  background-image: url("./assets/images/icon/i_favoraite_menu_s.svg");
}

.menu_btn.active .menu_i_set {
  background-image: url("./assets/images/icon/i_set_menu_s.svg");
}

.menu_btn.active .menu_i_stop {
  background-image: url("./assets/images/icon/i_stop_menu_s.svg");
}



</style>
