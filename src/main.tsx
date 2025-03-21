import React from "react";
import ReactDOM from "react-dom/client"; // Usa createRoot desde react-dom/client
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import theme from "./styles/theme"; // Asegúrate de que este archivo exista
import "./styles/global.scss";

// Obtén el elemento root en el DOM
const rootElement = document.getElementById("root");

// Crea el root con createRoot
const root = ReactDOM.createRoot(rootElement!);

// Renderiza la aplicación
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
