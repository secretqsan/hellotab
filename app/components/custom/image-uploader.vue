<script setup>
const props = defineProps({
  enabled: {
    type: Boolean,
    default: true,
  },
  alt: {
    type: String,
    default: '',
  },
});
const fileInputRef = ref(null);
const divRef = ref(null);
const data = defineModel({
  type: String,
  default: '',
});

const handleDrop = (event) => {
  const file = event.dataTransfer.files[0];
  loadFile(file);
};

const handlePaste = (event) => {
  const items = event.clipboardData.items;
  for (const item of items) {
    if (item.type.indexOf('image') !== -1) {
      const file = item.getAsFile();
      loadFile(file);
      break;
    }
  }
};

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  loadFile(file);
};

const loadFile = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    data.value = e.target.result;
  };
  reader.readAsDataURL(file);
};
onMounted(() => {
    divRef.value.focus();
})
</script>
<template>
  <div
    ref="divRef"
    tabindex="0"
    :class="[
      'flex justify-center items-center overflow-hidden rounded-lg outline-none',
      enabled? 'cursor-pointer' : ''
    ]"
    @click="divRef.focus()"
    @dblclick="() => {
      if (enabled) {
        fileInputRef.click();
      }
    }"
    @dragover.prevent
    @drop.prevent="(event) => {
      if (enabled) {
        handleDrop(event);
      }
    }"
    @paste.prevent="(event) => {
      if (enabled) {
        handlePaste(event);
      }
    }"
  >
    <div 
      v-if="alt==''" 
      class="m-4 flex flex-col items-center gap-4 text-gray-400"
    >
      <i class="pi pi-upload text-4xl"></i>
      <span class="text-sm">粘贴或拖拽图片到此处。双击以选择文件。</span>
    </div>
    <img 
      v-else
      class="w-full" 
      :src="alt"
    />
    <input
      type="file"
      ref="fileInputRef"
      class="hidden"
      accept="image/*"
      @change="handleFileSelect"
    />
  </div>
</template>
