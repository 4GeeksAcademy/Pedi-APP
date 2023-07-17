import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/userOrder.css";
import bk from "../../img/bk.png"

const Company_order = (props) =>{
    const {store,actions} = useContext(Context)
    const {date, bill_id,user,company_img,time} = props 
    const [order, setOrder] = useState([])
    useEffect( () =>{
        
        (async () => {
            
            
            try {
                const response = await fetch(process.env.BACKEND_URL + "/api/history", { 
                    method : "POST",
                    body: JSON.stringify({id : bill_id}),
                    headers: { 
                        "Content-Type": "application/json",
                        } 
                    
                    
                })
                const result = await response.json()
                console.log(result)
                setOrder(result.history)
                
                

            }catch(error){
                console.log("Error loading message from backend")
            }
        })()
        
    }, []);
    
    let amount = 0;
    let price = 0
        for (let i of order){
            amount+= i.detail.cantidad
            price += i.detail.precioActual
        }
    

    
    return(
        <>
            {order && (
                <div className="row border order_container">
                    <div className="col-4">
                        <div className="order_imgbox  mx-3 my-5">
                                <img src= {company_img}alt="..." className="home_categoryimg rounded" />
                        </div>

                    </div>
                    <div className="col-8  py-4">  
                        <div className="row text-center">
                            <div className="col-6 order_title_box ">
                                <h2 className="order_title">{user}</h2>
                            </div>
                            <div className="col-5 order_date_box">
                                <p className="order_date">Ordered on {date}</p>
                            </div>
                        </div>
                        <div className="row order_secondrow">
                            <div className="col-5 order_amount_box ">
                                <p className="order_amount s">{amount? `${amount} items for ${price*1.2}$` : ""}</p>
                                <a className=" ms-3 order_recipt" data-bs-toggle="modal" data-bs-target={`#reciptmodal${bill_id}`}>View recipt</a>
                                        <div className="modal fade" id={`reciptmodal${bill_id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                <div className="modal-header">        
                                                <button type="button" className="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>            
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
                                                            <p className=" text-light  text-end"> {price? `${price *1.2}$` : ""}</p>
                                                            <p className=" text-light  text-end my-0"> {date} at {time}</p>
                                                    </div>
                                                    </div>
                                                    
                                                </div>
                                                <div className="modal-body">
                                                <ul className="  modal_ul_box">
                                                    { order.map((x,index) =>{
                                                        console.log(x.product.nombre)
                                                        return (<li key={index} className="d-flex ms-3 "> <h5 className="mt-3"> {`${x.product.nombre} x${x.detail.cantidad}`}</h5> <p className="modal_subtotal_body mt-3 me-3 ms-auto">{x.detail.precioActual}$</p> </li>)
                                                    })}
                                                </ul>
                                                </div>
                                                <div className="modal-footer ">
                                                    <div className="row  modal_footer_row"> 
                                                        <div className="col-6 d-flex ps-0">
                                                            <p className="modal_price_footer ms-3"> Subtotal </p> 
                                                        </div>
                                                        <div className="col-6 d-flex pe-0">
                                                            <p className="modal_subtotal_footer  me-3 ms-auto"> {price? `${price}$` : ""}</p>  
                                                        </div>                                                 
                                                    </div>
                                                    <div className="row  modal_footer_row"> 
                                                        <div className="col-6 d-flex ps-0">
                                                            <p className="modal_price_footer ms-3"> IVA </p> 
                                                        </div>
                                                        <div className="col-6 d-flex pe-0">
                                                            <p className="modal_subtotal_footer  me-3 ms-auto"> {price? `${price*0.2}$` : ""}</p>   
                                                        </div>                                                 
                                                    </div>
                                                    <div className="row  modal_footer_row "> 
                                                        <div className="col-6 d-flex ps-0">
                                                            <h4 className="modal_total_footer ms-3"> Total </h4> 
                                                        </div>
                                                        <div className="col-6 d-flex pe-0">
                                                            <h4 className="modal_total_footer  me-3 ms-auto"> {price? `${price *1.2}$` : ""}</h4>   
                                                        </div>                                                 
                                                    </div>
                                                
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                            </div>
                            
                        </div>
                        <div className="row my-3">
                            <ol className="list-group list-group-numbered  order_menu">

                                {order.map((x,index) =>{
                                            
                                                return (
                                                    <li className="list-group-item d-flex justify-content-between align-items-start order_items" key ={index}>
                                                        <div className="ms-2 me-auto ">
                                                        <div className="fw-bold">{x.product.nombre}</div>
                                                        <small className="order_description">{x.product.descripcion}</small>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                
                                
                            </ol>
                            
                        </div>


                    </div>
                </div>
            )}    
        </>
    )
}

export default Company_order