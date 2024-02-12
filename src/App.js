import "./App.css";
import { Routes, Route } from "react-router-dom";
import Exchanges from "./components/Exchanges";
import Coins from "./components/Coins";
import CoinsDetails from "./components/CoinsDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Exchanges />} />
      <Route path="/coins" element={<Coins />} />
      <Route path="/coins/:id" element={<CoinsDetails />} />
    </Routes>
  );
}

export default App;
