import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { BrowserRouter } from "react-router-dom";

const activeChainId = ChainId.Sepolia;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ThirdwebProvider activeChain={activeChainId}>
      <App />
    </ThirdwebProvider>
    </BrowserRouter>
  </React.StrictMode>
);


