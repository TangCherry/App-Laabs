import React from "react";
import { withRouter } from 'react-router-dom'
import TopNavbar from "../topnavbar/TopNavbar";
import men from "../../assets/images/men.png";
import "../../assets/styles/Credentials.css";

function Landing({ history }) {

  const social = () => {
    history.push("/Social");
  };
  const signIn = () => {
    history.push("/SignIn");
  };

  return (
      <section>
    <section className="background-landing">
      <TopNavbar />
      <div>
        <p className="slogan">Limpieza en tu auto y en tu agenda</p>
      </div>
      <div className="buttons is-right">
        <button 
        className="button button-subscribe"
        onClick={() => social()}
        >Suscríbete</button>
        <a
        className="link has-text-white"
        onClick={() => signIn()}>O Ingresa</a>
      </div>
    </section>
    <div className="men-landing">
          <img 
          src={men} 
          />
      </div>
    </section>
  );
}

export default withRouter(Landing);
