<script setup>
const props = defineProps({
  size_x: {
    default: 2,
  },
  size_y: {
    default: 1,
  },
  title: {
    default: "天气",
  },
  e: {
    default: {},
  },
});
const location = ref({
  longitude: null,
  latitude: null,
  name: null,
});
const positionFetchError = ref(false);

const weather = ref({
  temp: null,
  icon: "",
  text: "",
  time: null,
});

async function getLocation() {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    location.value.latitude = position.coords.latitude;
    location.value.longitude = position.coords.longitude;

    const res = await $fetch(
      `/api/weather?type=location&longitude=${location.value.longitude}&latitude=${location.value.latitude}`
    );
    if (res.code === "200" && res.location && res.location[0]) {
      location.value.name = res.location[0].adm2 + res.location[0].name;
      await getWeather();
    }
  } catch (err) {
    console.error("获取位置信息失败:", err);
    positionFetchError.value = true;
  }
}

async function getWeather() {
  try {
    const res = await $fetch(
      `/api/weather?type=weather&longitude=${location.value.longitude}&latitude=${location.value.latitude}`
    );
    if (res.code === "200") {
      weather.value = {
        temp: res.now.temp,
        icon: res.now.icon,
        text: res.now.text,
      };
    }
  } catch (err) {
    console.error("获取天气信息失败:", err);
  }
}

let timer = null;

onMounted(() => {
  getLocation();
  timer = setInterval(() => {
    getWeather();
  }, 30 * 60 * 1000);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<template>
  <WidgetsBase
    :alt="!weather.temp"
    :size_x="size_x"
    :size_y="size_y"
    :title="'天气'"
  >
    <template #large>
      <div
        class="h-full w-full flex flex-col items-center justify-center gap-3"
      >
        <div class="flex items-center gap-4 mb-2">
          <div class="text-xl">{{ location.name }}</div>
          <Placeholder />
          <div class="text-xs text-gray-400">
            {{ new Date().toLocaleDateString() }}
          </div>
        </div>
        <div class="flex items-center gap-4 mb-2">
          <i :class="`qi-${weather.icon} text-5xl`" />
          <div class="flex flex-col">
            <span class="text-4xl font-medium">{{ weather.temp }}°C</span>
            <span class="text-lg text-gray-500">{{ weather.text }}</span>
          </div>
        </div>
        <a
          :href="`https://www.qweather.com/`"
          target="_blank"
          class="text-xs text-gray-400 hover:text-blue-500 mt-2"
        >
          查看更多天气信息 →
        </a>
      </div>
    </template>

    <template #middle>
      <div
        class="h-full w-full flex flex-row items-center justify-center gap-8"
      >
        <i :class="`qi-${weather.icon} text-3xl`" />
        <div class="flex flex-col items-center justify-center">
          <span class="text-xl font-medium">{{ weather.temp }}°C</span>
          <span class="text-sm text-gray-500">{{ weather.text }}</span>
        </div>
      </div>
    </template>

    <template #small>
      <div class="h-full w-full flex flex-col items-center justify-center">
        <span class="text-xl font-medium">{{ weather.temp }}°C</span>
        <span class="text-sm text-gray-500">{{ weather.text }}</span>
      </div>
    </template>

    <template #alt>
      <div
        v-if="positionFetchError"
        class="h-full w-full flex flex-col items-center justify-center gap-2"
      >
        <i class="pi pi-exclamation-circle text-red-500 text-3xl"></i>
        <p class="text-lg font-medium text-gray-800">地理位置获取失败</p>
        <p class="text-sm text-gray-600 text-center">
          请检查是否已开启位置服务
        </p>
        <a
          href="https://blog.csdn.net/sinat_39030079/article/details/144381035"
          target="_blank"
          class="text-sm text-blue-500 hover:text-blue-600 hover:underline mt-1"
        >
          Chrome浏览器用户请查看
        </a>
      </div>
      <div v-else class="h-full w-full flex items-center justify-center">
        <i class="pi pi-spin pi-spinner text-2xl"></i>
      </div>
    </template>
  </WidgetsBase>
</template>
