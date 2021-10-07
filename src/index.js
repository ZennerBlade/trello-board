import { StrictMode } from "react";
import App from "./App";
import ReactDOM from "react-dom";
import { GlobalProvider } from "./contexts/GlobalContext";

ReactDOM.render(
  <StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>,
  document.getElementById("root")
);
