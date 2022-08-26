import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ItemContext } from "./contexts/ItemContext";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ItemContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ItemContext>
    </AuthProvider>
  </React.StrictMode>
);
