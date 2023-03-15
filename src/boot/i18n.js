import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'

const currencyTranslators = {
  'en-US': new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EGP'
  })
}

const serverTranslate = (item, lang) => {
  if (item && item[lang]) return item[lang]
  else return item
}
const currencyTranslate = (value, lang) =>
  currencyTranslators[lang].format(value)

export default boot(({ app }) => {
  const i18n = createI18n({
    locale: 'en-US',
    globalInjection: true,
    messages
  })

  // Usable in template as $st(item, lang) and $ct(value, lang)
  app.config.globalProperties.$st = serverTranslate
  app.config.globalProperties.$ct = currencyTranslate

  app.use(i18n)
})

export { serverTranslate as st }
