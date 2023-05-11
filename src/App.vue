<script setup>
import { ref, computed, reactive, watch, onMounted, shallowRef } from "vue";
import TheTopNav from "./components/TheTopNav.vue";
import ItemsAndBasket from "./components/itemsAndBasket.vue";
import AboutPage from "./components/about.vue";
import ContactPage from "./components/contact.vue";
import { useTheBasket } from "./stores/useTheBasket";
const basketUsage = useTheBasket();

let mainPage = ref("default");
let currentTag = ref("all");

function mainPageIsDefault() {
  mainPage.value = 'default';
  document.title = 'Vue New Pet Shop'
}

onMounted(() => {
  if (localStorage.getItem("basketItems")) {
    basketUsage.addFromLS(JSON.parse(localStorage.getItem("basketItems")));
  } else {
    return;
  }
});

</script>

<template>
  <TheTopNav
    v-model:selectedValue="currentTag"
    @showAbout="mainPage = 'about'"
    @openContact="mainPage = 'contact'"
  />
  <ItemsAndBasket
    :tag="currentTag"
    v-if="mainPage === 'default'"
  />

  <AboutPage v-if="mainPage === 'about'" @closeAbout="mainPageIsDefault" />
  <ContactPage v-if="mainPage === 'contact'" @back="mainPage = 'default'" />
</template>

<style scoped></style>
