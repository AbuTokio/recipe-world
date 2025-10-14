import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import MainProvider from "./context/MainProvider.tsx"
import ThemeProvider from "./context/ThemeProvider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </MainProvider>
  </StrictMode>
)
