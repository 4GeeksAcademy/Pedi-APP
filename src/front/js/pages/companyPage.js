import React from "react";
import { CompanyPageNavbar } from "../component/companyPageNavbar";
import { CompanyPageData } from "../component/companyPageData";
import { useParams } from "react-router-dom";
import { CompanyPageMenu } from "../component/companyPageMenu";
import { ToastContainer } from "react-toastify";

export const CompanyPage = () => {

    const { idEmpresa } = useParams();


    return(
        <>
            <CompanyPageNavbar idEmpresa={idEmpresa}/>
            {/* <CompanyPageData /> */}
            <CompanyPageMenu idEmpresa={idEmpresa} />
            <ToastContainer />
        </>
    )
}