import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ThemeState from "./context/theme/ThemeState";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeState>
      <App />
    </ThemeState>
  </StrictMode>
);
