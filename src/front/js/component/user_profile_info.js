import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/user_info.css";

const User_profile_info = () =>{
    const { store, actions } = useContext(Context);

    return(
        <div className="container-fluid container-user-profile-info">
                <h1 className="title_acount_user">Acount info</h1>
                <div className="category_container_user">
                    <div className="info_title_user">
                     <h5 className="ms-3 text-info-user">Name</h5>
                    </div>
                    <div className="container_user my-3 ">
                        <p className="box_text_user">{store.current_user_data.nombre}</p>
                    </div>
                </div>
                <div className="category_container_user">
                    <div className="info_title_user">
                        <h5 className="ms-3 text-info-user">Email</h5>
                    </div>
                    <div className="container_user my-3 ">
                        <p className="box_text_user ">{store.current_user_data.email}</p>
                    </div>
                </div>
                <div className="category_container_user">
                    <div className="info_title_user">
                        <h5 className="ms-3 text-info-user">Phone</h5>
                    </div>
                    <div className="container_user my-3 ">
                        <p className="box_text_user">{store.current_user_data.telefono}</p>
                    </div>
                </div>
                <div className="category_container_user">
                    <div className="info_title_user">
                        <h5 className="ms-3 text-info-user">Address</h5>
                    </div>
                    <div className="container_user my-3 ">
                        <p className="box_text_user">{store.current_user_data.direccion}</p>
                    </div>
                </div>
        </div>
    )
}


export default User_profile_info