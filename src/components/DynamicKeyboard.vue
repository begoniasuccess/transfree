<template>
  <div>
    <div class="flex_row_cb">
      <p class="title_txt">{{ $t("dynamicKeyboard") }}</p>
      <i class="i_close"></i>
    </div>
    <div class="flex_row_cc">
      <button class="label_red" data-value="紅" @click="clickKeyboard">{{ $t("red") }}</button>
      <button class="label_blue" data-value="藍" @click="clickKeyboard">{{ $t("blue") }}</button>
      <button data-value="1" @click="clickKeyboard">1</button>
      <button data-value="2" @click="clickKeyboard">2</button>
      <button data-value="3" @click="clickKeyboard">3</button>
    </div>
    <div class="flex_row_cc">
      <button class="label_primary " data-value="綠" @click="clickKeyboard">{{ $t("green") }}</button>
      <button class="label_brown" data-value="棕" @click="clickKeyboard">{{ $t("brown") }}</button>
      <button data-value="4" @click="clickKeyboard">4</button>
      <button data-value="5" @click="clickKeyboard">5</button>
      <button data-value="6" @click="clickKeyboard">6</button>
    </div>
    <div class="flex_row_cc">
      <button class="label_sec" data-value="橘" @click="clickKeyboard">{{ $t("orange") }}</button>
      <button class="label_purple" data-value="小" @click="clickKeyboard">{{ $t("small") }}</button>
      <button data-value="7" @click="clickKeyboard">7</button>
      <button data-value="8" @click="clickKeyboard">8</button>
      <button data-value="9" @click="clickKeyboard">9</button>
    </div>

    <div class="flex_row_cc">
      <button data-value="幹線" @click="clickKeyboard">{{ $t("trunk") }}</button>
      <button data-value="先導" @click="clickKeyboard">{{ $t("lead") }}</button>
      <button class="label_primamry2" data-value="reset" @click="clickKeyboard">{{ $t("reset") }}</button>
      <button data-value="0" @click="clickKeyboard">0</button>
      <button class="label_primamry2" data-value="back" @click="clickKeyboard">{{ $t("backspace") }}</button>
    </div>
    <div class="flex_row_cc">
      <button data-value="市民" @click="clickKeyboard">{{ $t("citizen") }}</button>
      <button data-value="跳蛙" @click="clickKeyboard">{{ $t("jumpingFrog") }}</button>
      <button data-value="內科" @click="clickKeyboard">{{ $t("neihuSciencePark") }}</button>
      <button data-value="南軟" @click="clickKeyboard">{{ $t("nangangSoftwarePark") }}</button>
      <button data-value="夜間" @click="clickKeyboard">{{ $t("night") }}</button>
    </div>
    <div class="flex_row_cc">
      <button data-value="貓空" @click="clickKeyboard">{{ $t("maokong") }}</button>
      <button data-value="懷恩" @click="clickKeyboard">{{ $t("wyan") }}</button>
      <!--      <button data-value="其他" @click="clickKeyboard">其他</button>-->
      <button data-value="F" @click="clickKeyboard">F</button>
      <button data-value="R" @click="clickKeyboard">R</button>
      <button data-value="T" @click="clickKeyboard">T</button>
    </div>


  </div>
</template>

<script>
export default {
  name: "DynamicKeyboard",
  data() {
    return {};
  },
  methods: {
    clickKeyboard(event) {
      this.$emit(
          "clickKeyboard",
          event.currentTarget.getAttribute("data-value")
      );
    },
  },
};
</script>

<style scoped>
button {
  text-align: center;
  font-size: 1.75em;
  font-weight: bold;
  color: #2398A1;
  background-color: #FFFFFF;
  width: 75px;
  height: 70px;
  box-shadow: 0px 1px 6px 1px rgba(145, 145, 145, 0.6);
  border-radius: 8px;
  margin: 16px 4px;
  border-color: transparent;
}
.en button {
  min-width: 80px;
  min-height:80px;
  padding: 4px;
  font-size: 1em;
  letter-spacing: -1px;
  white-space: normal;
  line-height: 24px;


}
.label_primary {
  background-color: #2398A1;
  color: #FFFFFF;
}

.label_primamry2 {
  background-color: #FAF2E6;
  color: #2398A1;
}

.label_sec {
  background-color: #FFB13E;
  color: #FFFFFF;
}

.label_red {
  background-color: #DE4960;
  color: #FFFFFF;
}

.label_blue {
  background-color: #2d9cdb;
  color: #FFFFFF;
}

.label_brown {
  background-color: #BC671C;
  color: #FFFFFF;
}

.label_purple {
  background-color: #9e51e0;
  color: #FFFFFF;
}

/* @group [長度控制 max-width: 768px] (以下) ----------------------------------------------------------------------------------------*/
@media only screen and (max-width: 768px) {
  button {
    width: 70px;
    height: 70px;
    font-size: 1.5em;
    margin: 8px 4px;
  }

}


</style>
