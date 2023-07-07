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
                            <a className=" ms-3 order_recipt" data-bs-toggle="modal" data-bs-target="#reciptmodal">View recipt</a>
                                    <div className="modal fade" id="reciptmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                            <div className="modal-header">        
                                            <button type="button" class="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>            
                                                <div className="row align-self-start"> 
                                                    <div className="col"> 
                                                        <p className="text-light ms-2 mt-2">Thanks for ordering with</p> 
                                                    </div>
                                                </div>
                                                <div className="row  w-100 modal_row_header"> 
                                                   <div className="col-8  p-0 "> 
                                                        <h1 className="text-light text-center  "> DishDash</h1>
                                                   </div>
                                                   <div className="col-4 modal_price_col p-0 h-100">
                                                        <p className=" text-light  text-end"> 30$</p>
                                                        <p className=" text-light  text-end my-0"> 05/05/1999</p>
                                                   </div>
                                                </div>
                                                
                                            </div>
                                            <div className="modal-body">
                                            <ul className="ps-5 border">
                                                <li> <h5 className="mt-3">Big mac</h5> </li>
                                                <li> <h5 className="mt-3">whooper</h5> </li>
                                                
                                            </ul>
                                            </div>
                                            <div className="modal-footer border">
                                                <div className="row border"> 
                                                    <p className="modal_price_footer"> Subtotal </p> 
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
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