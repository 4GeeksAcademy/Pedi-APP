import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/userProfile.css";
import User_profile_info from "../component/user_profile_info";
import User_history from "../component/user_history";
import User_favorites from "../component/user_favorites";
import User_order from "../component/user_order";
import User_profile_menu from "../component/user_profile_menu";
import "../../styles/userProfileMenu.css"

const UserHistory = () => {
    const { store, actions } = useContext(Context);
   

    return(
        <>
            <div className="container-fluid container-user-profile">
                <div className="row ">
                    <User_profile_menu/>
                    <div className="col-12 col-md-7 acount_basic_info  ">
                        <User_history/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserHistory