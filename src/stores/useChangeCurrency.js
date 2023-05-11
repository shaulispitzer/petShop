import {reactive,computed, ref} from 'vue'
import { defineStore } from 'pinia'


export let useChangeCurrency = defineStore('currency', 
    () => {
        const symbol = ref("￡")
        const currentRate = ref(1)
        const currencyCode = ref('GBP')
        async function changeCurrency(currency) {
        const result = await fetch(
          `https://v6.exchangerate-api.com/v6/94a8562c3240a178ab8d9917/latest/${currency}`
        );
        const rates = await result.json();
        symbol.value = formatCurrency(currency);
        currentRate.value = rates.conversion_rates.USD;
        currencyCode.value = currency;
        localStorage.setItem('currency code', currency)
      }
      function formatCurrency(currency) {
        return Intl.NumberFormat("en-UK", {
          style: "currency",
          currency,
        })
          .format()
          .replace("NaN", "");
      }
    return{changeCurrency, symbol, currentRate, currencyCode}})