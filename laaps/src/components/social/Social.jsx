import React from 'react'
import { withRouter } from 'react-router-dom'
import Google from '../../utils/google/Google'
import Facebook from '../../utils/facebook/Facebook'
import TopNavbar from '../topnavbar/TopNavbar'

function Social({ history }) {
    
    const signUp = () => {
        history.push("/SignUp");
      };
    return (
        <section className="section background-login">
            <TopNavbar/>
            <div className="buttons is-centered">
            <Google 
            history={history}
            />
            <Facebook 
            history={history}
            />
            </div>
            <div className="has-text-centered">
            <p className="has-text-white">o</p>
            </div>
            <button 
            className="button"
            onClick={signUp}
            >Con tu correo</button>
        </section>
    )
}

export default withRouter(Social);
