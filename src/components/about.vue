<script setup>
import {onMounted} from 'vue';
onMounted(()=>{document.title = 'pet shop | about'})
const emit = defineEmits(["closeAbout"]);
</script>
<template>
  <div class="buttonDiv flex justify-center">
    <button @click="$emit('closeAbout')">close</button>
  </div>
  <p>
    I'm so excited to announce the launch of my new online pet shop business located in
    Greater London, England, United Kingdom called Pet Shop. We are committed to providing
    high quality products at the best prices possible. Our shop offers a wide range of pet
    supplies from food, toys, and treats to pet beds, apparel, and grooming accessories.
    We also have a selection of unique pet items and gifts for the pet lovers in your
    life.Our customer service team is always available to answer any questions you may
    have and to provide assistance with any orders. We strive to make sure your shopping
    experience is as hassle-free and enjoyable as possible. We offer free shipping on
    orders over £50 and we have a 30-day return policy for any item you are not completely
    satisfied with. Stop by our shop today and find the perfect items for your furry
    friends.
  </p>
</template>
