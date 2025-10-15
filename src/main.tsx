import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import MainProvider from "./context/MainProvider.tsx"
import ThemeProvider from "./context/ThemeProvider.tsx"
import UserProvider from "./context/UserProvider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainProvider>
      <ThemeProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ThemeProvider>
    </MainProvider>
  </StrictMode>
)
