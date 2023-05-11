<script setup>
import { ref } from "vue";
import { useTheBasket } from "../stores/useTheBasket";
const basketUsage = useTheBasket();

const props = defineProps({
  items1: Object,
});
const item = ref(props.items1);
const amountToAdd = ref(1);
const miniArray = ref([props.items1]);
function addAnother() {
  amountToAdd.value++;
  miniArray.value.push(item.value);
}
function minusOne() {
  amountToAdd.value--;
  miniArray.value.pop();
}

function push() {
  miniArray.value.push(item.value);
}
function addToBasket() {
  basketUsage.additem(item.value, amountToAdd.value);
  amountToAdd.value = 1;
  miniArray.value.splice(0, miniArray.value.length - 1);
}
</script>
<template>
  <button @click="minusOne" :disabled="amountToAdd <= 1">-</button
  ><input type="number" v-model.number="amountToAdd" /><button @click="addAnother">
    +
  </button>
  <button class="addingButton text-white bg-black w-full text-base font-bold py-[10px] cursor-pointer h-[50px] mt-px transition-all duration-300 ease-out" @click="addToBasket" :disabled="amountToAdd < 1">
    add to basket
  </button>
</template>
<style scoped>

.addingButton:disabled {
  opacity: 50%;
  cursor: not-allowed;
}
.addingButton:hover {
  font-size: 22px;
}
input {
  width: 14px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  appearance: textfield;
  -moz-appearance: textfield;
}
</style>
