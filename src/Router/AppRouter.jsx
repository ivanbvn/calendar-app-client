import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../Auth"
import { CalendarPage } from "../Calendar"
import { useAuthStore } from "../Hooks"

export const AppRouter = () => {

  const {status, checkAuthToken} = useAuthStore()
  
  useEffect(() => {
    checkAuthToken()
  }, [])
  
  if(status === 'Checking') {
    return (
      <h3>Cargando...</h3>
    )
  }

  return (
    <Routes>
      {
        (status === 'Not-authenticated')
          ? (
              <>
                <Route path="/auth/*" element={<LoginPage />} />
                <Route path="/*" element={<Navigate to="/auth/login" />} />
              </>
            )
          : (
              <>
                <Route path="/" element={<CalendarPage />} />
                <Route path="/*" element={<Navigate to='/'/>}/>
              </>
            )
      }
    </Routes>
  )
}
