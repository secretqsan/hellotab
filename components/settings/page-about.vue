<script setup>
const config = useRuntimeConfig();
</script>

<template>
  <div class="p-4 flex flex-col gap-6">
    <div class="p-4 bg-white rounded-lg shadow-sm">
      <h3 class="text-lg font-medium mb-2">HelloTab</h3>
      <p class="text-gray-600 mb-4">{{ $t('about.description') }}</p>
      <div class="text-sm text-gray-500">
        <div class="mb-1">{{ $t('about.versionHint') }}{{ config.public.version }}</div>
        <div class="mb-1">{{ $t('about.authorHint') }}神秘的Q桑</div>
        <div class="mb-1">{{ $t('about.licenseHint') }}LGPL</div>
        <div class="mb-1">
          {{ $t('about.privacyPolicyHint') }}<NuxtLink to="/privacy" class="text-blue-500 hover:text-blue-600 transition-colors">{{ $t('about.privacyPolicyView') }}</NuxtLink>
        </div>
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

    <div class="p-4 bg-white rounded-lg shadow-sm">
      <h3 class="text-lg font-medium mb-2">社区</h3>
      <div class="text-sm text-gray-500 space-y-2">
        <div class="flex items-center gap-2">
          <span>欢迎加入我们的 QQ 交流群：</span>
        </div>
        <div class="flex justify-center mt-2">
          <img src="/image/qq_group.jpg" alt="QQ群二维码" class="w-1/4" />
        </div>
      </div>
    </div>
  </div>
</template>
