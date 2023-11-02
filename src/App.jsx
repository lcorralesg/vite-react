import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import ProtectedRoute from "./ProtectedRoute"
import { UsersProvider } from "./context/UsersContext"

function App() {
  return (
    <UsersProvider>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
            <Route element={ <ProtectedRoute /> }>
              <Route path="/" element={ <HomePage /> } />
            </Route>
          <Route path="/register" element={ <RegisterPage /> } />
          <Route path="/login" element={ <LoginPage /> } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </UsersProvider>
  )
}

export default App