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
const sharedComponents = useSharedComponentsStore();
const { settingPanel } = storeToRefs(sharedComponents);
</script>
<template>
  <WidgetsBase :size_x="1" :size_y="1" :title="'新增小组件'" :alt="true">
    <template #alt>
      <div 
        class="h-full w-full flex items-center justify-center"
        @click="
          () => {
            settingPanel.show('widgets');
          }
        "
      >
        <i class="pi pi-plus text-gray-600 text-3xl"></i>
      </div>
    </template>
  </WidgetsBase>
</template>
