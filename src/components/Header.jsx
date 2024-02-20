import PokeballPic from "../assets/PokeballPic.jpg";
import attackIcon from "../assets/attackIcon.png";
import speedIcon from "../assets/speedIcon.png";
import enduranceIcon from "../assets/enduranceIcon.png";
import pokedex from "../assets/pokedex.png";
import GetHighHPPokemon from "./GetHighHPPokemon";

export default function Header() {
  const handlePokeballClick = () => {
    window.location.href = "./GetAllPokemon";
  };

  const handleAttackIconClick = () => {
    window.location.href = "./GetHighHPPokemon";
  };

  const handleSpeedIconClick = () => {
    window.location.href = "./GetAllPokemon";
  };

  const handleEnduranceIconClick = () => {
    window.location.href = "./GetAllPokemon";
  };

  const handlePokedexClick = () => {
    window.location.href = "./GetAllPokemon";
  };

  return (
    <header id="main-header">
      <div id="title">
        <img src={PokeballPic} alt="Pokeball" onClick={handlePokeballClick} />
        <img src={attackIcon} alt="Attack" onClick={handleAttackIconClick} />
        <img src={speedIcon} alt="Speed" onClick={handleSpeedIconClick} />
        <img
          src={enduranceIcon}
          alt="Endurance"
          onClick={handleEnduranceIconClick}
        />
        <img
          src={pokedex}
          alt="Ash's First Pokemon"
          onClick={handlePokedexClick}
        />
      </div>
    </header>
  );
}
