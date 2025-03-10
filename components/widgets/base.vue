<script setup>
const props = defineProps({
  size_x: {
    default: 1,
  },
  size_y: {
    default: 1,
  },
  title: {
    default: "小组件",
  },
  alt: {
    default: false,
  },
});
const windowRef = ref(null);
const settingStore = useSettingsStore();
const { appearance } = storeToRefs(settingStore);
const openOuterWindow = () => {
  windowRef.value.show();
};
defineExpose({
  openOuterWindow,
});
</script>
<template>
  <div
    :class="[
      'relative',
      size_x == 1 ? 'col-span-1' : 'col-span-2',
      size_y == 1 ? 'row-span-1' : 'row-span-2',
    ]"
    :title="title"
  >
    <div
      :class="[
        'bg-white rounded-xl',
        'hover:shadow-lg hover:shadow-gray-300/50 transition-shadow duration-200',
        size_x == 1 ? 'w-20' : 'w-56',
        size_y == 1 ? 'h-20' : 'h-56',
      ]"

    >
      <template v-if="!alt">
        <slot v-if="size_x == 1 && size_y == 1" name="small" />
        <slot v-else-if="size_x == 2 && size_y == 1" name="middle" />
        <slot v-else-if="size_x === 2 && size_y === 2" name="large" />
      </template>
      <template v-else>
        <slot name="alt" />
      </template>
    </div>

    <div
      v-if="!appearance.hideTitle"
      class="absolute -bottom-8 left-0 w-full text-center text-white truncate"
    >
      {{ title }}
    </div>
    <Window ref="windowRef" @click.stop @contextmenu.stop>
      <slot name="window"/>
    </Window>
  </div>
</template>
