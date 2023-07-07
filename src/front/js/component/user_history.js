import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/userHistory.css";
import User_order from "./user_order";

const User_history = () =>{
    const {store,actions} = useContext(Context)
    return(
        <>
            <h1 className="title_history_user">Your orders</h1>
            <User_order/>
        </>
    )
}

export default User_history