import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { RootAppProvider } from "./context/root.context.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootAppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RootAppProvider>
  </StrictMode>
);
