<script setup>
const props = defineProps({
  size_x: {
    default: 2,
  },
  size_y: {
    default: 1,
  },
  title: {
    default: "时钟",
  },
  e: {
    default: {},
  },
});

const now = ref(new Date());

const getTimeString = (date, includeSeconds = true) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return includeSeconds
    ? `${hours}:${minutes}:${date.getSeconds().toString().padStart(2, "0")}`
    : `${hours}:${minutes}`;
};

const getClockHandsPosition = (date) => {
  const hours = date.getHours() % 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const hourAngle = (hours + minutes / 60 + seconds / 3600) * 30;
  const minuteAngle = (minutes + seconds / 60) * 6;
  const secondAngle = seconds * 6;

  return {
    hour: `rotate(${hourAngle} 50 50)`,
    minute: `rotate(${minuteAngle} 50 50)`,
    second: `rotate(${secondAngle} 50 50)`,
  };
};

const clockHands = computed(() => getClockHandsPosition(now.value));

onMounted(() => {
  setInterval(() => {
    now.value = new Date();
  }, 1000);
});
</script>

<template>
  <WidgetsBase :size_x="size_x" :size_y="size_y" :title="'时钟'">
    <template #large>
      <div
        class="h-full w-full flex flex-col items-center justify-center gap-3"
      >
        <svg class="w-32 h-32" viewBox="0 0 100 100">
          <!-- 表盘外圈 -->
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#E5E7EB"
            stroke-width="2"
          />

          <!-- 时刻度 -->
          <g>
            <line
              v-for="i in 12"
              x1="50"
              y1="10"
              x2="50"
              y2="15"
              stroke="#374151"
              stroke-width="2"
              :transform="`rotate(${(i - 1) * 30} 50 50)`"
            />
          </g>

          <!-- 时针 -->
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="30"
            stroke="#111827"
            stroke-width="3"
            stroke-linecap="round"
            :transform="clockHands.hour"
          />

          <!-- 分针 -->
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="25"
            stroke="#374151"
            stroke-width="2"
            stroke-linecap="round"
            :transform="clockHands.minute"
          />

          <!-- 秒针 -->
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="20"
            stroke="#EF4444"
            stroke-width="1"
            stroke-linecap="round"
            :transform="clockHands.second"
          />

          <!-- 中心点 -->
          <circle cx="50" cy="50" r="2" fill="#111827" />
        </svg>
        <div class="text-2xl font-medium">{{ getTimeString(now) }}</div>
      </div>
    </template>

    <template #middle>
      <div
        class="h-full w-full flex flex-col items-center justify-center gap-2"
      >
        <div class="text-2xl font-medium">{{ getTimeString(now) }}</div>
      </div>
    </template>

    <template #small>
      <div class="h-full w-full flex items-center justify-center">
        <div class="text-lg font-medium">{{ getTimeString(now, false) }}</div>
      </div>
    </template>
  </WidgetsBase>
</template>
