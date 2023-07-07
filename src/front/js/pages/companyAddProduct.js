import React from "react";
import { AddProduct } from "../component/addProduct";
import { InfoCompanyBox } from "../component/infoCompanyBox";

export const CompanyAddProduct = () => {
    return(
        <div className="container-fluid container-company-profile">
            <div className="row">
                <InfoCompanyBox />      
                <div className="col-12 col-md-7">
                    <AddProduct/>
                </div>
            </div>
        </div>
    )
}