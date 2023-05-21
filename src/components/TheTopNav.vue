<script setup>
import { ref, computed, onMounted,watch } from "vue";
import StoreLogIn from "./storeLogIn.vue";
import currencies from "../assets/currencies.json"
import { useTheBasket } from "../stores/useTheBasket";
const basketUsage = useTheBasket();
import { useChangeCurrency } from "../stores/useChangeCurrency";
const changingCurrency = useChangeCurrency();
import { useDisplayBasket } from "../stores/useDisplayBasket";
const sOrH = useDisplayBasket();
import {useItemsDisplay} from '../stores/useItemsDisplay';
const itemsDisplay = useItemsDisplay();
const emit = defineEmits([
  "update:selectedValue",
  "showAbout",
  "openContact",
]);
let scrolled = ref(false);
let basketUpdated = ref(false);
let selectedCurrency = ref(changingCurrency.currencyCode);
let openTopNav = ref(true);
let logIn = ref(false);
let createdInLast5Ms = ref(true)

onMounted(()=>{
  setTimeout(()=> createdInLast5Ms = false, 10);
  if(localStorage.getItem("currency code")){
    changingCurrency.changeCurrency(localStorage.getItem("currency code"))
  }
 window.addEventListener('scroll', ()=> {if (window.scrollY > 100) 
 {
scrolled.value = true}
else {scrolled.value = false}});
} )

watch(basketUsage.newbasket, () =>{ 
  
  basketUpdated.value = true;
  localStorage.setItem("basketItems", JSON.stringify(basketUsage.newbasket));
  setTimeout(() => basketUpdated.value = false, 1500);
});

watch(()=>changingCurrency.currencyCode,() =>
selectedCurrency.value = changingCurrency.currencyCode)
const props = defineProps({
  selectedValue: String,
});

let tags = computed(() => ["select catagoery:", "all", ...new Set(itemsDisplay.tagsOnly)]);
</script>
<template>
  <div class="top z-10">
    <nav class="buttons" :class="{responsive: !openTopNav, buttonsshrink: !scrolled}">
      <img src="/images/petShopLogoNew.jpg" class="w-24 h-24 duration-300" :class="{smaller: scrolled}"/>
      <button class="allButtons regular rightButton" @click="sOrH.toggleBasket">
        <span class="tooltiptext w-[120px] bg-black text-white text-center rounded-md px-1 py-1 absolute top-[120%] left-1/2 ml-[-60px] z-1"  v-show="basketUpdated">Basket Updated</span
        ><span>{{ sOrH.isShown }}</span>
        <span class="iconandlength">
          <i class="fa-solid fa-basket-shopping"></i>
          <span class="relative inline-block w-5 h-5 rounded-full bg-slate-50 right-1.5 text-sm">{{ basketUsage.amountOfItems }}</span>
        </span>
      </button>
      <select
        class="allButtons regular"
        id="berel"
        @change="$emit('update:selectedValue', $event.target.value)"      >
        <option v-for="tag in tags" :key="tag" :disabled="tag === 'select catagoery:'">
          {{ tag }}
        </option>
      </select>
      <button class="allButtons regular" id="berel" @click="logIn = true">
        store log-in
      </button>
      <button class="allButtons regular" id="berel" @click="$emit('openContact')">
        contact
      </button>
      <!-- making a new div -->
      <button
        class="allButtons addCustomItem regular"
        id="berel"
        @click="$emit('showAbout')"
      >
        about
      </button>
      <select
        class="allButtons regular"
        @change="changingCurrency.changeCurrency($event.target.value)"
        id="allButtons" v-model="selectedCurrency"
      >
      <option disabled>select currency:</option>
        <option v-for="(value, name) in currencies" :key="value" :value="name">
          {{ name }} - {{ value }}
        </option>
      </select>

      <button class="allButtons regular" id="berel">{{createdInLast5Ms}}</button>

      <a
        class="icon allButtons"
        href="javascript:void(0);"
        @click="openTopNav = !openTopNav"
      >
        <i v-if="openTopNav" style="fontsize: 2vh" class="fa-solid fa-bars"></i
        ><i v-if="!openTopNav" style="fontsize: 3vh" class="fa-solid fa-xmark"></i>
      </a>
    </nav>
  </div>
  <Teleport to="body">
    <StoreLogIn
      v-if="logIn"
      @close="logIn = false"
  /></Teleport>
</template>
<style scoped>

.tooltiptext::after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent black transparent;
}
.allButtons {
  float: right;
  padding: 10px;
  background-color: aqua;
  text-decoration: none;
  height: 50px;
  width: 10vw;
  box-sizing: border-box;
  border-left: 1px solid grey;
  border-right: 1px solid grey;
  text-align: center;
  border-bottom: none;
  border-top: none;
  
  font-weight: 800;
  font-family: sans-serif;
  color: black;
  font-size: 1.5vh;
  /* display: flex; */
  /* justify-content:center; */
}
.allButtons:hover:not(.tooltiptext) {
  opacity: 0.5;
}
.allButtons:focus {
  outline-color: blueviolet;
}
.top {
  position: sticky;
  top: 0;
  
}

.smaller {
  height:  50px;
  width: 50px;
}
.buttons {
  background-color: rgba(245, 239, 232);
  margin-left: 0.5vw;
  margin-right: 0.5vw;
  font-weight: 600;
  transition: 0.4s;
}
.buttonsshrink{
  padding-top: 2vh;
  margin-bottom: 1vh;
}
.rightButton {
  margin-right: 1vw;
  position: relative;
  display: inline-block;
}
.buttons .icon {
  display: none;
}
@media screen and (max-width: 760px) {
  .regular {
    display: none;
  }
  /* .topnav .image  {display: none;} */
  .buttons .icon {
    display: block;
    float: right;
  }

  /* .regular {display: block;} */
  .buttons.responsive {
    position: relative;
  }
  .buttons.responsive .regular {
    float: none;
    display: block;
  }
  .buttons.responsive a.icon {
    position: absolute;
    top: 0;
    right: 0;
  }
  .buttons.responsive .allButtons:not(.icon) {
    margin-right: 1vw;
    width: 95vw;
    margin-top: 0;
    border-bottom: 0.5px solid gray;
    border-left: none;
  }
  .top {
    position: relative;
    left: 0;
    right: 0;
  }
  .BasketDesign {
    position: absolute !important;
  }
}

.fa-solid {
  font-size: 1.2rem;
}
.iconandlength {
  white-space: nowrap;
}
</style>
