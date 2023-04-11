
import { getDay, startOfWeek, parse, format } from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import enES from 'date-fns/locale/es'
import { dateFnsLocalizer } from 'react-big-calendar'

const locales = {
  'es': enES,
}

export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })