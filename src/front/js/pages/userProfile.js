import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/userProfile.css";
import User_info from "../component/user_info";

const UserProfile = () => {
    const { store, actions } = useContext(Context);
    return(
        <>
            <div className="container-fluid ">
                <div className="row ">
                    <div className="card sidebar col-4 col-md-3 company-profile-box m-5">
                        <ul className="nav flex-column company-profile-list">
                            <li className="nav-item">
                                <a className="nav-link company-profile-box-text" href="#">Account info</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link company-profile-box-text" href="#">My orders</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link company-profile-box-text" href="#">Favorites</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-6 col-md-7 acount_basic_info my-5 ms-5">
                        <User_info/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile