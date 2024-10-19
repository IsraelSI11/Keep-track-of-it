import { Route, Routes } from "react-router-dom"
import "./index.css"
import { IndexPage } from "./pages/IndexPage"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"

function App() {

  return (  
    <Routes>
      <Route index path="/" element={<IndexPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}

export default App
