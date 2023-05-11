<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useTheBasket } from "../stores/useTheBasket";
const basketUsage = useTheBasket();
let created5msAgo = ref(false);
const emit = defineEmits(["close"]);
function empty() {
  basketUsage.emptyBasket();
  emit("close");
  console.log('close')
}
function closeFromOuter(e) {
  if (e.target === e.currentTarget) {
    emit("close");
  }
}
function keydown(e){
  if(e.keyCode === 13){
  empty()
  }}
onMounted(() => {
  setTimeout((created5msAgo.value = true), 10);
  document.addEventListener('keydown', keydown)
  });
onBeforeUnmount(()=>{
  document.removeEventListener('keydown', keydown)
})  
  
  
</script>
<template>
  <div class="questionPage fixed inset-0 h-full w-full grid items-center justify-center bg-indigo-500/50 z-10 " @click="closeFromOuter">
    <Transition name="innerTransition">
      <div class="inner bg-orange-100 w-[60vw] h-[50vh]" v-if="created5msAgo">
        <span @click="$emit('close')" class="close">&#10006;</span>
        <h1>Are you sure you want to empty the basket?</h1>
        <button @click="empty">confirm and empty</button>
        <button @click="$emit('close')">cancel</button>
      </div>
    </Transition>
  </div>
</template>
<style scoped>


.close {
  color: antiquewhite;
  font-weight: 900;
  font-size: 1.5em;
  position: absolute;
  bottom: 76%;
  left: 82%;
  cursor: pointer;
}
.close:hover {
  font-size: 2em;
}
.innerTransition-enter-from {
  transform: translateY(-100vh);
  opacity: 0.9;
}
.innerTransition-enter-active {
  transition: all 1s;
}
</style>
