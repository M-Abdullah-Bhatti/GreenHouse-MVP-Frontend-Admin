

import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Shared/Header";

function App() {
  return (
    <div className="App">
      <Header />     
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
