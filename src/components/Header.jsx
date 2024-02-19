import PokeballPic from "../assets/PokeballPic.jpg";
import attackIcon from "../assets/attackIcon.png";
import speedIcon from "../assets/speedIcon.png";
import enduranceIcon from "../assets/enduranceIcon.png";

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={PokeballPic} alt="Pokeball" />
        <img src={attackIcon} alt="Attack" />
        <img src={speedIcon} alt="Speed" />
        <img src={enduranceIcon} alt="Endurance" />
      </div>
    </header>
  );
}
