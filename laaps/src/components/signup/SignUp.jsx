import React, { useState, useCallback, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { auth, app, db } from "../../utils/firebase/Firebase";
import TopNavbar from '../topnavbar/TopNavbar'
import WithAuthRoute from '../../WithAuthRoute';
// import "../../assets/styles/Credentials.css";

function SignUp({ history }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   if (app.auth().currentUser) {
  //     history.push('/Profile')
  //   }
  // }, [app.auth().currentUser])

  const signUp = useCallback(async() => {
    try{
     const res = await app.auth().createUserWithEmailAndPassword(email, pass)
        await db.collection('user').doc(res.user.uid).set({
          email: res.user.email,
          name: name,
          uid: res.user.uid,
          credentials: 'client',
        })
        
        setEmail("");
        setPass("");
        setError(null);
        history.push("/Profile");
        // console.log("Entraste");
      } catch (error) {
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
            setError("La contraseña es incorrecta o el usuario no tiene password");
            break;
          case "auth/user-not-found":
            setError("Usuario no encontrado");
            break;
          default:
            return;
      }
   }
  });
  return (
    <section className="section background-login">
      <TopNavbar/>
      <div>
        <div className="has-text-centered">
        <p className="has-text-white">Sólo necesitamos algunos datos antes de comenzar</p>
        </div>
        <div className="field">
          <div className="field file is-small file is-centered ">
            <input
                id="regName"
                name="name"
                className="input is-rounded "
                data-testid="name"
                type="name"
                placeholder="Nombre"
                onChange={(e) => setName(e.target.value)}
              />
              </div>
              <div className="field file is-small file is-centered ">
            <p className="control has-icons-left has-icons-right ">
              <input
                id="regEmail"
                name="email"
                className="input is-rounded "
                data-testid="email"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <span className="icon is-small is-left ">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>
            </p>
          </div>
        </div>
        <div className="field file is-small file is-centered">
          <p className="control has-icons-left has-icons-right">
            <input
              id="regPassword"
              data-testid="pass"
              className="input is-rounded"
              type="password"
              placeholder="Password"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div className="field file is-centered">
          {error && (
            <p className="has-text-danger is-centered" data-testid="error-msg">
              {error}
            </p>
          )}
          <p className="has-text-danger is-centered" id="errMsg"></p>
        </div>
      </div>
      <div className="field">
        <div className="buttons is-right">
            <button
              id="register"
              data-testid="btn-register"
              className="button-laaps button is-medium"
              onClick={signUp}
            >  
            <span>Listo</span>
              <span className="icon is-small is-left">
            <i className="fas fa-check"></i>
            </span>
            
            </button>
        </div>
      </div>
    </section>
  );
}
export default withRouter(SignUp);