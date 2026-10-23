<script setup>
const props = defineProps(["candidates"]);
const selected = defineModel();
</script>
<template>
  <div class="flex flex-row gap-4 p-1">
    <div
      v-for="candidate in candidates"
      @click="
        () => {
          selected = candidate.id;
        }
      "
      :class="[
        'px-4 py-2 border rounded-lg cursor-pointer transition-colors shrink-0',
        'dark:text-gray-200 dark:border-slate-600',
        selected == candidate.id
          ? 'border-blue-500 text-blue-500 dark:text-blue-400 dark:border-blue-400'
          : 'hover:border-gray-400',
      ]"
    >
      {{ candidate.name }}
    </div>
  </div>
</template>
