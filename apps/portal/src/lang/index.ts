import i18n from 'i18next'
import {
  initReactI18next,
} from 'react-i18next'

import enResources from './en'
import cnResources from './cn'

const resources = {
  en: enResources,
  cn: cnResources,
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
