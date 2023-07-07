import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/infoCompany.css";

export const InfoCompany = () =>{
    const { store, actions } = useContext(Context);

    return(
        <>
                <h1 className="title_acount_company">Acount info</h1>
                <h3 className="subtitle_acount_company ms-3 my-3">Basic info</h3>
                <div className="category_container_company">
                    <div className="info_title_company">
                     <h5 className="ms-3  ">Name</h5>
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
        </>
    )
}