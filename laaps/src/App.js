import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import { auth, db } from "./utils/firebase/Firebase";
import WithAuthRoute from "./WithAuthRoute";
import useDataFetch from "./hooks/useDataFetch";
import Landing from "./components/landing/Landing";
import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signup/SignUp";
import Profile from "./components/profile/Profile";
import Social from "./components/social/Social";

function App({ history }) {
  const [firebaseUser, setFirebaseUser] = useState(false);
  const [name, setName] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setFirebaseUser(user);
        console.log(firebaseUser);
        console.log(firebaseUser);
      } else {
        setFirebaseUser(null);
      }
    });
    const getData = async () => {
      try {
        const current = auth.currentUser;
        if (!current) return;
        const uid = current.uid;
        console.log("yo merengues", uid);
        const data = await db.collection("user").doc(uid).get();
        console.log(data);
        const arrayData = { user: data.user, ...data.data() };
        setName(arrayData);
        console.log(arrayData);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return firebaseUser != false ? (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route path="/Social">
          <Social
          history
          />
        </Route>
        <Route path="/SignIn">
          <SignIn />
        </Route>
        <Route path="/Signup">
          <SignUp />
        </Route>
        <Route path="/Profile">
          <Profile name={name} firebaseUser={firebaseUser} />
        </Route>
      </Switch>
    </Router>
  ) : (
    <p>Cargando...</p>
  );
}

export default App;
