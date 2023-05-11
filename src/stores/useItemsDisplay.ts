import { defineStore } from "pinia";
import {reactive} from "vue";
import itemsForDisplay from '../assets/itemsForDisplay.json'


export let useItemsDisplay = defineStore('allItems', () =>{
    let allItems = reactive(itemsForDisplay);
    function addNew(newItem) {
        allItems.push(newItem)
    }
    function removeItem(e){
        allItems.splice(e.target.value,1)
    }
    let tagsOnly = reactive(allItems.map((a)=>a.tag))
    
    return {allItems,addNew, tagsOnly, removeItem}
})