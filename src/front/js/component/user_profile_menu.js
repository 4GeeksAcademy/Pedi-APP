import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/userProfileMenu.css";


const User_profile_menu = () => {
    const { store, actions } = useContext(Context);
    

    return(
        <>
                    <div className="card sidebar col-12 col-md-5 user-profile-box">
                        <ul className="nav user-profile-list">
                            <li className="nav-item text-box">
                                <a className="nav-link user-profile-box-text" href="">Account info</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link user-profile-box-text" href="#">My orders</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link user-profile-box-text" href="#">Favorites</a>
                            </li>
                        </ul>
                    </div>
        </>
    )
}

export default User_profile_menu