import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/companyPageNavbar.css"

export const CompanyPageNavbar = ({ idEmpresa }) => {
    const {store, actions } = useContext(Context)
    const [company, setCompany] = useState()
    const [rating, setRating] = useState({
        puntuacion: 0,
        reseña:"Nada",
        hora: new Date(),
        fecha: new Date()
    });

    useEffect(()=>{
        (async()=>{
            try{
                const response = await fetch(`${process.env.BACKEND_URL}/api/empresa/${idEmpresa}`,{
                    method : "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },

                })
                const result = await response.json()
                console.log(result)
                setCompany(result)
            }catch(error){
                console.log("error")
            }
        })()
    },[])

    const handleRating = async (value) => {
        const newPuntuacion = {
          puntuacion: value,
          idEmpresa: idEmpresa
        };
      
        setRating((prevState) => ({
          ...prevState, //el operador spread(...) nos permite descomponer el objeto y actualizar los datos
          ...newPuntuacion
        }));
      
        console.log("Puntuación agregada:", newPuntuacion.puntuacion);
      
        const newResena = {
          idCliente: store.current_user_data.id || 1,
          idEmpresa: idEmpresa,
          ...newPuntuacion,
          reseña: rating.reseña
        };
      
        try {
          const token = localStorage.getItem('jwt-token');
          const response = await fetch(process.env.BACKEND_URL + "/api/stars/", {
            method: "POST",
            body: JSON.stringify(newResena),
            headers: {
              "Content-Type": "application/json",
              'Authorization': 'Bearer '+token
            }
          });
          if(response.status == 401){
            Swal.fire(result.msg)
            
            navigate("/", { replace: true });
  
          }
          const result = await response.json();
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      };


    return(
        <div className="portada-container">
            <div className="cover-image">
                <div className="card-overlay">
                        <div className="card-body text-card-company-page-navbar">
                            <h1 className="card-title-company-page">{company && company.empresa.nombre}</h1>
                            {/* Esto asegura que las propiedades de idEmpresa solo se accedan si idEmpresa está definido, evitando así errores si idEmpresa es null o undefined. */}
                            <p className="card-text-company-page"></p> {/*Tipo de comida*/}
                            <p className="card-text-company-page-direction">{company && company.usuario.direccion}</p>
                            <form className="rating">
                                <span className={`star${rating.puntuacion >= 1 ? ' filled' : ''}`} onClick={() => handleRating(1)}></span>
                                <span className={`star${rating.puntuacion >= 2 ? ' filled' : ''}`} onClick={() => handleRating(2)}></span>
                                <span className={`star${rating.puntuacion >= 3 ? ' filled' : ''}`} onClick={() => handleRating(3)}></span>
                                <span className={`star${rating.puntuacion >= 4 ? ' filled' : ''}`} onClick={() => handleRating(4)}></span>
                                <span className={`star${rating.puntuacion >= 5 ? ' filled' : ''}`} onClick={() => handleRating(5)}></span>
                            </form>
                        </div>
                </div>
            </div>

        </div>
    )
}