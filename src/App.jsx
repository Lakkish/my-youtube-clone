import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Gaming from "./components/Gaming";
import SavedVideos from "./components/SavedVideos";
import Video from "./components/Video";
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
        <Route
          path="/trending"
          element={
            <ProtectedRoute>
              <Trending />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gaming"
          element={
            <ProtectedRoute>
              <Gaming />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-videos"
          element={
            <ProtectedRoute>
              <SavedVideos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/videos/:id"
          element={
            <ProtectedRoute>
              <Video />
            </ProtectedRoute>
          }
        />
      </Routes>
    </NxtWatchProvider>
  );
};

export default App;
