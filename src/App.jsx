import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import { NxtWatchProvider } from "./context/NxtWatchContext";
import "./App.css";

const App = () => {
  return (
    <NxtWatchProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </NxtWatchProvider>
  );
};

export default App;
