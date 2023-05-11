import {computed } from 'vue';
export const isThereAnImage = computed(() => {
    if (props.items.imageSrc) {
      return "/src/images" + props.items.imageSrc;
    } else {
      return "/src/images/noImageAvailable.png";
    }
  });