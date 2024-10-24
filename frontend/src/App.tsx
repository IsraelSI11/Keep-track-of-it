import { Route, Routes } from "react-router-dom"
import "./index.css"
import { IndexPage } from "./pages/IndexPage"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import { HomePage } from "./pages/HomePage"
import { LoggedInLayout } from "./layouts/LoggedInLayout"
import { DashboardPage } from "./pages/DashboardPage"
import { AddCostPage } from "./pages/AddCostPage"

function App() {

  return (  
    <Routes>
      <Route index path="/" element={<IndexPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<LoggedInLayout><HomePage /></LoggedInLayout>} />
      <Route path="/dashboard" element={<LoggedInLayout><DashboardPage /></LoggedInLayout>} />
      <Route path="/add" element={<LoggedInLayout><AddCostPage /></LoggedInLayout>} />
    </Routes>
  )
}

export default App
