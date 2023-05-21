<script setup>
const props=defineProps({totalPrice:String,amount:Number})
</script>
<template>
    <div class="h-10 w-16 bg-blue-500 text-white text-[10px] font-bold rounded-tr-lg outer">
        <span class="font-bold">Ordered: {{ amount }}</span><br>
        <span>Total:</span><br>
        <span class="leading-3">{{ totalPrice }}</span> 
        </div>
</template>
<style>
.outer{box-shadow: rgba(0, 0, 0, 0.275) 5px -4px 15px 2px;}</style>