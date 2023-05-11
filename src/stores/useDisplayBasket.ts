import { ref, computed } from 'vue'
import {defineStore} from 'pinia';

export let useDisplayBasket = defineStore('showBasket', () =>
{
    const isDisplayed = ref(true)
    
    function toggleBasket() {
        isDisplayed.value = !isDisplayed.value
    }
    const isShown = computed(() =>{
       if (isDisplayed.value){
           return "hide"
        }
    else {return "show"}
    })
    return { isDisplayed, toggleBasket, isShown}
})