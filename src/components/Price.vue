<template>
  {{
    changingCurrency.symbol + (price / +changingCurrency.currentRate).toFixed(2)
  }}
</template>
<script setup>
import { useChangeCurrency } from "../stores/useChangeCurrency";
const changingCurrency = useChangeCurrency();

const props = defineProps({
  price: Number,
});
</script>
