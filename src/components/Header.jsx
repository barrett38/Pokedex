import PokeballPic from "../assets/PokeballPic.jpg";
import attackIcon from "../assets/attackIcon.png";
import speedIcon from "../assets/speedIcon.png";
import enduranceIcon from "../assets/enduranceIcon.png";
import shieldIcon from "../assets/shieldIcon.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <Link to="/">
          <img src={PokeballPic} alt="Pokeball" />
        </Link>
        <Link to="/BestAttacks">
          <img src={attackIcon} alt="Attack" />
        </Link>
        <Link to="/BestSpeed">
          <img src={speedIcon} alt="Speed" />
        </Link>
        <Link to="/BestEndurance">
          <img src={enduranceIcon} alt="Endurance" />
        </Link>
        <Link to="/BestDefense">
          <img src={shieldIcon} alt="Defense" />
        </Link>
      </div>
    </header>
  );
}
