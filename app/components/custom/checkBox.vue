<script setup>
defineEmits(["checked"]);
const checked = defineModel({
  default: false,
});
</script>
<template>
  <div
    class="group flex flex-row items-center"
    @click="
      () => {
        $emit('checked');
        checked = !checked;
      }
    "
  >
    <div
      :class="[
        'flex flex-row items-center justify-center inline-block cursor-pointer w-5 h-5 border-2 rounded-md transition-all duration-200 ease-in-out',
        checked ? 'border-blue-500 scale-105' : 'border-gray-300',
        checked ? 'bg-blue-500' : 'bg-white',
        checked
          ? 'group-hover:bg-blue-600 group-hover:border-blue-600'
          : 'group-hover:border-gray-400 group-hover:bg-gray-50',
        'active:scale-95',
      ]"
    >
      <i
        v-if="checked"
        class="pi pi-check text-white text-xs transform transition-transform duration-200 scale-110"
      ></i>
    </div>
    <slot></slot>
  </div>
</template>
