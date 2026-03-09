// i18n configuration for BedtimeStory
const translations = {
    en: { appName: 'BedtimeStory', description: 'Magical personalized bedtime stories for children' },
    de: { appName: 'BedtimeStory', description: 'Magical personalized bedtime stories for children (DE)' },
} as const

export type Locale = keyof typeof translations
export const defaultLocale: Locale = 'en'
export const supportedLocales = Object.keys(translations) as Locale[]

export function t(key: keyof typeof translations.en, locale: Locale = defaultLocale): string {
    return translations[locale]?.[key] ?? translations.en[key] ?? key
}

export default translations
