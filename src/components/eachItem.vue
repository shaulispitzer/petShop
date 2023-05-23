<script setup>
import { computed, watch, ref, onMounted } from "vue";
import AddingTocartButtons from "./addingTocartButtons.vue";
import ModalInnerDetails from "./modalInnerDetails.vue";
import ShowInBasket from "./showInBasket.vue";
import { useTheBasket } from "../stores/useTheBasket";
const basketUsage = useTheBasket();
import { useChangeCurrency } from "../stores/useChangeCurrency";
const changingCurrency = useChangeCurrency();
const props = defineProps({
  items: Object,
});
const emit = defineEmits(["addFromMoreInfo"]);
const showInBig = ref(false);
const priceForItem = ref(0);


function openDetails() {
  showInBig.value = true;
}

let amountInCom = computed(() => {
  if (basketUsage.newbasket.some((e) => e.itemName === props.items.itemName)) {
    const index = basketUsage.newbasket.findIndex(
      (x) => x.itemName === props.items.itemName
    );
    priceForItem.value = changingCurrency.symbol + ((basketUsage.newbasket[index].quantity * basketUsage.newbasket[index].price) / +changingCurrency.currentRate).toFixed(2)
    return basketUsage.newbasket[index].quantity;
  } else {
    return 0;
  }
});
// console.log(items.itemName);
</script>
<template>
  <div class="itemCard relative" :class="{ thereIsIn: amountInCom }">
    <ShowInBasket v-if="amountInCom" class="absolute left-0 top-14" :amount="amountInCom" :totalPrice="priceForItem"/>
    <h1 class="itemName" @click="openDetails">{{ items.itemName }}</h1>
    <img class="image" :src="props.items.imageSrc ? '/images' + props.items.imageSrc : '/images/noImageAvailable.png'" @click="openDetails" />
    <p>Lorem ipsum dolor sit amet consectetur adipisi</p>
    <p class="price font-bold">{{ changingCurrency.symbol }}{{ (items.price / +changingCurrency.currentRate).toFixed(2) }}</p>

    <AddingTocartButtons :items1="items" />
  </div>
  <Teleport to="body">
    <Transition name="showingInBigTransition">
      <ModalInnerDetails
        v-if="showInBig"
        :item="items"
        @closeModal="showInBig = false"
      /> </Transition
  ></Teleport>
</template>

<style scoped>
.thereIsIn {
  border: 1px solid rgb(2, 240, 2) !important;
}
.itemCard {
  color: green;
  border: 1px solid black;
  padding-top: 2px;
  text-align: center;
  border-radius: 2vh;
  max-width: 250px;
  overflow: hidden;
  transition: all .3s;
  /* height: 21rem; */
}
.itemCard:hover{
  transform: scale(1.03);
  z-index: 2;
  background-color: white;
}

.itemName:hover {
  cursor: pointer;
  text-decoration: underline;
}
.image {
  width: 90%;
  height: 12vh;
  cursor: pointer;
  transition: all 0.1s;
}
.image:hover {
  border: 3px solid purple;
  box-sizing: border-box;
}
.showingInBigStyles {
  background-color: rgba(25, 25, 25, 0.4);
  display: grid;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
}
.showingInBigTransition-enter-from,
.showingInBigTransition-leave-to {
  opacity: 0;
}
.showingInBigTransition-enter-to,
.showingInBigTransition-leave-from {
  opacity: 1;
}
.showingInBigTransition-enter-active,
.showingInBigTransition-leave-active {
  transition: all 0.8s;
}
</style>
