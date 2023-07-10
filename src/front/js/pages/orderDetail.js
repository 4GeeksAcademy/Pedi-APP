import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/orderDetail.css";
import bk from "../../img/bk.png"

const OrderDetail = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  

  return (
    <><form>
    
      <div className="container-fluid text-center  order_page_container p-5 ">
        <div className="row order_all p-5">
          <div className="col-5 order_left_col px-4 pb-4 me-4">
            <div className="row left_first_row py-4 ">
                <div className="col-2 order_img_box "> <img src={bk} alt="..." className="order_img " /></div>
                <div className="col-5 order_company_name  "> <h2>Burger King</h2> </div>
                <div className="col-5 d-flex ">
                  <div className="order_btn_box ">
                    <input type="radio" className="btn-check order_btn " name="options" id="option1" autoComplete="off" checked/>
                    <label className="btn  order_btn " htmlFor="option1">Delivery</label>

                    <input type="radio" className="btn-check order_btn" name="options" id="option2" autoComplete="off"/>
                    <label className="btn  order_btn text-nowrap" htmlFor="option2">Take away</label>
                  </div>
                </div>
            </div>
            <div className="row left_second_row pt-1 ">
                <div className="col order_delidet_box  "> 
                  <h3>Delivery details</h3>
                </div>
                <div className="col order_delidet_box  "> 
                  <i className="fas fa-map-marker-alt fa-lg order_icon"></i>
                  <p className="order_adress fs-6">763, Collegue Street</p>
                </div>
                <div className="col order_instructions_box d-flex mt-2  ">  
                  <p className="order_adress fs-6">instrucciones de la direccion</p>
                </div>
            </div>
            <div className="row left_second_row  ">
                <div className="col order_delidet_box  "> 
                  <h3>Delivery estimate</h3>
                </div>
                  <div className="col order_delidet_box  "> 
                    <i className="fas fa-bicycle fa-lg order_icon"></i>
                    <div className=" ">
                      <p className="order_adress fs-5 ">Standard</p>
                      <p className="order_adress  text-secondary fs-6 ">10-20min</p>
                    </div>
                  </div>
                  <div className="col order_instructions_box d-flex mt-2  ">  
                      <i className="fas fa-calendar-alt fa-lg order_icon"></i>
                      <div className="  ">
                        <p className="order_adress fs-5 ">Scheduled</p>
                        <p className="order_adress  text-secondary fs-6 ">Select a time</p>
                      </div>
                  </div>  
            </div>
            <div className="row left_second_row  ">
                <div className="col order_delidet_box  "> 
                  <h3>Payment</h3>
                </div>
                  <div className="col order_delidet_box  "> 
                    <i className="far fa-credit-card fa-lg order_icon"></i>
                    <p className="order_adress fs-5 ">Credit Card</p>
                  </div>
                  <div className="col order_delidet_box  "> 
                    <i className="fas fa-coins fa-lg order_icon"></i>
                    <p className="order_adress fs-5 ">Cash</p>
                  </div>
                  
                  
            </div>
          </div>
          <div className="col-5 order_right_col px-4 pb-4">
              <div className="row right_first_row py-4 ">
                <h3 className=" text-start">Order summary</h3> 
              </div>
              <div className="row right_second_row py-4 pt-1">
                <div className="col-7 order_detail_box border">
                  <div className=" d-flex border w-100">
                    <p className="order_product fs-5">Whooper  </p> 
                    <p className="order_quant fs-5 text-secondary border ">Whooper  </p> 
                  </div>
                  <p className="order_adress text-secondary fs-6 ">Size: Medium</p>
                  <p className="order_adress text-secondary fs-6 ">Side: French fries</p>
                  <p className="order_adress text-secondary fs-6 ">Drink: Coca cola</p>
                </div>
                <div className="col-4">
                  
                </div>
              </div>

          </div>
          
        </div>
      </div>
    </form></>
    
  );
};

export default OrderDetail;