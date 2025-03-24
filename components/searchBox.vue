<script setup>
const aiSearch = ref(false);
const searchQuery = ref("");
const suggestions = ref([]);
const focused = ref(false);
const textWidth = ref(0);
const aiSuggestion = ref("");
const aiSuggestionAccepted = ref(false);
const settings = useSettingsStore();
const { searchEngine, aiSearchEngine, glmApiKey } = storeToRefs(settings);

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
  return searchEngine.value.history.slice(-n).reverse();
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
  if (searchQuery.value.trim()) {
    let searchUrl = "";
    if (aiSearch.value) {
      searchUrl = `${aiSearchEngine.value.baseUrl}${encodeURIComponent(
        searchQuery.value.trim()
      )}`;
    } else {
      searchUrl = `${searchEngine.value.baseUrl}${encodeURIComponent(
        searchQuery.value.trim()
      )}`;
    }
    addHistory(searchQuery.value.trim());
    window.open(searchUrl, "_blank");
  }
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
      const matchedHistory = latestNHistory(50)
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
      if (glmApiKey.value == "") {
        aiSuggestion.value = "提供API Key以开启AI补全";
        return;
      }
      const response = await $fetch(
        `https://open.bigmodel.cn/api/paas/v4/chat/completions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${glmApiKey.value}`,
          },
          body: {
            model: "glm-4-flashx",
            messages: [
              {
                role: "system",
                content:
                  "根据提供的片段给出接下来最合理的几个字，以让整个语句构成一个有意义的简短提问，不要重复我提供的内容",
              },
              { role: "user", content: query },
            ],
          },
        }
      );
      aiSuggestionAccepted.value = false;
      let result = response.choices?.[0]?.message?.content?.trim() || "";
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
  const canvas = document.createElement("canvas");
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
      <input v-show="false"> <!--//difuse the browser autofill-->
      <input
        v-model="searchQuery"
        type="text"
        autocomplete="off"
        :placeholder="aiSearch ? '问AI' : $t('search.search') + '...'"
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
          'w-full px-4 py-3 pr-[80px] text-base border-2 ' +
            'outline-none transition-all duration-200 ',
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
      <button
        @click="handleSearch"
        :class="[
          'absolute right-0 top-1/2 -translate-y-1/2',
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
        <i v-if="aiSearch" class="pi pi-send" />
        <i v-else class="pi pi-search" />
      </button>
    </div>
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showSuggestions && suggestions.length > 0"
        :class="
          'absolute left-0 right-0 ' +
          'top-full bg-white border-2 border-t-0 border-blue-500 rounded-b-lg shadow-lg ' +
          'overflow-hidden'
        "
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
            <placeholder />
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
