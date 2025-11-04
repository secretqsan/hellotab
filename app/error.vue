<script setup>
const props = defineProps({
  error: Object
});

useHead({
  title: `错误 ${errorCode.value} | HelloTab`,
});

</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-4">
    <div class="bg-white rounded-xl p-8 shadow-lg max-w-md w-full text-center">
      <div class="text-red-500 mb-4">
        <i class="pi pi-exclamation-circle text-6xl"></i>
      </div>
      <h1 class="text-4xl font-bold text-gray-800 mb-2">{{ props.error?.statusCode }}</h1>
      <p class="text-xl text-gray-600 mb-6">{{ props.error?.message  }}</p>
      <p class="text-gray-500 mb-8">{{ $t('error.description') }}</p>
      <NuxtLink 
        class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2" 
        to="/"
      >
        <i class="pi pi-home"></i>
        <span>{{ $t('error.backToHome') }}</span>
      </NuxtLink>
    </div>
  </div>
</template>