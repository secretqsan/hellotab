<script setup>
const open = ref(false);
const show = () => {
  open.value = true;
};
defineExpose({
  show,
});
</script>
<template>
  <div
    v-if="open"
    @click.stop
    @contextmenu.stop
    class="w-screen h-screen fixed top-0 left-0 bg-gray-800/40 z-30 flex items-center justify-center"
  >
    <div 
      :class="
        [
          'bg-gray-50 overflow-scroll relative',
          ($device.isDesktop || $device.isTablet)? 'w-3/4 h-3/4 rounded-lg': 'w-full h-full'
        ]
    ">
      <slot></slot>
      <button
        :class="[
          'absolute top-2 right-2 h-10 w-10 rounded-full flex items-center justify-center text-red-500',
          $device.isDesktop? 'hover:bg-red-50 transition-colors duration-200': ''
        ]"
        @click="open = false"
      >
        <i class="pi pi-times text-lg"></i>
      </button>
    </div>
  </div>
</template>
