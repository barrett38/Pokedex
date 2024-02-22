import { Route, Routes } from "react-router-dom";

import { AllPokemon, BestAttacks } from "./components/AllPokemon.jsx";
// import BestAttacks from "./components/BestAttacks.jsx";
import BestSpeed from "./components/BestSpeed.jsx";
import BestEndurance from "./components/BestEndurance.jsx";
import BestDefense from "./components/BestDefense.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AllPokemon />} />
      <Route path="/BestAttacks" element={<BestAttacks />} />
      <Route path="/BestSpeed" element={<BestSpeed />} />
      <Route path="/BestEndurance" element={<BestEndurance />} />
      <Route path="/BestDefense" element={<BestDefense />} />{" "}
    </Routes>
  );
}
