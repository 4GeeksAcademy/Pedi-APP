import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/userOrder.css";
import bk from "../../img/bk.png"

const User_order = () =>{
    const {store,actions} = useContext(Context)
    return(
        <>
            <div className="row border order_container">
                <div className="col-4">
                    <div className="order_imgbox border mx-3 my-5">
                            <img src= {bk}alt="..." className="home_categoryimg" />
                    </div>

                </div>
                <div className="col-8 border py-4">  
                    <div className="row">
                        <div className="col-6">
                            <h2>Burger King</h2>
                        </div>
                        <div className="col-6">

                        </div>
                    </div>


                </div>
            </div>
            
        </>
    )
}

export default User_order