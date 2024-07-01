import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/Connexion.css"
import TopImage from "../assets/Con-bot.svg"
import BotImage from "../assets/Con-top.svg"
import { Outlet } from 'react-router-dom';
import Logo from "../assets/logo.svg"

export default function Connexion() {
  return (
    <div className="connexion-page">
      <img className="top-image" src={TopImage} alt="/"/>

      <div className="centered">
        <img
          className='logo'
          src={Logo}
          alt="/"
        />
      </div>
      <Outlet/>

      <img className="bot-image" src={BotImage} alt="/" />
    </div>
  )
}