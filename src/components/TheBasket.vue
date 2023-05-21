<script setup>
import { computed, ref} from "vue";
import TheEmptBasketQ from "./TheEmptyBasketQ.vue";
import { useTheBasket } from "../stores/useTheBasket";
const basketUsage = useTheBasket();
import { useChangeCurrency } from "../stores/useChangeCurrency";
const changingCurrency = useChangeCurrency();
import { useDisplayBasket } from "../stores/useDisplayBasket";
const sOrH = useDisplayBasket();

let asked = ref(false);
let emit = defineEmits(["changeAmount", "hideBasket"]);
let sortBasket = computed(() => {
  return basketUsage.newbasket.sort(function (a, b) {
    var textA = a.itemName.toUpperCase();
    var textB = b.itemName.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
});
const isThereAnImage = computed(() => {
  if (items.imageSrc) {
    return "/images" + items.imageSrc;
  } else {
    return "/images/noImageAvailable.png";
  }
});

function close() {
  asked.value = false;
  console.log('really closed');
}
</script>

<template>
  <div class="basketDesign">
    <p>{{ basketUsage.newbasket.length ? basketUsage.amountOfItems : "empty" }}</p>
    <p class="text-3xl text-amber-600">BASKET</p>
    <h3>
      Total: {{ changingCurrency.symbol }} {{ (basketUsage.totalPrice / +changingCurrency.currentRate).toFixed(2) }}
    </h3>
    <div>
      <Transition name="emptyTransition">
        <TheEmptBasketQ
          v-if="asked"
          @close="close"
        />
      </Transition>
      <TransitionGroup name="fade" tag="ul" class="content">
        <li
          v-for="items in sortBasket"
          :key="items.id"
          class="bottomBorder py-1 flex justify-evenly"
        >
      <img :src="items.imageSrc ? '/images' + items.imageSrc : '/images/noImageAvailable.png'" class="h-5 w-6"/>
          <span class="itemName w-20 h-5 truncate text-center"> {{ items.itemName }}</span>
          <button
            @click="basketUsage.minusOne(items)"
          >
            -
          </button>
          <span class="itemQuantity px-2 w-3.5 flex justify-center">{{ items.quantity }}</span
          ><button
            @click="basketUsage.plusOne(items)"
          >
            +
          </button>
        </li></TransitionGroup
      >
      <!-- </ul> -->
    </div>
    <div class="basketButtons">
      <button class="emptyBasket" @click="asked = true">empty basket</button>
      <button class="hideBasket" @click="sOrH.toggleBasket">hide basket</button>
    </div>
  </div>
</template>
<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
.basketButtons {
  position: absolute;
  bottom: 0.4vh;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  column-gap: 2%;
}
.basketButtons > button {
  background-color: rgba(11, 11, 49, 0.747);
  color: aqua;
  border: 0;
  border-radius: 0.5rem;
  padding: 0.3rem;
  cursor: pointer;
  transition: all 0.2s ease-out;
}
.emptyBasket:hover,
.hideBasket:hover {
  transform: translateY(-2px);
  color: rgb(187, 252, 252);
}
.basketDesign {
  position: sticky;
  top: 100px;
  float: left;
  background: aqua;
  width: 30vw;
  max-width: 200px;
  height: 60vh;
  padding: 10px;
  margin: 2px;
  z-index: 2;
  border-radius: 2vh;
  min-width: 160px;
}
.content {
  position: relative;
  list-style: none;
  height: 30vh;
  overflow: auto;
  margin-left: 0;
  margin-right: 0;
  padding-left: 0;
  width: 98%;
}

.emptyTransition-enter-from {
  /* transform: translateY(-90vh); */
  opacity: 0.1;
  /* transform: scale(0.2, 0.2); */
}
.emptyTransition-enter-active,
.emptyTransition-leave-active {
  transition: 0.2s;
}
.emptyTransition-leave-to {
  opacity: 0;
}
</style>
<style>
.shoppingListImage {
  height: 2.5vh;
  width: 3.5vh;
}
.shopping-item {
  display: grid;
  grid-template-columns: 1fr 1fr auto 1fr auto;
  grid-gap: 1px;
  align-items: center;
  padding: 2px;
  border-bottom: 1px solid rgb(3, 121, 175);
}
.amountOfTheItem {
  margin: auto;
  font-weight: 700;
}
.bottomBorder {
  border-bottom: 1px solid rgb(167, 166, 166);
}
</style>
