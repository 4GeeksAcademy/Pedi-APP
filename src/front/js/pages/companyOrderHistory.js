import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/companyProfileBox.css";
import { InfoCompanyBox } from "../component/infoCompanyBox";
import Company_history from "../component/company_history";



const CompanyOrderHistory = () => {
    const { store, actions } = useContext(Context);
   

    return(
        <>
            <div className="container-fluid container-company-profile">
                <div className="row ">
                    <InfoCompanyBox />   
                    <div className="col-12 col-md-7 acount_basic_info ">
                        <Company_history/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CompanyOrderHistory