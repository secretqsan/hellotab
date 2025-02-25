<script setup>
const aiSearchEngineCandidate = ref(
    ['秘塔搜索', 'Perplexity']
)
const urls = ref({
    '秘塔搜索': 'https://metaso.cn/?q=',
    'Perplexity': 'https://www.perplexity.ai/?q='
})
const settings = useSettingsStore()
const { aiSearchEngine, glmApiKey } = storeToRefs(settings)
const showApiKey = ref(false)
watch(() => aiSearchEngine.value.id, (newId, oldId) => {
    aiSearchEngine.value.baseUrl = urls.value[newId]
})     
</script>

<template>
    <div class="p-4">
        <div class="space-y-6">
            <div class="flex flex-col gap-4">
                <label class="text-sm text-gray-600">AI搜索服务提供商</label>
                <selector :candidates="aiSearchEngineCandidate" v-model="aiSearchEngine.id"/>
                <label class="text-sm text-gray-600">智谱API Key</label>
                <div class="relative">
                    <input 
                        v-model="glmApiKey"
                        :type="showApiKey ? 'text' : 'password'"
                        class="w-full px-4 py-2 border rounded-lg transition-colors focus:border-blue-500 focus:outline-none pr-10"
                        placeholder="请输入智谱API Key"
                    />
                    <button 
                        @click="showApiKey = !showApiKey"
                        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <i :class="['pi', showApiKey ? 'pi-eye-slash' : 'pi-eye']"></i>
                    </button>
                </div>
                <p class="text-xs text-gray-500 mt-1">用于输入预测，请在<a href="https://open.bigmodel.cn/" target="_blank" class="hover:underline inline-flex items-center">智谱AI官网<i class="mx-1 pi pi-external-link ml-0.5 text-[10px]"></i></a>获取API Key</p>
            </div>
        </div>
    </div>
</template>