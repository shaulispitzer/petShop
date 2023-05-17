<script setup>
import { computed, reactive, ref } from "vue";
import TheBasket from "./TheBasket.vue";
import EachItem from "./eachItem.vue";

import { useTheBasket } from "../stores/useTheBasket.js";
const basketUsage = useTheBasket();
import { useDisplayBasket } from "../stores/useDisplayBasket";
const sOrH = useDisplayBasket();
import {useItemsDisplay} from '../stores/useItemsDisplay';
const itemsDisplay = useItemsDisplay();

const props = defineProps({
  tag: String,
});
let filteredItems = computed(() => {
  if (props.tag === "all") {
    return itemsDisplay.allItems;
  } else {
    return itemsDisplay.allItems.filter((a) => a.tag === props.tag);
  }
});
function addAnother(e) {
  if (e.target.matches(".addOneMoreButton")) {
    // console.log(basket[parseInt(e.target.value)]);
    basketUsage.additem([basketUsage.newbasket[parseInt(e.target.value)]]);
  } else if (e.target.matches(".minusOneButton")) {
    basketUsage.newbasket.splice(parseInt(e.target.value), 1);
  }
}
</script>
<template><div class="flex">
  
  <Transition name="basketTransition">
    <TheBasket
      v-if="sOrH.isDisplayed"
      @change-amount="addAnother"
     
  /></Transition>
  <div class="griddingItems grow">
    <EachItem
      v-for="items in filteredItems"
      :key="items.itemName"
      :items="items"
    />
  </div>
  </div>
</template>
<style scoped>
.griddingItems {
  display: grid;
  grid-template-columns: repeat(auto-fit, minMax(200px, 1fr));
  grid-gap: 2px;
  align-content: space-between;
  align-items: center;
  transition: width 2s ease-in; 
}
.basketTransition-enter-from {
  transform: translateX(-90vh);
  opacity: 0.2;
}
.basketTransition-leave-active,
.basketTransition-enter-active,
.showingInBigTransition-leave-active {
  transition: 0.4s;
}
.basketTransition-leave-to {
  transform: translateX(-90vh);
  opacity: 0.2;
}
</style>
