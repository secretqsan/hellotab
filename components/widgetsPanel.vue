<script setup>
import draggable from "vuedraggable";
import WebpageWidget from "@/components/widgets/website.vue";
import newWidget from "@/components/widgets/new.vue";
import WeatherWidget from "@/components/widgets/weather.vue";
import CalendarWidget from "@/components/widgets/calendar.vue";
import ClockWidget from "@/components/widgets/clock.vue";
import TodolistWidget from "@/components/widgets/todolist.vue";
const widgetsConvertTable = {
  web: WebpageWidget,
  new: newWidget,
  weather: WeatherWidget,
  calendar: CalendarWidget,
  clock: ClockWidget,
  todolist: TodolistWidget,
};
const items = ref([
  {
    label: "缩小",
    icon: "pi pi-minus",
    command: () => {
      switch (
        widgets.value[selectedId.value].size_x * 10 +
        widgets.value[selectedId.value].size_y
      ) {
        case 21:
          widgets.value[selectedId.value].size_x = 1;
          break;

        case 22:
          widgets.value[selectedId.value].size_y = 1;
          break;

        default:
          break;
      }
    },
  },
  {
    label: "扩大",
    icon: "pi pi-plus",
    command: () => {
      switch (
        widgets.value[selectedId.value].size_x * 10 +
        widgets.value[selectedId.value].size_y
      ) {
        case 21:
          widgets.value[selectedId.value].size_y = 2;
          break;

        case 11:
          widgets.value[selectedId.value].size_x = 2;
          break;

        default:
          break;
      }
    },
  },
  { separator: true },
  {
    label: "删除",
    icon: "pi pi-trash",
    command: () => {
      widgets.value.splice(selectedId.value, 1);
    },
  },
]);
const selectedId = ref(-1);
const menuRef = ref(null);
const settingStore = useSettingsStore();
const { widgets } = storeToRefs(settingStore);
</script>
<template>
  <div class="overflow-auto" @scroll="menuRef.hideMenu()">
    <ClientOnly>
      <draggable
        :delay="$device.isDesktop? 0 : 500"
        v-model="widgets"
        item-key="id"
        :class="[
          'w-full grid gap-16 grid-cols-[repeat(auto-fill,_80px)] justify-center',
          ($device.isDesktop || $device.isTablet) ? 'px-[calc(100%/8)]' : 'px-2',
        ]"
        :style="{ 'grid-auto-flow': 'dense' }"
        @start="console.log(1);menuRef.hideMenu()"
      >
        <template #item="{ element }">
          <component
            :is="widgetsConvertTable[element.type]"
            :size_x="element.size_x"
            :size_y="element.size_y"
            :title="element.title"
            :e="element.e"
            @contextmenu.prevent.stop="
              (event) => {
                if (element.type != 'new') {
                  selectedId = widgets.indexOf(element);
                  menuRef.show(event);
                }
              }
            "
          />
        </template>
      </draggable>
    </ClientOnly>
    <WidgetsMenu ref="menuRef" :model="items" />
  </div>
</template>
