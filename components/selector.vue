<script setup>
const props = defineProps(["candidates"]);
const selected = defineModel();
</script>
<template>
  <div class="flex gap-4">
    <div
      v-for="candidate in candidates"
      @click="
        () => {
          selected = candidate.id;
        }
      "
      :class="[
        'px-4 py-2 border rounded-lg cursor-pointer transition-colors',
        selected == candidate.id
          ? 'border-blue-500 text-blue-500'
          : 'hover:border-gray-400',
      ]"
    >
      {{ candidate.name }}
    </div>
  </div>
</template>
