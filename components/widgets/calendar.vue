<script setup>
const props = defineProps({
  'size_x': {
    default: 2
  },
  'size_y': {
    default: 1
  },
  'title': {
    default: '日历'
  },
  'e': {
    default: {}
  }
})

const now = ref(new Date())
const currentMonth = ref(new Date())

function getDaysInMonth(date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  return new Date(year, month, 1).getDay()
}

function getCurrentWeekDays() {
  const days = []
  const current = new Date(now.value)
  const first = current.getDate() - current.getDay()
  
  for(let i = 0; i < 7; i++) {
    const day = new Date(current.setDate(first + i))
    days.push(day)
  }
  return days
}

const calendar = computed(() => {
  const days = []
  const daysInMonth = getDaysInMonth(currentMonth.value)
  const firstDay = getFirstDayOfMonth(currentMonth.value)

  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  return days
})

const weekDays = computed(() => getCurrentWeekDays())

onMounted(() => {
  setInterval(() => {
    now.value = new Date()
  }, 1000)
})
</script>

<template>
  <WidgetsBase :size_x="size_x" :size_y="size_y" :title="'日历'">
    <template #large>
      <div class="h-full w-full p-4 flex flex-col items-center justify-center">
        <div class="text-center mb-1 text-gray-600">
          {{ currentMonth.getFullYear() }}年{{ currentMonth.getMonth() + 1 }}月
        </div>
        <div class="grid grid-cols-7 gap-0.5">
          <div v-for="day in ['日', '一', '二', '三', '四', '五', '六']" class="text-center text-xs text-gray-500">
            {{ day }}
          </div>
          <div v-for="day in calendar" :key="day" class="text-center">
            <div 
              :class="[
                'rounded-full w-6 h-6 flex items-center justify-center text-xs',
                day === now.getDate() && currentMonth.getMonth() === now.getMonth() ? 
                  'bg-blue-500 text-white' : 'text-gray-700'
              ]">
              {{ day }}
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #middle>
        <div class="h-full w-full flex flex-col items-center justify-center">
            <div class="text-xl font-medium">{{ currentMonth.getFullYear() }}年{{ now.getMonth() + 1 }}月{{ now.getDate() }}日</div>
            <div class="text-xs text-gray-500">星期{{ ['日', '一', '二', '三', '四', '五', '六'][now.getDay()] }}</div>
        </div>
    </template>
  
    <template #small>
      <div class="h-full w-full flex flex-col items-center justify-center">
        <div class="text-xl font-medium">{{ now.getMonth() + 1 }}/{{ now.getDate() }}</div>
        <div class="text-xs text-gray-500">{{ ['日', '一', '二', '三', '四', '五', '六'][now.getDay()] }}</div>
      </div>
    </template>

  </WidgetsBase>
</template>