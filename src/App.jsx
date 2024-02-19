import Header from "./components/Header.jsx";
import GetStrongPokemon from "./components/GetStrongPokemon.jsx";
import GetAllPokemon from "./components/GetAllPokemon.jsx";
import GetHighHPPokemon from "./components/GetHighHPPokemon.jsx";
import GetFastPokemon from "./components/GetFastPokemon.jsx";
import GetDefensivePokemon from "./components/GetDefensivePokemon.jsx";

export default function App() {
  return (
    <>
      <Header />
      <GetStrongPokemon />
      <GetDefensivePokemon />
      <GetFastPokemon />
      <GetAllPokemon />
      <GetHighHPPokemon />
    </>
  );
}
