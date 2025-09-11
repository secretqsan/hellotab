<script setup>
const emit = defineEmits(['checked']);
const target = defineModel({
  default: false,
});
</script>

<template>
  <div
    :class="[
      'relative inline-block w-12 h-6 rounded-full transition duration-200 ease-in-out cursor-pointer',
      target ? 'bg-blue-500' : 'bg-gray-200',
    ]"
    @click="() => {
      target = !target;
      emit('checked');
    }"
  >
    <div
      :class="[
        'absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out',
        target ? 'translate-x-6' : '',
      ]"
    />
  </div>
</template>
