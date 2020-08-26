import React, { useEffect, useCallback, useState } from "react";
import { withRouter } from "react-router-dom";
import { db, auth, app, storage } from "../../utils/firebase/Firebase";
import Swal from "sweetalert2";
import TopNavbar from "../topnavbar/TopNavbar";
import WithAuthRoute from "../../WithAuthRoute";
import useDataFetch from "../../hooks/useDataFetch";
import "../../assets/styles/profile.css";
import card from "../../assets/images/card.svg";

function Profile({ history }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  // const [cardNumber, setCardNumber] = useState("");
  // const [dueDate, setDueDate] = useState("");
  //   const [cvv, setCvv] = useState("");

  const profileInfo = async () => {
    const uid = app.auth().currentUser.uid;
    await db.collection("user").doc(uid).update({
      phone: phone,
      // paymentMethod: paymentMethod,
    });
    console.log("Guardao", profileInfo);
  };
  const editProfPic = async (editPhoto) => {
    const userUid = app.auth().currentUser.uid;
    const imageRef = await storage.ref().child(userUid).child("Foto perfil");
    await imageRef.put(editPhoto);
    const imgURL = await imageRef.getDownloadURL();
    await db.collection("user").doc(userUid).update({
      photo: imgURL,
    });
    // console.log("foto", imgURL);
  };
  const selectPhoto = (e) => {
    const imageSRC = e.target.files[0];
    console.log("imagen perfil", e.target.files[0]);
    editProfPic(imageSRC);
  };
  const { getProfileData } = useDataFetch();
  getProfileData().then((profileData) => {
    setName(profileData.name);
  });

  const logOut = () => {
    auth.signOut().then(() => {
      history.push("/");
    });
  };

  // const paymentMethod = async () => {
  //   (async () => {

  //     const { value: formValues } = await Swal.fire({
  //       title: 'Ingresa tu tarjeta',
  //       html:
  //         '<input id="cardNumber" class="swal2-input" placeholder="Número de tarjeta">' +
  //         '<input id="dueDate" class="swal2-input" placeholder="Fecha de vencimiento">' +
  //           '<input id="cvv" class="swal2-input" placeholder="cvv">',
  //       focusConfirm: false,
  //       preConfirm: () => {
  //         return [
  //           setCardNumber('cardNumber').value,
  //           setDueDate('dueDate').value,
  //           setCvv('cvv').value
  //         ]
  //       }
  //     })
      
  //     if (formValues) {
  //       Swal.fire({
  //       position: 'top-end',
  //       icon: 'success',
  //       title: 'Datos guardados',
  //       showConfirmButton: false,
  //       timer: 1500
  //     })
  //     }
      
  //     })()
  // }

  return (
    <section className="section">
      <WithAuthRoute />
      <TopNavbar />
      <div className="control">
        <div className="file is-centered">
          <p className="has-text-white">{name}</p>
        </div>
        <div className="control">
          <div className="file is-centered">
            <figure className="image is-96x96">
              <img
                id="showImg"
                className="is-rounded"
                src="https://i.ibb.co/F77rJHx/hombre2.jpg"
              />
            </figure>
          </div>
          <div className="file is-centered is-small radius">
            <label className="file-label">
              <input
                id="profilePicture"
                className="file-input "
                type="file"
                accept="image/x-png,image/gif,image/jpeg"
                name="profile"
                onChange={(e) => selectPhoto(e)}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label" htmlFor="profilePicture">
                  Editar foto de perfil
                </span>
              </span>
            </label>
          </div>
          <div className="file is-centered">
            <a
              id="logout"
              className="material-icons has-text-white"
              onClick={() => logOut()}
            >
              Cerrar Sesión{" "}
            </a>
          </div>
          <div className="has-text-centered has-text-black title is-6">
            <div>
            </div>
            <div className="field"></div>
            <p>¿Cuál es tu medio preferido de pago?</p>
            <button
              className="button is-primary is-inverted is-outlined no-border"
              // onClick={() => paymentMethod()}
            >
              <span className="icon is-medium">
                <img className="card-icon" src={card} />
              </span>
              <span> REGISTRAR TARJETA </span>
            </button>
            <div className="field">
              <div className="file is-centered">
                <div className="control">
                  <p>Teléfono</p>
                  <input
                    id="phone"
                    className="input is-rounded"
                    type=""
                    placeholder="55-1234-5678"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <button
                    id="confirm"
                    className="button-laaps button is-medium"
                    onClick={() => profileInfo()}
                  >
                    Guardar perfil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default withRouter(Profile);
