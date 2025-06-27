import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Login from "./components/Login";
import { NxtWatchProvider } from "./context/NxtWatchContext.jsx";
import "./App.css";

const App = () => {
  return (
    <NxtWatchProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </NxtWatchProvider>
  );
};

export default App;
