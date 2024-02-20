import PokeballPic from "../assets/PokeballPic.jpg";
import attackIcon from "../assets/attackIcon.png";
import speedIcon from "../assets/speedIcon.png";
import enduranceIcon from "../assets/enduranceIcon.png";
import pokedex from "../assets/pokedex.png";

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={PokeballPic} alt="Pokeball" />
        {/* All Pokemon */}
        <img src={attackIcon} alt="Attack" />
        {/* Attack over 100 */}
        <img src={speedIcon} alt="Speed" />
        {/* Speed over 100 */}
        <img src={enduranceIcon} alt="Endurance" />
        {/* HP over 100 */}
        <img src={pokedex} alt="Ash's First Pokemon" />
      </div>
    </header>
  );
}
