<script setup>
const messages = ref([]);
const showToast = (message) => {
  const id = Date.now();
  messages.value.push({ id, text: message });
  setTimeout(() => {
    messages.value = messages.value.filter(m => m.id !== id);
  }, 2000);
}; 
defineExpose({
  showToast,
});
</script>
<template>
  <Teleport to="body">
  <div
    @click.stop
    @contextmenu.stop
    class="fixed top-0 right-0 p-4 z-50 flex flex-col gap-3"
  >
    <TransitionGroup
      enter-from-class="opacity-0 translate-x-full"
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-300 ease-in"
      leave-to-class="opacity-0 translate-x-full"
    >
      <div
        v-for="message in messages"
        :key="message.id"
        class="flex flex-row items-center min-w-60 gap-2 bg-white border border-gray-200 rounded-lg p-2"
      >
        <i class="text-md pi pi-info-circle text-blue-400"></i>
        <span class="text-md">{{ message.text }}</span>
      </div>
    </TransitionGroup>
  </div>
  </Teleport>
</template>