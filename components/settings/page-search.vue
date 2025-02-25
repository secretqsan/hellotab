<script setup>
const settingsStore = useSettingsStore()
const {searchEngine} = storeToRefs(settingsStore)
const searchEngineCandidates = ref([
    'Google',
    'Bing',
    'baidu',
    'Duckduckgo',
    '自定义'
])
const urls = ref({
    'Google': 'https://www.google.com/search?q=',
    'Bing': 'https://www.bing.com/search?q=',
    'baidu': 'https://www.baidu.com/s?wd=' ,
    'Duckduckgo': 'https://www.duckduckgo.com/?q=',
    '自定义': ''
})
watch(() => searchEngine.value.id, (newID, oldID) => {
    searchEngine.value.baseUrl = urls.value[newID]
})
</script>

<template>
    <div class="p-4">
        <div class="space-y-6">
            <div class="flex flex-col gap-2">
                <label class="text-sm text-gray-600">默认搜索引擎</label>
                <selector :candidates="searchEngineCandidates" v-model="searchEngine.id"/>
                <label class="text-sm text-gray-600 mb-2 block">URL</label>
                <input 
                    :disabled="searchEngine.id !== '自定义'"
                    v-model="searchEngine.baseUrl"
                    type="text" 
                    :class="[
                        'w-full px-4 py-2 border rounded-lg focus:border-blue-500 focus:outline-none',
                        searchEngine.id != '自定义'? 'text-gray-400' : ''
                    ]"
                    placeholder="请输入搜索引擎Base URL"
                />
            </div>
        </div>
    </div>
</template>