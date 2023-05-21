<script setup>
const emit = defineEmits(["back"]);
</script>
<template>
  <div class="buttonDiv w-full flex justify-center">
    <button @click="$emit('back')">back</button>
  </div>
  <p class="text md:w-48 w-full md:float-right float-none">
    Thanks for visiting Pet Shop! We'd love to hear from you. Please reach out to us if
    you have any questions, comments, or concerns about our pet shop and the services we
    offer. We look forward to hearing from you soon.
  </p>
  <iframe
    src="/contactUs.html"
    class="md:w-1/2 w-full"
    height="1200px"
    sandbox="allow-forms allow-popups allow-pointer-lock allow-scripts"
  ></iframe>
</template>
