<script setup>
import { ref } from "vue";
const activeTab = ref("popular");
const searchQuery = ref("");
const selectedCategory = ref("all");
const runtimeVariables = useRuntimeStore();
const settings = useSettingsStore();
const { widgets } = storeToRefs(settings);
const { crxId, toast } = storeToRefs(runtimeVariables);

const handleImportBookmarks = async () => {
  if (crxId.value) {
    try {
      var favList = [];
      chrome.runtime.sendMessage(
        crxId.value,
        { type: "fav", msg: "" },
        function (response) {
          favList = JSON.parse(response.msg);
          for (var i = 0; i < favList.length; i++) {
            var fav = favList[i];
            widgets.value.push({
              type: "web",
              title: fav.title,
              size_x: 1,
              size_y: 1,
              e: {
                url: fav.url,
                icon: getFaviconUrl(fav.url),
                customIcon: false,
              },
            });
          }
        }
      );
      toast.value.showToast("导入成功");
    } catch (error) {
      toast.value.showToast("导入失败");
      console.log(error);
    }
  } else {
    alert("请先安装插件");
    window.open("/intro", "_blank");
  }
};

const getFaviconUrl = (url) => {
  try {
    const domain = new URL(url).origin;
    return `${domain}/favicon.ico`;
  } catch {
    return "";
  }
};

const categories = computed(() => [
  { name: "all", label: "全部" },
  ...popularWebsites.map((category) => ({
    name: category.name,
    label: category.name,
  })),
]);

const filteredWebsites = computed(() => {
  const sites =
    selectedCategory.value === "all"
      ? popularWebsites.flatMap((category) => category.sites)
      : popularWebsites.find(
          (category) => category.name === selectedCategory.value
        )?.sites || [];

  if (!searchQuery.value) return sites;

  const query = searchQuery.value.toLowerCase();
  return sites.filter(
    (site) =>
      site.name.toLowerCase().includes(query) ||
      site.url.toLowerCase().includes(query)
  );
});
const customWebsite = ref({
  name: "",
  url: "",
  icon: "",
  custom: false,
});

const iconInput = ref();
const handleIconSelect = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = (e) => {
      customWebsite.value.icon = e.target.result;
      customWebsite.value.custom = true;
    };
    reader.readAsDataURL(file);
  }
};

const handleAddCustomWebsite = () => {
  var id = "";
  if (customWebsite.value.custom) {
    id = pictureProxy(customWebsite.value.icon);
  }
  widgets.value.push({
    type: "web",
    title: customWebsite.value.name,
    size_x: 1,
    size_y: 1,
    e: {
      url: customWebsite.value.url,
      icon: customWebsite.value.custom ? id : customWebsite.value.icon,
      customIcon: customWebsite.value.custom,
    },
  });
  customWebsite.value = {
    name: "",
    url: "",
    icon: "",
  };
  toast.value.showToast("添加成功");
};
</script>

<template>
  <div class="p-4 flex flex-col gap-6 w-full h-full">
    <button
      v-if="$device.isDesktop"
      class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
      @click="handleImportBookmarks"
    >
      <i class="pi pi-bookmark"></i>
      <span>导入浏览器收藏夹</span>
    </button>

    <div class="bg-white rounded-lg p-4 w-full flex-1 h-0 flex flex-col overflow-hidden">
      <div class="flex gap-4 mb-4">
        <button
          v-for="tab in ['popular', 'custom']"
          :key="tab"
          @click="activeTab = tab"
          :class="[
            'px-4 py-2 rounded-lg transition-colors duration-200',
            activeTab === tab
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 hover:bg-gray-100',
          ]"
        >
          {{ tab === "popular" ? "热门网址" : "自定义" }}
        </button>
      </div>

      <div v-if="activeTab === 'popular'" class="flex flex-col gap-4 flex-1 h-0">
        <div class="flex gap-4 items-center">
          <div class="relative flex-1">
            <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              class="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="搜索网站..."
            />
          </div>
          <select
            v-model="selectedCategory"
            class="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option
              v-for="category in categories"
              :key="category.name"
              :value="category.name"
            >
              {{ category.label }}
            </option>
          </select>
        </div>
        <div class="overflow-auto  flex-1">
          <div class="grid grid-cols-2 gap-4">
            <template v-for="site in filteredWebsites">
              <div
                v-if="!widgets.find((w) => w.e1 == site.url)"
                @click="
                  () => {
                    toast.showToast('添加成功');
                    widgets.push({
                      type: 'web',
                      title: site.name,
                      size_x: 1,
                      size_y: 1,
                      e: {
                        url: site.url,
                        icon:
                          site.icon == '' ? getFaviconUrl(site.url) : site.icon,
                        customIcon: false,
                      },
                    });
                  }
                "
                :class="[
                  'overflow-hidden p-4 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors duration-200 flex items-center gap-3',
                  ($device.isDesktop || $device.isTablet)? 'flex-row': 'flex-col'
                ]"
              >
                <img
                  loading="lazy"
                  :src="site.icon == '' ? getFaviconUrl(site.url) : site.icon"
                  :alt="site.name"
                  class="w-6 h-6"
                  @error="$event.target.src = '/icons/globe.svg'"
                />
                <div>
                  <div class="font-medium">{{ site.name }}</div>
                  <div
                    v-if="$device.isDesktop || $device.isTablet"
                    class="text-sm text-gray-500">{{ site.url }}</div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div v-else class="space-y-4">
        <div class="flex flex-col gap-2">
          <label class="text-sm text-gray-600">网站名称</label>
          <input
            v-model="customWebsite.name"
            type="text"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="请输入网站名称"
            required
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm text-gray-600">网站链接</label>
          <input
            v-model="customWebsite.url"
            type="url"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="请输入网站链接 (例如: https://www.example.com)"
            required
            @blur="customWebsite.icon = getFaviconUrl(customWebsite.url)"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm text-gray-600">自定义图标</label>
          <div class="flex gap-4 items-center">
            <img
              v-if="customWebsite.icon"
              :src="customWebsite.icon"
              class="w-10 h-10 rounded-lg border"
            />
            <div
              v-else
              class="w-10 h-10 rounded-lg border flex items-center justify-center text-gray-400"
            >
              <i class="pi pi-image text-xl"></i>
            </div>
            <input
              type="file"
              accept="image/*"
              class="hidden"
              ref="iconInput"
              @change="handleIconSelect"
            />
            <button
              type="button"
              class="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              @click="$refs.iconInput.click()"
            >
              选择图标
            </button>
          </div>
        </div>
        <button
          @click="handleAddCustomWebsite"
          class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          添加网站
        </button>
      </div>
    </div>
  </div>
</template>
