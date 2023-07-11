import React from "react";
import { InfoCompanyBox } from "../component/infoCompanyBox";
import { InfoCompany } from "../component/infoCompany";
import "../../styles/companyProfileBox.css";

export const CompanyProfile = () => {
    return(
        <div className="container-fluid container-company-profile">
            <div className="row">
                <InfoCompanyBox />      
                <div className="col-12 col-md-7">
                    <InfoCompany />
                </div>
            </div>
        </div>
    )
}