import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/userProfileMenu.css";


const User_profile_menu = () => {
    const { store, actions } = useContext(Context);
    

    return(
        <>
                    <div className="card  col-12 col-md-5 user-profile-box">
                        <ul className="nav user-profile-list">
                            <li className="nav-item text-box">
                                <Link className="nav-link user-profile-box-text" href="" to={"/userProfile/info"}>Account info</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link user-profile-box-text" href="#" to={"/userProfile/history"}>My orders</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link user-profile-box-text" href="#" to={"/userProfile/favorites"}>Favorites</Link>
                            </li>
                        </ul>
                    </div>
        </>
    )
}

export default User_profile_menu