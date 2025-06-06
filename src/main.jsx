import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./components/dashboard.jsx";
import { GeneratePage, FavoriteQuote } from "./components/pajes.jsx";
const theme = createTheme({
  autoContrast: true,
    shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },
  defaultGradient: {
    from: 'orange',
    to: 'blue',
    deg: 90,
  },
  defaultRadius:'sm'
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/dashboard" element={<DashBoard />}>
            <Route path="generate" element={<GeneratePage />} />
            <Route path="favorite" element={<FavoriteQuote />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
);
