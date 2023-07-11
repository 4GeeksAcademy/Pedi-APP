import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/infoCompany.css";

export const InfoCompany = () =>{
    const { store, actions } = useContext(Context);

    const timetable = () =>{
        console.log(store.current_user_data) 
        if (store.current_user_data.mañana == true && store.current_user_data.tarde == false) return "Morning"
        else if (store.current_user_data.mañana == false && store.current_user_data.tarde == true) return "Afternoon"
        else if (store.current_user_data.mañana == true && store.current_user_data.tarde == true) return "Morning and Afternoon"
        else return ""
    }

    const services = () =>{
        console.log(store.current_user_data) 
        if (store.current_user_data.delivery == true && store.current_user_data.reserva == false) return "Delivery"
        else if (store.current_user_data.delivery == false && store.current_user_data.reserva == true) return "Reservation"
        else if (store.current_user_data.delivery == true && store.current_user_data.reserva == true) return "Delivery and Reservation"
        else return ""
    }

    return(
        <div className="container_info_company">
                <h1 className="title_acount_company">Acount info</h1>
                <h3 className="subtitle_acount_company ms-3 my-3">Basic info</h3>
                <div className="category_container_company">
                    <div className="info_title_company">
                     <h5 className="ms-3">Name</h5>
                    </div>
                    <div className="container_company my-3 ">
                        <p className="box_text_company">{store.current_user_data.nombre}</p>
                    </div>
                </div>
                <div className="category_container_company">
                    <div className="info_title_company">
                        <h5 className="ms-3">Email</h5>
                    </div>
                    <div className="container_user my-3 ">
                        <p className="box_text_company ">{store.current_user_data.email}</p>
                    </div>
                </div>
                <div className="category_container_company">
                    <div className="info_title_company">
                        <h5 className="ms-3">Tax Code</h5>
                    </div>
                    <div className="container_company my-3 ">
                        <p className="box_text_company">{store.current_user_data.cif}</p>
                    </div>
                </div>
                <div className="category_container_company">
                    <div className="info_title_company">
                        <h5 className="ms-3">Address</h5>
                    </div>
                    <div className="container_company my-3 ">
                        <p className="box_text_company">{store.current_user_data.direccion}</p>
                    </div>
                </div>
                <div className="category_container_company">
                    <div className="info_title_company">
                        <h5 className="ms-3">Services</h5>
                    </div>
                    <div className="container_company my-3 ">
                        <p className="box_text_company">{services()}</p>
                    </div>
                </div>
                <div className="category_container_company">
                    <div className="info_title_company">
                        <h5 className="ms-3">Timetable</h5>
                    </div>
                    <div className="container_company my-3 ">
                        <p className="box_text_company">{timetable()}</p>
                    </div>
                </div>

        </div>
    )
}