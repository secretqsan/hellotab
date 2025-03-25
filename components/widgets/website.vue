<script setup>
const prop = defineProps({
  size_x: {
    default: 1,
  },
  size_y: {
    default: 1,
  },
  title: {
    default: "小组件",
  },
  fixed: {
    default: false,
  },
  e: {
    default: {},
  },
});

const handleClick = () => {
  window.open(prop.e.url, "_blank");
};

const imageStorage = useImageStore();
const { pictures } = storeToRefs(imageStorage);
</script>
<template>
  <WidgetsBase
    :size_x="size_x"
    :size_y="size_y"
    :title="title"
    :alt="true"
    @click="handleClick"
    class="cursor-pointer"
  >
    <template #alt>
      <div class="h-full w-full flex items-center justify-center">
        <img
          v-if="e.url"
          :src="e.customIcon ? pictures[e.icon] : e.icon"
          class="w-12 h-12"
          @error="$event.target.src = '/icons/globe.svg'"
          @contextmenu.prevent
        />
        <i v-else class="pi pi-globe text-gray-400 text-3xl"></i>
      </div>
    </template>
  </WidgetsBase>
</template>
