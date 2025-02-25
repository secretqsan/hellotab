export const useSettingsStore = defineStore('settings', {
    state: () => ({
        searchEngine: {
            id: 'Bing',
            baseUrl: 'https://api.bing.com/qsonhs.aspx&q='
        },
        aiSearchEngine: {
            id: '秘塔搜索',
            baseUrl: 'https://metaso.cn/?q='
        },
        glmApiKey: '',
        widgets:[
            { title: '百度', type: '网页', size_x: 1, size_y: 1, e:{
                url: 'https://www.baidu.com',
                icon: 'https://www.baidu.com/favicon.ico',
                customIcon: false,
            } },
            { title: '', type: '日历', size_x: 1, size_y: 1, e: {} },
            { title: '', type: '时钟', size_x: 1, size_y: 1, e: {} },
            { title: '', type: '天气', size_x: 2, size_y: 2, e: {} },
            { title: '', type: '新建', size_x: 1, size_y: 1, e: {} }
        ],
        appearance:{
            hideTitle: false,
            background: 'bing',
            e1: ''
        },
    }),
    persist: true,
})