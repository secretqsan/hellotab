import zh from './locales/zh'
import en from './locales/en'
import ja from './locales/ja'

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'zh',
    messages: {
      zh,
      en,
      ja
    }
}))
  