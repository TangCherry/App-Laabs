import React, { useEffect, useState } from 'react';
import { auth, db } from "./utils/firebase/Firebase";
import { withRouter } from "react-router-dom";

function WithAuthRoute ({ history }) {
const [user, setUser] = useState(null);

useEffect(() => {
  if (auth.currentUser) {
    console.log("vive");
    setUser(auth.currentUser);
    // history.push("/Profile");
  } else {
    console.log("no vive");
    history.push("/");
  }
}, []);
return (
    <div>
    </div>
)
}
export default  withRouter(WithAuthRoute);