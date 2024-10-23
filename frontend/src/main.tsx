import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/authContext/index.tsx'
import RootLayout from './layouts/RootLayout.tsx'
import store from './redux/store.ts'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RootLayout>
        <AuthProvider>
          <BrowserRouter>

            <App />

          </BrowserRouter>
        </AuthProvider>
      </RootLayout>
    </Provider>

  </StrictMode >,
)
