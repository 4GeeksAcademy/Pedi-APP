import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/userFavorites.css";
import bk from "../../img/bk.png"

const User_favorites = (props) => {
    const { store, actions } = useContext(Context);
    const {company} = props 
    console.log(company)
    return(
        <>  
            
            <div className="row border favorites_container">
                <div className="col-4  d-flex">
                    <div className="favorites_imgbox   ">
                            <img src= {company.imagen}alt="..." className="home_categoryimg" />
                    </div>

                </div>
                <div className="col-8  py-4 ps-5 h-100">  
                    <div className="row text-start ">
                        <div className="col ">
                            <h3>{company.nombre}</h3>
                        </div>
                    </div>
    
                    <div className="row text-start mt-2">
                        <div className="col">
                            <p className="favorites_address">{company.direccion}</p>
                        </div>
                    </div>
                        
                    


                </div>
            </div>
        </>
    )
}

export default User_favorites