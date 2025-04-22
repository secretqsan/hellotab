<script setup>
const aiSearch = ref(false);
const showImageUploader = ref(false);
const imageUploading = ref(false);
const showingImage = ref(false);
const loadingImage = ref(false);
const searchQuery = ref("");
const suggestions = ref([]);
const focused = ref(false);
const textWidth = ref(0);
const aiSuggestion = ref("");
const aiSuggestionAccepted = ref(false);
const settings = useSettingsStore();
const imageData = ref("");
const imageUrl = ref("");
const imageId = ref("");
const currentUrl = useRequestURL();
const { searchEngine, aiSearchEngine } = storeToRefs(settings);

const countdownTime = ref(300);
let countdownTimer = null;

const formattedTime = computed(() => {
  const minutes = Math.floor(countdownTime.value / 60);
  const seconds = countdownTime.value % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
});

function startCountdown() {
  countdownTime.value = 300;
  countdownTimer = setInterval(() => {
    if (countdownTime.value > 0) {
      countdownTime.value--;
    } else {
      
      stopCountdown();
    }
  }, 1000);
}
function stopCountdown() {
  showingImage.value = false;
  clearInterval(countdownTimer);
}

onUnmounted(() => {
  clearInterval(countdownTimer);
});

async function handleUpload() {
  imageUploading.value = true;
  const compressedImage = await compressImage(imageData.value);
  $fetch(apiEndpoint("image/upload"), {
    method: "POST",
    body: {
      imageUrl: imageUrl.value,
      imageData: compressedImage,
    },
  })
    .then((res) => {
      imageId.value = res.id;
      searchQuery.value = "";
      showImageUploader.value = false;
      showingImage.value = true;
      loadingImage.value = true;
      startCountdown();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      imageData.value = "";
      imageUrl.value = "";
      imageUploading.value = false;
    });
}
onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
});

const handleOutsideClick = (event) => {
  const imageUploader = document.querySelector(".image-uploader-container");
  if (
    imageUploader &&
    !imageUploader.contains(event.target) &&
    showImageUploader.value
  ) {
    showImageUploader.value = false;
  }
};

