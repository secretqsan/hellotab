<script setup>
const props = defineProps({
  size_x: {
    default: 2,
  },
  size_y: {
    default: 1,
  },
  title: {
    default: "代办事项",
  },
  e: {
    default: {
      items: [
      ]
    },
  },
});

const widgetBaseRef = ref(null);
const newTodo = ref('');
const addingNewTodo = ref(false);

const addTodo = () => {
  if (newTodo.value.trim()) {
    props.e.items.push({
      id: Date.now(),
      title: newTodo.value,
      completed: false,
      date: new Date().toISOString().split('T')[0]
    });
    newTodo.value = '';
  }
};

const toggleTodo = () => {
  props.e.items.sort((a, b) => {
    if (!a.completed && b.completed) return -1;
    if (a.completed && !b.completed) return 1;
    return 0;
  });
};

const deleteTodo = (id) => {
  const index = props.e.items.findIndex(item => item.id === id);
  if (index > -1) {
    props.e.items.splice(index, 1);
  }
};

const incompleteTodos = computed(() => {
  return props.e.items.filter(todo =>!todo.completed);
});

const currentIndex = ref(0);

const nextTodo = () => {
  if (currentIndex.value < props.e.items.length - 1) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0;
  }
};

const prevTodo = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = props.e.items.length - 1;
  }
};

const openWindow = () => {
  widgetBaseRef.value.openOuterWindow();
};
</script>

<template>
  <WidgetsBase
    ref="widgetBaseRef" 
    :size_x="size_x" 
    :size_y="size_y" 
    :title="'待办列表'">
    <template #large>
      <div class="p-4 h-full w-full gap-2 flex flex-col">
        <div class="flex flex-row w-full items-center justify-between mb-2">
          <h1 @click="openWindow" class="text-xl font-bold text-gray-800 cursor-pointer flex items-center gap-2">待办事项<i class="pi pi-external-link text-gray-600 hover:text-gray-800 transition-colors text-sm"></i></h1>
          <Placeholder />
          <button 
            class="p-1 rounded-md text-gray-500 border-2 hover:text-gray-600 transition-colors focus:outline-none hover:ring-2 hover:ring-gray-400/20 flex items-center justify-center"
            @click="addingNewTodo = !addingNewTodo">
            <i class="pi pi-plus text-sm"></i>
          </button>
        </div>
        <div class="flex flex-col w-full gap-1" v-if="addingNewTodo">
          <input v-model="newTodo" @keyup.enter="addTodo" placeholder="添加新的待办事项..." class="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"/>
          <div class="w-full flex flex-row items-center gap-1">
            <div class="flex-1"/>
            <button @click="addTodo" class="h-8 w-8 rounded-md text-white bg-green-400 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 flex items-center justify-center">
              <i class="pi pi-check text-sm"></i>
            </button>
            <button @click="addingNewTodo=false" class="h-8 w-8 rounded-md text-white bg-red-400 hover:bg-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 flex items-center justify-center">
              <i class="pi pi-times text-sm"></i>
            </button>
          </div>
        </div>
        <div class="flex-1 overflow-y-auto flex flex-col gap-1">
          <template v-for="(todo, index) in props.e.items">
            <CheckBox 
              v-model="todo.completed" 
              @click="toggleTodo(todo)"
              class="rounded-md px-2 py-1.5 hover:bg-gray-100 transition-colors duration-200">
              <span :class="{ 'line-through text-gray-600': todo.completed }" class="ml-2 text-md truncate cursor-pointer">
                {{ todo.title }}
              </span>
            </CheckBox>
            <div v-if="index < props.e.items.length - 1" class="h-[1px] bg-gray-300"/>
          </template>
        </div>
      </div>
    </template>

    <template #middle>
      <div class="flex flex-col items-center justify-center w-full h-full" @click="openWindow">
        <p v-if="incompleteTodos.length > 0" @click="openWindow" class="text-md text-gray-800 font-bold">待办事项: {{ currentIndex + 1 }}/{{ e.items.length }}</p>
        <div v-if="incompleteTodos.length > 0" @click.stop class="w-full">
          <div class="flex items-center p-2">
            <CheckBox
              v-model="e.items[currentIndex].completed"
              @click="toggleTodo(e.items[currentIndex])"
              class="min-w-[20px]">
              <span :class="{ 'line-through text-gray-500': e.items[currentIndex]?.completed }" class="ml-2 text-sm truncate flex-1">
                {{ e.items[currentIndex]?.title }}
              </span>
            </CheckBox>
            <Placeholder />
            <div class="flex flex-row gap-0.5">
              <button @click="prevTodo" class="w-6 h-6 rounded-l-md flex items-center justify-center text-gray-500 hover:bg-gray-200 bg-gray-100 hover:text-gray-700 transition-colors">
                <i class="pi pi-chevron-left text-xs"></i>
              </button>
              <button @click="nextTodo" class="w-6 h-6 rounded-r-md flex items-center justify-center text-gray-500 hover:bg-gray-200 bg-gray-100 hover:text-gray-700 transition-colors">
                <i class="pi pi-chevron-right text-xs"></i>
              </button>
            </div>
          </div>
          
        </div>
        <div v-else class="text-sm text-gray-500">暂无待办事项</div>
      </div>
    </template>

    <template #small>
      <div 
        class="w-full h-full flex flex-col justify-center items-center"    
        @click="openWindow">
        <p class="text-xl font-bold text-gray-800">{{ incompleteTodos.length }}</p>
        <p class="text-md">项待办</p>
      </div>
    </template>

    <template #window>
      <div class="mx-auto p-4 space-y-4">
        <h2 class="text-xl font-bold text-gray-800 text-center">待办事项管理</h2>
        <div class="flex gap-2">
          <input v-model="newTodo" @keyup.enter="addTodo" placeholder="添加新的待办事项..." 
                 class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors" />
          <button @click="addTodo" 
                  class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20">
            添加
          </button>
        </div>
        <div class="max-h-[400px] overflow-y-auto flex flex-col gap-1">
          <template v-for="(todo, index) in e.items">
              <CheckBox
                class="hover:bg-gray-100 transition-colors duration-200 rounded-md px-3 py-2"
                v-model="todo.completed"
                @click="toggleTodo(todo)">
                <div class="flex flex-row gap-2 ml-2 items-center w-full">
                  <span :class="{ 'line-through text-gray-500': todo.completed }" class="text-gray-800">
                    {{ todo.title }}
                  </span>
                  <span class="text-sm text-gray-500">{{ todo.date }}</span>
                  <Placeholder />
                  <button @click="deleteTodo(todo.id)" 
                        class="px-2 py-1 text-sm text-gray-500 hover:text-gray-600 hover:bg-gray-200 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500/20">
                    删除
                  </button>
                </div>
              </CheckBox>
            <div v-if="index < e.items.length - 1" class="h-[1px] bg-gray-200"/>
          </template>
        </div>
      </div>
    </template>
  </WidgetsBase>
</template>
