import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/userFavorites.css";
import bk from "../../img/bk.png"

const User_favorites = () => {
    const { store, actions } = useContext(Context);
    return(
        <>  
            <h1 className="title_acount_user">Your favorites</h1>
            <div className="row border favorites_container">
                <div className="col-4  d-flex">
                    <div className="favorites_imgbox   ">
                            <img src= {bk}alt="..." className="home_categoryimg" />
                    </div>

                </div>
                <div className="col-8  py-4 ps-5 h-100">  
                    <div className="row text-start ">
                        <div className="col ">
                            <h3>Burger King</h3>
                        </div>
                    </div>
    
                    <div className="row text-start mt-2">
                        <div className="col">
                            <p className="favorites_address">Calle Pico Clavero, Numancia, Puente de Vallecas, Madrid, Comunidad de Madrid, 28038, España</p>
                        </div>
                    </div>
                        
                    


                </div>
            </div>
        </>
    )
}

export default User_favorites