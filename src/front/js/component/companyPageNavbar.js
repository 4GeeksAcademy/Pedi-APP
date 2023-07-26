import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/companyPageNavbar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CompanyPageNavbar = ({ idEmpresa }) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [company, setCompany] = useState();
  const [rating, setRating] = useState({
    puntuacion: 0,
    reseña: "Nada",
    hora: new Date(),
    fecha: new Date(),
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${process.env.BACKEND_URL}/api/empresa/${idEmpresa}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();

        setCompany(result);
      } catch (error) {
        console.log("error");
      }
    })();
  }, [company]);

  const handleRating = async (value) => {
    const newPuntuacion = {
      puntuacion: value,
      idEmpresa: idEmpresa,
    };

    setRating((prevState) => ({
      ...prevState, //el operador spread(...) nos permite descomponer el objeto y actualizar los datos
      ...newPuntuacion,
    }));

    // console.log("Puntuación agregada:", newPuntuacion.puntuacion);

    const newResena = {
      idCliente: store.current_user_data.id,
      idEmpresa: idEmpresa,
      ...newPuntuacion,
      reseña: rating.reseña,
    };

    try {
      const token = localStorage.getItem("jwt-token");
      if (token == null) {
        toast.error("Must be logged!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        const response = await fetch(process.env.BACKEND_URL + "/api/stars/", {
          method: "POST",
          body: JSON.stringify(newResena),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        const result = await response.json();
        if (response.status == 401) {
          toast.error(result.msg, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else if (response.status == 200) {
          toast.success("You have valued successfully, thank you!", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          console.log(result);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="portada-container">
      <div
        className="cover-image"
        style={{
          backgroundImage: `url(${
            company && company.empresa && company.empresa.banner
          })`,
        }}
      >
        <div className="card-overlay">
          <div className="card-body text-card-company-page-navbar">
            <h1 className="card-title-company-page">
              {company && company.empresa && company.empresa.nombre}
            </h1>
            {/* Esto asegura que las propiedades de idEmpresa solo se accedan si idEmpresa está definido, evitando así errores si idEmpresa es null o undefined. */}
            <p className="card-text-company-page"></p> {/*Tipo de comida*/}
            <p className="card-text-company-page-direction">
              {company && company.usuario && company.usuario.direccion}
            </p>
            <form className="rating">
              <span
                className={`star${rating.puntuacion >= 1 ? " filled" : ""}`}
                onClick={() => handleRating(1)}
              ></span>
              <span
                className={`star${rating.puntuacion >= 2 ? " filled" : ""}`}
                onClick={() => handleRating(2)}
              ></span>
              <span
                className={`star${rating.puntuacion >= 3 ? " filled" : ""}`}
                onClick={() => handleRating(3)}
              ></span>
              <span
                className={`star${rating.puntuacion >= 4 ? " filled" : ""}`}
                onClick={() => handleRating(4)}
              ></span>
              <span
                className={`star${rating.puntuacion >= 5 ? " filled" : ""}`}
                onClick={() => handleRating(5)}
              ></span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
