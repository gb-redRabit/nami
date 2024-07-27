<template>
  <button class="flex flex-col items-center p-1 rounded-full hover:text-gray-600">
    <component :is="iconComponent" class="text-2xl" />
  </button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  iconComponent: Object
});
</script>
