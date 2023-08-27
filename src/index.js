import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { BrowserRouter } from "react-router-dom";
import { StepsProvider } from "./Context/StateContext";

const activeChainId = ChainId.Sepolia;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ThirdwebProvider activeChain={activeChainId}>
      <StepsProvider>
      <App />
      </StepsProvider>
    </ThirdwebProvider>
    </BrowserRouter>
  </React.StrictMode>
);


