<script setup>
const localSettings = useLocalSettingsStore()
const { firstSyncOk, syncEnabled, webdavTestedOk, webdavUrl, webdavUsername, webdavPassword } = storeToRefs(localSettings)
const testingConnection = ref(false)
const settingsStore = useSettingsStore()
const imageStorage = useImageStore();
const { pictures } = storeToRefs(imageStorage);
const uploading = ref(false)
const downloading = ref(false)
const previousDataExists = ref(true)

import Client from '@/utils/webdav.js'

const testConnection = async () => {
    const client = new Client(`/api/proxy/${webdavUrl.value}`, {
        subdir: 'hellotab',
        username: webdavUsername.value,
        password: webdavPassword.value
    })
    testingConnection.value = true
    try {
        await client.createFolder()
        var res = await client.listFiles()
        if (!res.includes('settings.json')) {
            previousDataExists.value = false
        }
        webdavTestedOk.value = true
    } catch (error) {
        console.error('连接测试失败:', error)
        alert('连接失败，请检查配置')
    } finally {
        testingConnection.value = false
    }
}

function clearSyncState() {
    firstSyncOk.value = false
    webdavTestedOk.value = false
}

const uploadToCloud = async () => {
    uploading.value = true
    const client = new Client(`/api/proxy/${webdavUrl.value}`, {
        subdir: 'hellotab',
        username: webdavUsername.value,
        password: webdavPassword.value
    })
    try {
        await client.uploadFile('settings.json', JSON.stringify(settingsStore.$state, null, 0))
        for (const picture in pictures.value) {
            await client.uploadFile(picture, pictures.value[picture])
        }
        firstSyncOk.value = true
        alert('同步成功')
    } catch (error) {
        console.error('同步失败:', error)
        alert('同步失败，请检查配置')
    }
    uploading.value = false

}

const downloadFromCloud = async () => {
    downloading.value = true
    const decoder = new TextDecoder('utf-8');
    const client = new Client(`/api/proxy/${webdavUrl.value}`, {
        subdir: 'hellotab',
        username: webdavUsername.value,
        password: webdavPassword.value
    })
    try {
        var res = await client.listFiles()
        var pictures = res.filter(file => file != 'settings.json')
        var newPhotoStorage = {
            pictures: {}
        }
        for (const picture of pictures) {
            var data = await client.fetchFile(picture)
            data = decoder.decode(data);
            newPhotoStorage.pictures[picture] = data
        }
        imageStorage.$patch(newPhotoStorage)
        const remoteSettings = await client.fetchFile('settings.json')
        
        var settingsText = decoder.decode(remoteSettings);
        settingsStore.$patch(JSON.parse(settingsText))
        firstSyncOk.value = true
        alert('同步成功')
    } catch (error) {
        console.error('同步失败:', error)
        alert('同步失败，请检查配置')
    }
    downloading.value = false
}
</script>

<template>
    <div class="p-4 space-y-6">
            <div class="flex flex-col gap-4">
                <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                    <div>
                        <h3 class="text-base font-medium">启用同步</h3>
                        <p class="text-sm text-gray-500 mt-1">开启后可以在多个设备间同步您的设置</p>
                    </div>
                    <div :class="[
                            'relative inline-block w-12 h-6 rounded-full transition duration-200 ease-in-out cursor-pointer',
                            syncEnabled? 'bg-blue-500': 'bg-gray-200'
                        ]"
                        @click="()=>{
                            syncEnabled = !syncEnabled;
                            firstSyncOk = false
                        }">
                        <div :class="[
                            'absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out',
                            syncEnabled? 'translate-x-6': '' 
                        ]"/>
                    </div>
                </div>
                
                <template v-if="syncEnabled">
                    <div class="p-4 bg-white rounded-lg shadow-sm">
                        <h3 class="text-base font-medium mb-4">WebDAV 存储配置</h3>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm text-gray-600 mb-1">服务器地址</label>
                                <input 
                                    v-model="webdavUrl" 
                                    @change="clearSyncState"
                                    type="text" 
                                    class="w-full px-3 py-2 border rounded-lg" 
                                    placeholder="https://example.com"
                                />
                            </div>
                            <div>
                                <label class="block text-sm text-gray-600 mb-1">用户名</label>
                                <input 
                                    v-model="webdavUsername"
                                    @change="clearSyncState" 
                                    type="text" 
                                    class="w-full px-3 py-2 border rounded-lg" 
                                />
                            </div>
                            <div>
                                <label class="block text-sm text-gray-600 mb-1">密码</label>
                                <input 
                                    v-model="webdavPassword" 
                                    @change="clearSyncState"
                                    type="password" 
                                    class="w-full px-3 py-2 border rounded-lg" 
                                />
                            </div>

                            <button 
                                v-if="!webdavTestedOk"
                                @click="testConnection"
                                :class="[
                                    'w-full px-4 py-2 rounded-lg transition-colors',
                                    testingConnection ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
                                ]"
                                :disabled="testingConnection"
                            >
                                <span v-if="testingConnection">测试中...</span>
                                <span v-else>测试连接</span>
                            </button>
                            <div v-else class="space-y-4">
                                <div v-if="!firstSyncOk" class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                                    <p class="text-sm text-yellow-700">您尚未进行过同步，请先进行一次同步以开启自动同步功能。</p>
                                </div>
                                <button 
                                    :disabled="uploading || downloading"
                                    @click="uploadToCloud"
                                    :class="[
                                        (uploading ||downloading)? 'bg-gray-200 cursor-not-allowed': 'bg-blue-500 hover:bg-blue-600 text-white',
                                        'w-full px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2'
                                    ]"
                                >
                                    <i :class="uploading? 'pi pi-spin pi-spinner': 'pi pi-cloud-upload'"></i>
                                    <span>同步到云端</span>
                                </button>
                                <button 
                                    v-if="previousDataExists"
                                    :disabled="uploading || downloading"
                                    @click="downloadFromCloud"
                                    :class="[
                                        (uploading ||downloading)? 'bg-gray-200 cursor-not-allowed': 'bg-blue-500 hover:bg-blue-600 text-white',
                                        'w-full px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2'
                                    ]">
                                    <i :class="downloading? 'pi pi-spin pi-spinner': 'pi pi-cloud-download'"></i>
                                    <span>从云端同步</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
    </div>
</template>