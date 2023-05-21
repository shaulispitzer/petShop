<script setup>
const props=defineProps({totalPrice:String,amount:Number})
</script>
<template>
    <div class="h-10 w-16 bg-blue-500 text-white text-[10px] font-bold rounded-tr-lg">
        <span class="font-bold">ordered: {{ amount }}</span><br>
        <span>total:</span><br>
        <span class="leading-3">{{ totalPrice }}</span> 
        </div>
</template>