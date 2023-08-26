

import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Shared/Header";
import Settings from "./Pages/Settings";

function App() {
  return (
    <div className="App">
      <Header />     
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
      </Routes>
    </div>
  );
}

export default App;
