import logo from "./logo.svg";
import "./App.css";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

function App() {
  return (
    <div className="App">
      <ConnectWallet
        accentColor="#f213a4"
        colorMode="dark"
        width={{ base: "150px", md: "unset" }}
        style={{ background: "black", color: "white" }}
      />
    </div>
  );
}

export default App;
