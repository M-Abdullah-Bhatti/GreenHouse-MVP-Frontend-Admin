

import { Route, Routes } from "react-router-dom";
import Reports from "./Pages/Reports";
import Header from "./Components/Shared/Header";
import Settings from "./Pages/Settings";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Reports />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
      </Routes>
    </div>
  );
}

export default App;
