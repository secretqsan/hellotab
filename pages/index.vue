<script setup>
import draggable from 'vuedraggable'

const onlineBackgroundUrl = ref('')
const settingPanelOpened = ref(false)
const settingPage = ref('search')
const imageStorage = useImageStore();
const { pictures } = storeToRefs(imageStorage);

const settingStore = useSettingsStore()
const localSettings = useLocalSettingsStore()
const { syncEnabled, webdavTestedOk, webdavUrl, webdavUsername, webdavPassword } = storeToRefs(localSettings)
const { widgets, appearance } = storeToRefs(settingStore)
import Client from '~/utils/webdav';
import WebpageWidget from '@/components/widgets/website.vue'
import newWidget from '@/components/widgets/new.vue'
import WeatherWidget from '@/components/widgets/weather.vue'
import CalendarWidget from '@/components/widgets/calendar.vue'
import ClockWidget from '@/components/widgets/clock.vue'
import { debounce } from 'lodash'
const uploadSettings = debounce(async () => {
  const client = new Client(`/api/proxy/${webdavUrl.value}`, {
        subdir: 'hellotab',
        username: webdavUsername.value,
        password: webdavPassword.value
    })
    try {
        await client.uploadFile('settings.json', JSON.stringify(settingStore.$state, null, 0))
    } catch (error) {
        console.error('同步失败:', error)
    }
}, 1000)
const uploadImages = debounce(async () => {
  const client = new Client(`/api/proxy/${webdavUrl.value}`, {
        subdir: 'hellotab',
        username: webdavUsername.value,
        password: webdavPassword.value
    })
    try {
      var files = await client.listFiles()
      var savedImages = files.filter(file => file != 'settings.json')
      var localImages = Object.keys(pictures.value)
      var idToUpload = localImages.filter(image => !savedImages.includes(image))
      var idToDelete = savedImages.filter(image => !localImages.includes(image))
      for(var imageId of idToUpload) {
        await client.uploadFile(imageId, pictures.value[imageId])
      }
      for(var imageId of idToDelete) {
        await client.deleteFile(imageId)
      }
    } catch (error) {
        console.error('同步失败:', error)
    }
}, 1000)

async function fetchSettings(){
  const client = new Client(`/api/proxy/${webdavUrl.value}`, {
        subdir: 'hellotab',
        username: webdavUsername.value,
        password: webdavPassword.value
    })
  const decoder = new TextDecoder('utf-8');
  try {
    var files = await client.listFiles()
    var savedImages = files.filter(file => file != 'settings.json')
    var localImages = Object.keys(pictures.value)
    var idToDownload = savedImages.filter(image =>!localImages.includes(image))
    var idToDelete = localImages.filter(image =>!savedImages.includes(image))
    for(var imageId of idToDownload) {
      pictures.value[imageId] = decoder.decode(await client.fetchFile(imageId))
    }
    for(var imageId of idToDelete) {
      delete pictures.value[imageId]
    }
    var settings = decoder.decode(await client.fetchFile('settings.json'))

    settingStore.$patch(JSON.parse(settings))

  } catch (error) {
    console.error('同步失败:', error)
  }
}
watch(() => settingStore.$state, () => {
  if (syncEnabled.value && webdavTestedOk.value) {
    uploadSettings()
  }
}, { deep: true })

watch(pictures, () => {
  if (syncEnabled.value && webdavTestedOk.value) {
    uploadImages()
  }
}, { deep: true })

const widgetsConvertTable = {
  '网页': WebpageWidget,
  '新建': newWidget,
  '天气': WeatherWidget,
  '日历': CalendarWidget,
  '时钟': ClockWidget
}

const selectedId = ref(-1)
const menu = ref();
const items = ref([
    { 
      label: '缩小', 
      icon: 'pi pi-minus', 
      command: () => {
        switch (widgets.value[selectedId.value].size_x * 10 + widgets.value[selectedId.value].size_y) {
          case 21:
            widgets.value[selectedId.value].size_x = 1
            break;

          case 22:
            widgets.value[selectedId.value].size_y = 1
            break;
          
          default:
            break;
        }
      }
    },
    { 
      label: '扩大', 
      icon: 'pi pi-plus',
      command: () => {
        switch (widgets.value[selectedId.value].size_x * 10 + widgets.value[selectedId.value].size_y) {
          case 21:
            widgets.value[selectedId.value].size_y = 2
            break;
          
          case 11:
            widgets.value[selectedId.value].size_x = 2
            break;

          default:
            break;
        }
      }
    },
    { separator: true },
    { 
      label: 'Delete', 
      icon: 'pi pi-trash',
      command: () => {
        widgets.value.splice(selectedId.value, 1)
      }
    }
]);
import backgroundImageUrl from '~/utils/background';
backgroundImageUrl()
onMounted(() => {
  if (syncEnabled.value && webdavTestedOk.value) {
    fetchSettings()
  }
  $fetch('/api/proxy/https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1')
  .then(res => {
    onlineBackgroundUrl.value = `https://www.bing.com${res.images[0].url}`
  })
  .catch(err => {
    console.log(err)
  })
})
const backgroundUrl = computed(() => {
  if (appearance.value.background == '自定义' && appearance.value.e1) {
    return pictures.value[appearance.value.e1]
  }
  else {
    return onlineBackgroundUrl.value
  }
})
</script>

<template>
  <div 
    class="
      p-4 h-screen w-screen 
      bg-cover bg-center bg-no-repeat 
      flex flex-col items-center
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-thumb]:bg-white/50
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:hover:bg-white/60" 
    :style="`background-image: url(${backgroundUrl})`"
  >
    <div class="flex flex-row w-full">
      <Placeholder/>
      <div
        class="
          text-white hover:bg-white/20 
          w-12 h-12 rounded-lg 
          flex items-center justify-center
        "
        @click="()=>{
          settingPanelOpened = true;
          settingPage = 'search'
        }"
      >
        <i class="pi pi-cog text-xl"></i>
      </div>
    </div>
    <div class="h-20 min-h-10"></div>
    <searchBox class="z-10"/>
    <div class="h-20 min-h-10"></div>
    <div class="flex-1 w-full overflow-auto">
      <draggable
        filter=".fixed"
        v-model="widgets"
        item-key="id"
        class="
          w-full grid gap-16
          px-[calc(100%/8)]
          grid-cols-[repeat(auto-fill,_80px)]
          justify-center
        "
        :style="{'grid-auto-flow': 'dense'}"
      >
        <template #item="{element}">
          <component
            :is="widgetsConvertTable[element.type]"
            :size_x="element.size_x" 
            :size_y="element.size_y"
            :title="element.title"
            :e="element.e"
            @click="()=>{
              if (element.type == '新建') {
                settingPanelOpened = true;
                settingPage = 'widgets'
              }
            }"
            @contextmenu="(event) => {
              if (element.type != '新建') {
                selectedId = widgets.indexOf(element)
                menu.show(event)
              }
            }"
          />
        </template>
      </draggable>
    </div>
  </div>
  <ContextMenu ref="menu" :model="items"/>
  <div
    v-if="settingPanelOpened"
    class="
      w-screen h-screen 
      fixed top-0 left-0 
      bg-gray-800/40 z-50
      flex items-center justify-center
    "
  >
    <SettingsMain v-model="settingPage" @close="settingPanelOpened = false"/>
  </div>
</template>

<style>
/* Firefox滚动条样式 */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}
</style>
