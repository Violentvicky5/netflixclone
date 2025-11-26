import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { PlanProvider } from "./context/PlanContext.jsx";
import {EmailProvider} from "./context/EmailContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PlanProvider>
<EmailProvider>
      <App />
      </EmailProvider>
    </PlanProvider>
  </StrictMode>
);
