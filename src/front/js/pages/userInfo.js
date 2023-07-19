import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/userProfile.css";
import User_profile_info from "../component/user_profile_info";
import User_history from "../component/user_history";
import User_favorites from "../component/user_favorites";
import User_order from "../component/user_order";
import User_profile_menu from "../component/user_profile_menu";
import "../../styles/userProfileMenu.css"
import Swal from "sweetalert2";

const UserInfo = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        
        if(!actions.isloged()){
            navigate("/", { replace: true });
        }		  
    
      }, []);
    return(
        <>
            <div className="container-fluid container-user-profile">
                <div className="row ">
                    <User_profile_menu/>
                    <div className="col-12 col-md-7 acount_basic_info  ">
                        <User_profile_info/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserInfo