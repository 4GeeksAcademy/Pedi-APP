import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Menu } from "../component/menu";
import { InfoCompanyBox } from "../component/infoCompanyBox";


export const MenuCompany = () =>{
    return(
        <div className="container-fluid container-company-profile">
            <div className="row">
                <InfoCompanyBox />      
                <div className="col-12 col-md-7">
                    <Menu />
                </div>
            </div>
        </div>
    )
}