import { Route, Routes } from "react-router-dom";
// import Signup from "./components/Login/Signup.jsx";
import ProfileEntry from "./components/Login/ProfileEntry.jsx";

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
      <Route path="/BestDefense" element={<BestDefense />} />
      {/* Working */}
      <Route path="/LogIn" element={<ProfileEntry />} />{" "}
    </Routes>
  );
}

/*
https://github.com/barrett38/Pokedex
*/
