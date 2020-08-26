import React, { useEffect, useCallback, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { auth, app } from '../../utils/firebase/Firebase'
import WithAuthRoute from '../../WithAuthRoute'
import Google from '../../utils/google/Google'
import Facebook from '../../utils/facebook/Facebook'
import '../../assets/styles/Credentials.css'
import TopNavbar from '../topnavbar/TopNavbar'

function SignIn({ history }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (app.auth().currentUser) {
      history.push('/Profile')
    }
  }, [app.auth().currentUser])

  const signIn = useCallback(() => {
    auth
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        setEmail("");
        setPass("");
        setError(null);
        history.push("/Profile")
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setError("El formato del email es incorrecto");
            break;
          case "auth/weak-password":
            setError("La contraseña debe ser de mínimo 6 caracteres");
            break;
          case "auth/email-already-in-use":
            setError("Este email ya esta en uso");
            break;
          case "auth/wrong-password":
            setError(
              "La contraseña es incorrecta o el usuario no tiene password"
            );
            break;
          case "auth/user-not-found":
            setError("Usuario no encontrado");
            break;
          default:
            return;
        }
      });
  }, [email, pass, history]);

    return (
      <section className="section">
        <TopNavbar/>
      <div>
        <div className="has-text-centered">
         <p className="has-text-white">Ingresa a tu servicio</p>
          <Facebook/>
          <Google/>
        </div>
        <div className="has-text-centered">
        <p className="has-text-white">o</p>
        </div>
        <section className="field">
          <div className="file is-small file is-centered">
            <p className="control has-icons-left has-icons-right">
              <input
                id="logEmail"
                name="email"
                className="input is-rounded"
                data-testid="email"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>
            </p>
          </div>
        </section>
        <section className="field file is-small file is-centered">
          <p className="control has-icons-left has-icons-right">
            <input
              id="logPassword"
              className="input is-rounded "
              type="password"
              placeholder="Password"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </section>
        <div className="field file is-centered">
          {error && (
            <p className="has-text-danger is-centered" data-testid="error-msg">
              {error}
            </p>
          )}
        </div>
      </div>
      <div className="field">
        <div className="buttons is-right">
            <button
              id="logIn"
              data-testid="btn-login"
              className="button-laaps button is-medium"
              onClick={signIn}
            >
              Ingresar
            </button>
        </div>
      </div>
    </section>
    )
}

export default withRouter(SignIn)
