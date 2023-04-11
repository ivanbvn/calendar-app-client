import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./UI/uiSlice";
import { calendarSlice } from "./Calendar/calendarSlice";
import { authSlice } from "./Auth/authSlice";

export const store = configureStore({
  reducer: {
    ui:       uiSlice.reducer,
    calendar: calendarSlice.reducer,
    auth:     authSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})