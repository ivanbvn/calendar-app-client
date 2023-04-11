import { createSlice } from '@reduxjs/toolkit'
// import { addHours } from 'date-fns';

// const tempEvent = {
//   _id: new Date().getTime(),
//   title: 'Cumpleaños del jefe',
//   notes: 'Hay que comprar la torta',
//   start: new Date(),
//   end: addHours(new Date(), 2),
//   bgColor: '#fafafa',
//   user: {
//     _id: '123',
//     name: 'Ivan'
//   }
// }

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    isLoadingEvents: true,
    events: [
      // tempEvent
    ],
    activeEvent: null
  },
  reducers: {
    onSetActiveEvent: (state, action) => {
      state.activeEvent = action.payload
    },
    onPullActiveEvent: (state) => {
      state.activeEvent = null
    },
    onAddNewEvent: (state, action) => {
      state.events.push(action.payload)
      state.activeEvent = null
    },
    onUpdateEvent: (state, action) => {
      state.events = state.events.map(event => {
        if (event.id === action.payload.id) return action.payload
        return event
      })
      state.activeEvent = null
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(event => {
          if (event.id !== state.activeEvent.id) return event
        })
      }
      state.activeEvent = null
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false
      // state.events = payload
      payload.forEach(event => {
        const exists = state.events.some(dbEvent => dbEvent.id === event.id)
        if (!exists) {
          state.events.push(event)
        }
      })
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true,
      state.events = [],
      state.activeEvent = null
    }
  }
});

// Action creators are generated for each case redicer function
export const {
  onSetActiveEvent,
  onPullActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar
} = calendarSlice.actions;