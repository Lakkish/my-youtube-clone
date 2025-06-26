import { NxtWatchProvider } from "./context/NxtWatchContext";
import "./App.css";

const App = () => {
  return (
    <NxtWatchProvider>
      <h1>Vite + React</h1>
    </NxtWatchProvider>
  );
};

export default App;
