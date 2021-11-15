<template>
  <div id="app">

    <div class="content">

      <!--左側功能menu-->
      <div class="menu">

        <!--logo-->
        <div class="img_logo"></div>

        <!--btn-->
        <div class="flex_col_cc h_100">
          <router-link to="/search-bus" class="menu_btn" active-class="active">
            <i class="menu_i_search"></i>
            <div class="menu_btn_txt">
              公車搜尋
            </div>
          </router-link>

          <div class="menu_btn">
            <i class="menu_i_favoraite"></i>
            <div class="menu_btn_txt">常用公車</div>
          </div>

          <div class="menu_btn">
            <i class="menu_i_set"></i>
            <div class="menu_btn_txt">設定</div>
          </div>
        </div>
      </div>

      <!--右側顯示區塊-->
      <div class="search">

        <!--友善專區-->
        <div class="btn_a11y">
          <div>切換友善專區</div>
          <i class="i_a11y"> </i>
        </div>

        <!--功能區塊-->
        <div class="content_function">
          <router-view></router-view>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
// import Test from "./components/Test.vue";
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    // HelloWorld,
    // Test
  },
};
</script>

<style>
/* ---預設設定--- */
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
  margin:auto!important;
}

/* ---底版位置設定--- */
.content {
  position: fixed;
  width: calc(100vw - 48px);
  max-width: 1392px;
  max-height: 1392px;
  height: calc(100vh - 96px);
  margin: 48px 24px;

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

/* ---menu按鈕--- */
.menu_btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 76px;
  margin: 24px 48px 24px 36px;
  text-decoration:none;
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
.menu_btn:hover{
  transition: .3s;
  transform: scale(1.1);
}

.menu_btn:hover > .menu_btn_txt{
  color: #FFB13E;
}

.search {
  position: absolute;
  top: 0;
  right: 0;

  width: calc(100vw - 200px);
  max-width: 1220px;
  height: calc(100vh - 96px);
  padding: 36px;

  background-color: #FFFFFF;
  border-radius: 24px;
  z-index: 999;
}

.content_function {
  width: 100%;
  height: calc(100% - 36px);
}

.btn_a11y {

  display: flex;
  flex-direction: row;
  align-items:flex-end!important;
  justify-content: flex-end!important;
  width:100%;
  margin-bottom: 16px;
  font-weight: bold;
}

/* ---flex排列--- */
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

/* ---images--- */
.img_logo {
  display: inline-block;
  width: 48px;
  height: 48px;
  background-image: url("./assets/images/logo.png");
  background-repeat: no-repeat;
  background-size: 48px;
  position: absolute;
  top: 36px;
  left: 48px;
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

</style>