function addHistory(history) {
  const existingIndex = searchEngine.value.history.indexOf(history);
  if (existingIndex == -1) {
    if (
      searchEngine.value.history.length >=
      (searchEngine.value.maxHistoryCnt ?? 50)
    ) {
      searchEngine.value.history.pop();
    }
    searchEngine.value.history.unshift(history);
  }
}
function latestNHistory(n) {
  return searchEngine.value.history.slice(0, n);
}
function openLink(url) {
  addHistory(url);
  const urlWithProtocol = url.match(/^[a-zA-Z]+:\/\//) ? url : `http://${url}`;
  window.open(urlWithProtocol, "_blank");
}

const showInlineSuggestions = computed(() => {
  return searchQuery.value.trim() && focused.value && aiSearch.value;
});

const showSuggestions = computed(() => {
  return focused.value && !aiSearch.value;
});

const acceptAiSuggestion = () => {
  if (aiSearch.value) {
    searchQuery.value = searchQuery.value + aiSuggestion.value;
    aiSuggestionAccepted.value = true;
  }
};

const selectSuggestion = (suggestion) => {
  searchQuery.value = suggestion.text;
  setTimeout(() => {
    handleSearch();
  }, 150);
};

const handleSearch = () => {
  let searchUrl = "";
  if (showingImage.value) {
    stopCountdown();
    console.log(imageId.value);
    console.log(currentUrl);
    searchUrl = constructTemplateUrl(
      searchEngine.value.imageSearchUrl,
      "%s",
      encodeURIComponent(currentUrl + `api/image/${imageId.value}.webp`)
    );
  }
  else if (searchQuery.value.trim()) {
    let baseSearchUrl = "";
    if (aiSearch.value) {
      baseSearchUrl = aiSearchEngine.value.baseUrl;
    } else {
      baseSearchUrl = searchEngine.value.baseUrl;
    }
    let queryStr = encodeURIComponent(searchQuery.value.trim());
    if (baseSearchUrl.includes("%s")) {
      searchUrl = constructTemplateUrl(baseSearchUrl, "%s", queryStr);
    } else {
      searchUrl = `${baseSearchUrl}${queryStr}`;
    }
    if (!aiSearch.value) {
      addHistory(searchQuery.value.trim());
    }
  }
  else {
    return
  }
  //window.open(searchUrl, "_blank");

  console.log(searchUrl);
};

const fetchSuggestions = async (query) => {
  if (!query.trim()) {
    suggestions.value = [];
    var historys = latestNHistory(5);
    for (const history of historys) {
      suggestions.value.push({
        text: history,
        isUrl: isUrl(history),
        history: true,
      });
    }
    return;
  }

  try {
    if (!aiSearch.value) {
      const response = await $fetch(
        proxyedUrl("https://api.bing.com/qsonhs.aspx"),
        {
          params: {
            q: query,
          },
        }
      );
      var suggestions_text =
        response?.AS?.Results?.[0]?.Suggests?.map((s) => s.Txt) || [];
      const matchedHistory = latestNHistory(
        searchEngine.value.maxHistoryCnt ?? 50
      )
        .filter((h) => h.toLowerCase().includes(query.toLowerCase()))
        .slice(-3);

      suggestions_text = suggestions_text.filter(
        (text) => !matchedHistory.includes(text)
      );
      suggestions_text.unshift(...matchedHistory);
      if (isUrl(query)) {
        const queryIndex = suggestions_text.findIndex((s) => s === query);
        if (queryIndex !== -1) {
          suggestions_text.splice(queryIndex, 1);
        }
        suggestions_text.unshift(query);
      }
      suggestions.value = [];
      for (const suggestion of suggestions_text) {
        suggestions.value.push({
          text: suggestion,
          isUrl: isUrl(suggestion),
          history: matchedHistory.includes(suggestion),
        });
      }
    } else {
      var result = await $fetch("/api/completion", {
        method: "GET",
        query: {
          message: query,
        },
      });
      aiSuggestionAccepted.value = false;
      if (result.startsWith(query)) {
        result = result.slice(query.length).trim();
      }
      aiSuggestion.value = result;
    }
  } catch (error) {
    console.error("Failed to fetch suggestions:", error);
    suggestions.value = [];
  }
};
const debouncedFetchSuggestions = _debounce(fetchSuggestions, 300);

const calculateTextWidth = (text) => {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  context.font = getComputedStyle(document.body).font;
  return context.measureText(text).width;
};

watch(
  () => searchQuery.value,
  (newValue) => {
    if (newValue == " ") {
      searchQuery.value = "";
      aiSearch.value = true;
      return;
    }
    textWidth.value = calculateTextWidth(newValue);
    debouncedFetchSuggestions(newValue);
  }
);
const handleBlur = () => {
  setTimeout(() => {
    focused.value = false;
  }, 100);
};
function searchBoxFocused() {
  showImageUploader.value = false;
  focused.value = true;
  if (aiSearch.value == false && searchQuery.value.trim() == "") {
    suggestions.value = [];
    var historys = latestNHistory(5);
    for (const history of historys) {
      suggestions.value.push({
        text: history,
        isUrl: isUrl(history),
        history: true,
      });
    }
  }
}
</script>

<template>
  <div class="relative w-full max-w-[600px]">
    <div class="relative w-full group">
      <input
        v-model="searchQuery"
        type="text"
        autocomplete="off"
        :placeholder="
          aiSearch
            ? $t('search.askAi')
            : showingImage
            ? ''
            : $t('search.search') + '...'
        "
        @keyup.enter="handleSearch"
        @keyup.right="acceptAiSuggestion"
        @keydown.backspace="
          () => {
            if (aiSearch && searchQuery.trim() == '') {
              aiSearch = false;
            }
          }
        "
        @blur="handleBlur"
        @focus="searchBoxFocused"
        :class="[
          'w-full px-4 py-3 pr-[80px] text-base border-2 outline-none transition-all duration-200',
          aiSearch
            ? 'focus:shadow-[0_0_15px_rgba(255,105,180,0.3),0_0_15px_rgba(147,112,219,0.3)] '
            : 'focus:border-blue-500 group-focus-within:border-blue-500',
          aiSearch
            ? 'border-transparent bg-clip-padding bg-[padding-box] border-[2px] border-[transparent]' +
              ' [background-image:linear-gradient(white,white),linear-gradient(to_right,#ff69b4,#9370db)]' +
              ' [background-origin:border-box] [background-clip:padding-box,border-box]'
            : 'border-slate-200',
          showSuggestions && suggestions.length > 0
            ? 'rounded-t-lg'
            : 'rounded-lg',
        ]"
      />
      <span
        v-if="showInlineSuggestions && !aiSuggestionAccepted"
        class="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
        :style="`padding-left: calc(20px + ${textWidth}px)`"
      >
        {{ aiSuggestion }}
      </span>
      <div
        :class="[
          'absolute right-0 top-1/2 -translate-y-1/2 flex flex-row items-center justify-center h-full gap-1',
          showingImage ? 'left-0' : '',
        ]"
      >
        <div class="h-full p-1 flex items-center" v-if="showingImage">
          <i
            class="pi pi-spinner pi-spin text-lg"
            v-if="loadingImage"
          />
          <img
            v-show="!loadingImage"
            class="h-full rounded-lg"
            :src="`/api/image/${imageId}.webp`"
            @load="loadingImage = false"
            @error="showingImage = false"
          />
        </div>

        <div
          v-if="showingImage"
          class="relative w-10 h-10"
        >
          <svg class="w-full h-full">
            <circle
              cx="20"
              cy="20"
              r="16"
              stroke="#E2E8F0"
              stroke-width="3"
              fill="none"
            />
            <circle
              cx="20"
              cy="20"
              r="16"
              stroke="#3B82F6"
              stroke-width="3"
              fill="none"
              stroke-dasharray="100.48"
              :stroke-dashoffset="-100.48 * (1 - countdownTime / 300)"
              class="transition-all duration-1000"
              transform="rotate(-90 20 20)"
            />
          </svg>
          <div
            class="absolute inset-0 flex flex-col items-center justify-center"
          >
            <span class="text-xs font-medium text-gray-600">{{
              formattedTime
            }}</span>
          </div>
        </div>
        <CustomPlaceholder v-if="showingImage" />
        <button
          v-if="searchQuery.trim() !== '' || showingImage"
          class="hover:bg-gray-100 rounded-lg text-gray-600 w-10 h-10"
          @click="
            () => {
              searchQuery = '';
              stopCountdown();
            }
          "
        >
          <i class="pi pi-times" />
        </button>
        <ClientOnly>
          <button
            v-if="!aiSearch && searchEngine.imageSearchUrl"
            :class="[
              'hover:bg-gray-100 rounded-lg text-gray-600 w-10 h-10',
              showImageUploader ? 'bg-gray-200' : ' ',
            ]"
            @click.stop="showImageUploader = !showImageUploader"
          >
            <i class="pi pi-image" />
          </button>
        </ClientOnly>

        <button
          @click="handleSearch"
          :class="[
            aiSearch ? 'w-[40px] h-[40px] mr-2 rounded-lg' : 'w-[80px] h-full',
            'text-sm',
            aiSearch ? 'text-gray-700' : 'text-white',
            aiSearch
              ? 'hover:bg-gray-200/50'
              : 'bg-blue-400 hover:bg-blue-500 group-focus-within:bg-blue-500',
            showSuggestions && suggestions.length > 0
              ? 'rounded-tr-lg'
              : 'rounded-r-lg',
            'cursor-pointer',
            'transition-all duration-150',
            'flex items-center justify-center',
          ]"
        >
          <i :class="['pi', aiSearch ? 'pi-send' : 'pi-search']" />
        </button>
      </div>
    </div>
    <transition
      enter-active-class="transition ease-out duration-250"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showImageUploader"
        :class="[
          'image-uploader-container',
          'flex flex-col gap-2 bg-white mt-2 border-2 border-blue-500 rounded-md p-2',
          'absolute left-0 right-0',
        ]"
      >
        <CustomImageUploader
          :alt="imageData"
          class="w-full border h-60"
          v-model="imageData"
        />
        <div
          v-if="imageData"
          class="absolute top-0 right-0 m-4 w-8 h-8 text-xl flex justify-center items-center bg-gray-100/10 hover:bg-gray-100/50 rounded-full transition-all transition-200"
          @click.stop="imageData = ''"
        >
          <i class="pi pi-times text-gray-300/80 cursor-pointer" />
        </div>
        <div class="flex flex-row gap-2">
          <custom-text
            class="flex-1"
            placeholder="图像Url"
            v-model="imageUrl"
          />
          <custom-button
            :disabled="imageUploading || (!imageData && !imageUrl)"
            :class="[
              'text-white transition-colors duration-200',
              imageUploading || (!imageData && !imageUrl)
                ? imageUploading
                  ? 'bg-blue-500 cursor-not-allowed'
                  : 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600',
            ]"
            @click.stop="handleUpload"
          >
            <i v-if="imageUploading" class="pi pi-spin pi-spinner" />
            <div v-else>确定</div>
          </custom-button>
        </div>
      </div>
    </transition>
    <transition
      enter-active-class="transition ease-out duration-250"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showSuggestions && suggestions.length > 0"
        :class="[
          'absolute left-0 right-0',
          'top-full bg-white border-2 border-t-0 border-blue-500 rounded-b-lg shadow-lg',
          'overflow-hidden',
        ]"
      >
        <div
          v-for="(suggestion, index) in suggestions"
          :key="suggestion"
          class="group"
        >
          <div
            class="px-4 py-3 cursor-pointer transition-colors duration-200 hover:bg-slate-50 flex flex-row items-center gap-2"
            @click="selectSuggestion(suggestion)"
          >
            <i v-if="suggestion.history" class="pi pi-history" />
            <div :class="[suggestion.isUrl ? 'underline' : '', ' truncate']">
              {{ suggestion.text }}
            </div>
            <i v-if="suggestion.isUrl" class="pi pi-globe" />
            <CustomPlaceholder />
            <button
              @click.stop="openLink(suggestion.text)"
              v-if="suggestion.isUrl"
              class="p-1 rounded-md hover:bg-gray-200 transition-colors duration-150 flex items-center justify-center"
            >
              <i class="pi pi-external-link" />
            </button>
          </div>
          <div
            v-if="index < suggestions.length - 1"
            class="h-[1px] bg-slate-200 ml-2 mr-2"
          />
        </div>
      </div>
    </transition>
  </div>
</template>
