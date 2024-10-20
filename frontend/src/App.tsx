import { Route, Routes } from "react-router-dom"
import "./index.css"
import { IndexPage } from "./pages/IndexPage"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import { HomePage } from "./pages/HomePage"

function App() {

  return (  
    <Routes>
      <Route index path="/" element={<IndexPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  )
}

export default App
