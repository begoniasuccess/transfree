<template>
  <div>
    <button data-value="1" @click="clickKeyboard">1</button>
    <button data-value="2" @click="clickKeyboard">2</button>
    <button data-value="3" @click="clickKeyboard">3</button>
    <button data-value="4" @click="clickKeyboard">4</button>
    <button data-value="5" @click="clickKeyboard">5</button>
    <button data-value="6" @click="clickKeyboard">6</button>
    <button data-value="7" @click="clickKeyboard">7</button>
    <button data-value="8" @click="clickKeyboard">8</button>
    <button data-value="9" @click="clickKeyboard">9</button>
    <button data-value="0" @click="clickKeyboard">0</button>
    <button data-value="紅" @click="clickKeyboard">紅</button>
    <button data-value="藍" @click="clickKeyboard">藍</button>
    <button data-value="綠" @click="clickKeyboard">綠</button>
    <button data-value="棕" @click="clickKeyboard">棕</button>
    <button data-value="橘" @click="clickKeyboard">橘</button>
    <button data-value="小" @click="clickKeyboard">小</button>
    <button data-value="幹線" @click="clickKeyboard">幹線</button>
    <button data-value="先導" @click="clickKeyboard">先導</button>
    <button data-value="市民" @click="clickKeyboard">市民</button>
    <button data-value="跳蛙" @click="clickKeyboard">跳蛙</button>
    <button data-value="內科" @click="clickKeyboard">內科</button>
    <button data-value="南軟" @click="clickKeyboard">南軟</button>
    <button data-value="夜間" @click="clickKeyboard">夜間</button>
    <button data-value="貓空" @click="clickKeyboard">貓空</button>
    <button data-value="懷恩" @click="clickKeyboard">懷恩</button>
    <button data-value="其他" @click="clickKeyboard">其他</button>
    <button data-value="F" @click="clickKeyboard">F</button>
    <button data-value="R" @click="clickKeyboard">R</button>
    <button data-value="T" @click="clickKeyboard">T</button>
    <button data-value="reset" @click="clickKeyboard">重設</button>
    <button data-value="back" @click="clickKeyboard">BACK</button>
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
</style>
