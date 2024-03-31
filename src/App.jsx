import { Route, Routes } from "react-router-dom";

import {
  AllPokemon,
  BestAttacks,
  BestSpeed,
  BestEndurance,
  BestDefense,
} from "./components/AllPokemon.jsx";

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

/*
https://github.com/barrett38/Pokedex
*/
