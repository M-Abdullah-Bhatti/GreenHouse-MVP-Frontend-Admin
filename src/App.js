

import { Route, Routes } from "react-router-dom";
import Reports from "./Pages/Reports";
import Header from "./Components/Shared/Header";
import Settings from "./Pages/Settings";
import { useStepsContext } from "./Context/StateContext";
import Login from "./Components/Shared/Login";

function App() {
  const {openLoginModal}  = useStepsContext()
  return (
    <div className="App">
      <Header />
      {openLoginModal && <Login />}
      <Routes>
        <Route path="/" element={<Reports />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
      </Routes>
    </div>
  );
}

export default App;
