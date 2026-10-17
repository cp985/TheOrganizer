import 'server-only'

const dictionaries = {
  it: () => import('@/dictionaries/it.json').then((module) => module.default),
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
}

export type Locale = keyof typeof dictionaries

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]?.() ?? dictionaries.it()
}