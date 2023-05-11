<script setup>
const emit = defineEmits(["back"]);
</script>
<template>
  <div class="buttonDiv w-full flex justify-center">
    <button @click="$emit('back')">back</button>
  </div>
  <iframe
    src="/contactUs.html"
    width="50%"
    height="1200px"
    sandbox="allow-forms allow-popups allow-pointer-lock allow-scripts"
  ></iframe>
  <p class="text w-48 float-right">
    Thanks for visiting Pet Shop! We'd love to hear from you. Please reach out to us if
    you have any questions, comments, or concerns about our pet shop and the services we
    offer. We look forward to hearing from you soon.
  </p>
</template>
