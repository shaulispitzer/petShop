<script setup>
import { useTheBasket } from "../stores/useTheBasket";
const basketUsage = useTheBasket();
import { useChangeCurrency } from "../stores/useChangeCurrency";
const changingCurrency = useChangeCurrency();
import { useDisplayBasket } from "../stores/useDisplayBasket";
const sOrH = useDisplayBasket();
const props = defineProps({ item: Object });
const emit = defineEmits(["closeModal"]);
function closeModal(e) {
  if (e.target === e.currentTarget) {
    emit("closeModal");
  }
}
</script>
<template>
  <div class="modalOuter z-20" @click="closeModal">
    <div class="modalInner">
      <p class="text-center font-bold uppercase text-xl">{{ item.itemName }}</p>
      <div class="flex justify-center">
      <img :src="props.item.imageSrc ? '/images' + props.item.imageSrc : '/images/noImageAvailable.png'" class="center"/>
    </div>
      <p>{{ item.moreInfo }}</p>
      <p class="w-full text-center">
        <span>{{ changingCurrency.symbol }}</span
        >{{(item.price / +changingCurrency.currentRate).toFixed(2) }}
      </p>
      <div class="flex justify-center">
      <button @click="basketUsage.additem(props.item)" class="mr-3 translate-y-full duration-150">add to cart</button>
      <button @click="sOrH.toggleBasket">{{ sOrH.isShown}} basket</button>
    </div>
  </div>
  </div>
</template>
<style scoped>
.modalOuter {
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

.modalInner {
  max-width: 600px;
  width: 60vh;
  background: white;
  height: 100vh;
  align-items: center;
  padding: 9px;
}

</style>
