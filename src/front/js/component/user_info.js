import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/user_info.css";

const User_info = () =>{
    const { store, actions } = useContext(Context);

    return(
        <>
                <h1 className="title_acount_user">Acount info</h1>
                <h3 className="subtitle_acount_user ms-3 my-3">Basic info</h3>
                <div className="category_container_user">
                    <div className="info_title_user">
                     <h5 className="ms-3  ">Name</h5>
                    </div>
                    <div className="container_user my-3 ">
                        <p className="box_text_user">{store.current_user_data.nombre}</p>
                    </div>
                </div>
                <div className="category_container_user">
                    <div className="info_title_user">
                        <h5 className="ms-3  ">Email</h5>
                    </div>
                    <div className="container_user my-3 ">
                        <p className="box_text_user ">{store.current_user_data.email}</p>
                    </div>
                </div>
                <div className="category_container_user">
                    <div className="info_title_user">
                        <h5 className="ms-3  ">Phone</h5>
                    </div>
                    <div className="container_user my-3 ">
                        <p className="box_text_user">{store.current_user_data.telefono}</p>
                    </div>
                </div>
                <div className="category_container_user">
                    <div className="info_title_user">
                        <h5 className="ms-3">Adress</h5>
                    </div>
                    <div className="container_user my-3 ">
                        <p className="box_text_user">{store.current_user_data.direccion}</p>
                    </div>
                </div>
        </>
    )
}


export default User_info