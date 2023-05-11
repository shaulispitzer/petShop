import {reactive,computed} from 'vue'
import { defineStore } from 'pinia'


export let useTheBasket = defineStore('basket', 
    () => {
       const newbasket = reactive([])
// main funtion to add to cart:
       function additem(theItem, amount = 1 ) {
        if (newbasket.some((e) => e.itemName === theItem.itemName)){
          const index = newbasket.findIndex((x) => x.itemName === theItem.itemName);
          const oldQuantity = newbasket[index].quantity;
          const newQuantity = +oldQuantity + +amount;
          newbasket[index].quantity = newQuantity
 }
else {
  const o3 = {...theItem, quantity: amount};
  // console.log(o3);
    newbasket.push(o3);
    // theItem.quantity = amount;
}}
// this function will run on page load:
        function addFromLS(a) {
          newbasket.push(...a)
        }
        function minusOne(){

        }
        function plusOne(e) {
    newbasket[parseInt(e.target.value)].quantity++;

        }
        function minusOne(e) {
          // console.log(e.target.value);
    if(newbasket[parseInt(e.target.value)].quantity === 1){
      newbasket.splice(e.target.value,1)}
      else{newbasket[parseInt(e.target.value)].quantity--}
    };

        

        function emptyBasket() {
            newbasket.splice(0, newbasket.length)
        }

        const amountOfItems = computed(()=>{
        let sum =0
        for(const item of newbasket) {
            sum += (parseFloat(item.quantity))
        }
        return sum
        })

        const totalPrice = computed(()=>{
          let a = newbasket.map(({price, quantity}) => price * quantity)
           return a.reduce(function(a,b) {return a + b;},0)
        })
     
       return { newbasket,  additem, emptyBasket, amountOfItems, totalPrice,addFromLS, plusOne, minusOne}
     }
)

