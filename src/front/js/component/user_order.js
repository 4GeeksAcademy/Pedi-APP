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
                    <div className="order_imgbox  mx-3 my-5">
                            <img src= {bk}alt="..." className="home_categoryimg" />
                    </div>

                </div>
                <div className="col-8  py-4">  
                    <div className="row text-center">
                        <div className="col-5 ">
                            <h2>Burger King</h2>
                        </div>
                        <div className="col-5 order_date_box">
                            <p className="order_date">Delivered on 05/05/1999</p>
                        </div>
                    </div>
                    <div className="row order_secondrow">
                        <div className="col-5 order_amount_box ">
                            <p className="order_amount ">2 items for 30$</p>
                            <p className="order_recipt ">- View recipt</p>
                        </div>
                        
                    </div>
                    <div className="row my-3">
                        <ol class="list-group list-group-numbered  order_menu">
                            <li class="list-group-item d-flex justify-content-between align-items-start order_items">
                                <div class="ms-2 me-auto ">
                                <div class="fw-bold">Big mac</div>
                                <small className="order_description">lechuga y cosas</small>
                                </div>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-start order_items">
                                <div class="ms-2 me-auto ">
                                <div class="fw-bold">whooper</div>
                                <small className="order_description">lechuga y cosas</small>
                                </div>
                            </li>
                        </ol>
                        
                    </div>


                </div>
            </div>
            
        </>
    )
}

export default User_order