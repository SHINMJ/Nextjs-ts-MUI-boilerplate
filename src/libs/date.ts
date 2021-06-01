import { format as fnsFormat, Locale } from 'date-fns'
import { ko, enUS } from 'date-fns/locale'

type DateType = number | Date

const locales: Record<string, Locale> = { ko, enUS }

// by providing a default string of 'PP' or any of its variants for `formatStr`
// it will format dates in whichever way is appropriate to the locale
export const format = (date: DateType, formatStr = 'PP') => {
  const locale =
    typeof window !== 'undefined'
      ? locales[window.__localeId__]
      : locales[global.__localeId__] // Check browser, server

  return fnsFormat(date, formatStr, {
    locale,
  })
}
