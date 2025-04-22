<script setup>
const props = defineProps(["placeholder"]);
const v = defineModel();
</script>
<template>
  <input
    v-model="v"
    class="flex-1 px-4 py-2 border rounded-lg transition-colors focus:border-blue-500 focus:outline-none"
    :placeholder="placeholder"
  />
</template>
