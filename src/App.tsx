import { Route, Routes } from "react-router-dom"
import "./index.css"
import { IndexPage } from "./pages/IndexPage"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import { LoggedInLayout } from "./layouts/LoggedInLayout"
import { DashboardPage } from "./pages/DashboardPage"
import { AddCostPage } from "./pages/AddCostPage"
import { HistoryPage } from "./pages/HistoryPage"

function App() {

  return (  
    <Routes>
      <Route index path="/" element={<IndexPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<LoggedInLayout><DashboardPage /></LoggedInLayout>} />
      <Route path="/add" element={<LoggedInLayout><AddCostPage /></LoggedInLayout>} />
      <Route path="/history" element={<LoggedInLayout><HistoryPage /></LoggedInLayout>} />
    </Routes>
  )
}

export default App
