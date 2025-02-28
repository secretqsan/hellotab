<script setup>
const x = ref(0);
const y = ref(0);
const hide = ref(true);
const props = defineProps(["model"]);
const menuRef = ref(null);

const show = (event) => {
  hide.value = false;
  x.value = event.clientX;
  y.value = event.clientY;
  nextTick(() => {
    const rect = menuRef.value.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (x.value + rect.width > viewportWidth) {
      x.value = viewportWidth - rect.width;
    }

    if (y.value + rect.height > viewportHeight) {
      y.value = viewportHeight - rect.height;
    }
  });
};

onMounted(() => {
  document.addEventListener("click", hideMenu);
  document.addEventListener("contextmenu", hideMenu);
  window.addEventListener("resize", hideMenu);
});

onUnmounted(() => {
  document.removeEventListener("click", hideMenu);
  document.removeEventListener("contextmenu", hideMenu);
  window.removeEventListener("resize", hideMenu);
});

const hideMenu = () => {
  hide.value = true;
};

defineExpose({
  show,
});

watch(hide, (newValue) => {
  if (!newValue) {
  }
});
</script>

<template>
  <Teleport to="body">
    <div
      ref="menuRef"
      class="absolute z-100 w-40 bg-white rounded-lg shadow-lg border border-gray-300 flex flex-col overflow-hidden p-1"
      v-show="!hide"
      :style="{
        left: `${x}px`,
        top: `${y}px`,
      }"
      @click.stop
      @contextmenu.prevent.stop
    >
      <template v-for="item in model">
        <template v-if="!item.separator">
          <div
            class="px-2 py-1 cursor-pointer hover:bg-gray-100 transition-colors flex items-center gap-3 rounded-md"
            @click="
              () => {
                hide = true;
                item.command?.();
              }
            "
          >
            <i v-if="item.icon" :class="[item.icon, 'text-gray-600']"></i>
            <span class="text-gray-700">{{ item.label }}</span>
          </div>
        </template>
        <div v-else class="h-[1px] bg-gray-200 m-0.5" />
      </template>
    </div>
  </Teleport>
</template>
