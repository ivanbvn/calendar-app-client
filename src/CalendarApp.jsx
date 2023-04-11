import { Provider } from "react-redux"
import { BrowserRouter, HashRouter } from "react-router-dom"
import { AppRouter } from "./Router"
import { store } from "./Store"

export const CalendarApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
      {/* <HashRouter> */}
        <AppRouter />
      {/* </HashRouter> */}
      </BrowserRouter>
    </Provider>
  )
}
