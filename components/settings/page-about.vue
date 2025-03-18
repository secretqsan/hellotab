<script setup>
const config = useRuntimeConfig();
</script>

<template>
  <div class="p-4 space-y-6">
    <div class="p-4 bg-white rounded-lg shadow-sm">
      <h3 class="text-lg font-medium mb-2">HelloTab</h3>
      <p class="text-gray-600 mb-4">一个简洁、美观、实用的新标签页扩展。</p>
      <div class="text-sm text-gray-500">
        <div class="mb-1">版本：{{ config.public.version }}</div>
        <div class="mb-1">作者：神秘的Q桑</div>
        <div class="mb-1">许可证：LGPL</div>
      </div>
    </div>

    <div class="p-4 bg-white rounded-lg shadow-sm">
      <h3 class="text-lg font-medium mb-2">支持我们</h3>
      <div class="text-sm text-gray-500 space-y-2">
        <div :class="[
          'flex items-center gap-2'
        ]">
          <i class="pi pi-github text-lg"></i>
          <span>我们的项目是开源的！欢迎访问</span>
          <a
            href="https://github.com/Gryffindor2/helloTab"
            target="_blank"
            class="text-blue-500 hover:text-blue-600 transition-colors"
            >GitHub 仓库</a
          >
        </div>

        <div class="flex items-center gap-2 mt-4">
          <i class="pi pi-heart-fill text-lg text-red-500"></i>
          <span
            >如果您觉得 HelloTab 对您有帮助，欢迎通过以下方式支持我们：</span
          >
        </div>
        <div class="pl-6 space-y-1">
          <div>• 在 GitHub 上给我们一个 Star</div>
          <div>• 向您的朋友推荐 HelloTab</div>
        </div>
      </div>
    </div>
  </div>
</template>
