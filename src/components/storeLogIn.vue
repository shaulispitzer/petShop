<script setup>
import { ref, reactive } from "vue";
const emit = defineEmits(["pushNewItem", "close"]);
import {useItemsDisplay} from '../stores/useItemsDisplay';
const itemsDisplay = useItemsDisplay();
const props = defineProps({ itemDisplay: Array });
let newItemName = ref("");
let newItemPrice = ref("");
let newItemMoreInfo = ref("");
let newItemTag = ref("");
let newItemImageSrc = ref("");
let tabIndex = ref("insertItem");
function pushNewItem() {
  itemsDisplay.addNew( {
    itemName: newItemName.value,
    price: newItemPrice.value,
    id: Date.now(),
    imageSrc: newItemImageSrc.value,
    moreInfo: newItemMoreInfo.value,
    tag: newItemTag.value,
  });
  console.log(newItemName.value);
}
function close(e) {
  if (e.target === e.currentTarget || e.target.matches(".closeButton")) {
    emit("close");
  }
}
</script>

<template>
  <div class="outerDiv grid fixed z-10 h-screen w-screen items-center justify-center inset-0 bg-amber-300/40 [b]" @click="close">
    <div class="innerDiv relative h-[80vh] w-[50vw]">
      <div class="tabContainer">
        <div class="tabButtons">
          <button
            class="eachTabButton"
            @click="tabIndex = 'insertItem'"
            :class="{ selected: tabIndex !== 'insertItem' }"
          >
            insert an item</button
          ><button
            class="eachTabButton"
            @click="tabIndex = 'removeItem'"
            :class="{ selected: tabIndex !== 'removeItem' }"
          >
            remove an item
          </button>
        </div>
        <div class="insertItem" v-if="tabIndex === 'insertItem'">
          <h2>insert another item</h2>
          <div class="container">
            <span>item name:*</span> <input v-model="newItemName" required />
            <span>item price in $:*</span>
            <input
              v-model.number="newItemPrice"
              type="number"
              placeholder="Enter Numbers Only"
              inputmode="numeric"
              oninput="this.value = this.value.replace(/\D+/g, '')"
            />
            <span>more info:</span> <input v-model="newItemMoreInfo" />
            <span>image source:</span> <input v-model="newItemImageSrc" />
            <span>item tag:* (best to choose one below:)</span>
            <input v-model="newItemTag" />
            <div class="tagButtons">
              <span>recommended tags:</span>
              <button @click="newItemTag = 'scary'">scary</button>
              <button @click="newItemTag = 'home pet'">home pet</button>
              <button @click="newItemTag = 'bird'">bird</button>
            </div>
          </div>
          <div class="addNewItemDiv">
            <button
              class="button"
              @click="pushNewItem"
              :disabled="newItemName === '' || newItemTag === '' || newItemPrice === ''"
            >
              add new item
            </button>
          </div>
        </div>
        <div class="deleteItem" v-if="tabIndex === 'removeItem'">
          <h2>remove an item</h2>
          <TransitionGroup class="p-0" name="fade" tag="ul" >
            <li class="list-none flex justify-start w-48 pl-1" v-for="(item, index) in itemsDisplay.allItems" :key="item.id" :class="index % 2 === 1 ? 'bg-slate-300' : ''"><span class="w-20 pl-2" >{{ item.itemName }}</span>
            <button @click="itemsDisplay.removeItem(item)">x</button></li>
          </TransitionGroup>
        </div>
      </div>
      <div class="bottomDiv">
        <button class="button closeButton" @click="close">close</button>
      </div>
    </div>
  </div>
  <div><iframe src="../././../contactUs.html" frameborder="0"></iframe></div>
</template>
<style scoped>
.fade-leave-active, .fade-move {
  transition: all 0.9s ease-out;
  
}
.fade-enter-from, .fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.fade-leave-active {
  position: absolute;
}

.outerDiv{
  backdrop-filter: blur(4px);
}


.innerDiv {
  
  background-color: #ebecf0;
  padding: 2vh;
 
}
@media screen and (max-width: 830px) {
  .innerDiv {
    height: 100%;
    width: 80vw;
  }
}

.twoButtons {
  position: absolute;
  bottom: 0.3vh;
  width: 100%;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  column-gap: 5%;
}
.container {
  display: grid;
  grid-template-columns: 1fr;
  padding-left: 10%;
  padding-right: 10%;
  align-content: space-between;
  grid-gap: 3%;
}
@media screen and (max-width: 1065px) {
  .container {
    grid-template-columns: 1fr;
  }
}
.tagButtons {
  grid-column: 1 / 3;
  display: flex;
  justify-content: center;
  column-gap: 2%;
}
.tagButtons button {
  background-color: #fff;
  cursor: pointer;
}
.container input {
  border-radius: 160px;
  font-size: 1rem;
  padding: 0.2rem;
  height: 20px;
}
.container input:focus {
  border: 2px solid yellow;
}
.container span {
  font-size: 2.5vh;
}
.button {
  color: #61677c;
  font-weight: bold;
  box-shadow: -5px -5px 20px #fff, 5px 5px 20px #babecc;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  font-weight: 600;
  border: 0;
  outline: 0;
  font-size: 1rem;
  border-radius: 160px;
  padding: 10px;
  background-color: #ebecf0;
  text-shadow: 1px 1px 0 #fff;
}
.button:disabled {
  color: #61677c7c;
  cursor: not-allowed;
}
.button:hover {
  box-shadow: -2px -2px 5px #fff, 2px 2px 5px #babecc;
}

.button:active {
  box-shadow: inset 1px 1px 2px #babecc, inset -1px -1px 2px #fff;
}

.bottomDiv {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  height: 5vh;
  display: flex;
  justify-content: center;
}
.closeButton {
  position: absolute;
  bottom: 2vh;
}
@media screen and (max-width: 830px) {
  .closeButton {
    position: absolute;
    bottom: 5vh;
  }
}
.tabContainer {
  position: absolute;
  top: 10%;
  left: 0;
  right: 0;
  /* margin: 0 2% 2% 0; */
  margin-left: 2%;
  margin-right: 2%;
  height: 78%;
  width: 95%;
  box-sizing: border-box;
  padding: 2%;
  border: 1px solid black;
  z-index: 3;
}
.addNewItemDiv {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 5vw;
  width: 100%;
}
.tabButtons {
  position: absolute;
  bottom: 100%;
  left: -1px;
  right: 0;
  height: 8%;
  /* z-index: 2; */
  width: 100%;
  /* padding-left: 2%; */
  /* padding-left: 2%; */
  /* margin-top: 1px; */
}
.eachTabButton {
  
  height: 100%;
  width: 26%;
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 0;
  background-color: #ebecf0;
  font-size: 2.5vw;
  /* white-space: nowrap; */
  /* z-index: 2; */
}
@media screen and (max-width: 483px) {
  .eachTabButton {
    font-size: 12px;
  }
}
@media screen and (min-width: 830px) {
  .eachTabButton {
    font-size: 14px;
  }
}
.tabButtons .eachTabButton:not(:first-child) {
  margin-left: 1vw;
}
.selected {
  
  background-color: #c6c7c9;
  /* border-bottom: 1px solid black; */
  
  transform: translateY(1.5px);
  /* transition: all 0.3s; */
  height: 90%;
}
</style>
