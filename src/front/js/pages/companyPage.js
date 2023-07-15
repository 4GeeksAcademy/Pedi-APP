import React from "react";
import { CompanyPageNavbar } from "../component/companyPageNavbar";
import { CompanyPageData } from "../component/companyPageData";
import { useParams } from "react-router-dom";

export const CompanyPage = () => {

    const { idEmpresa } = useParams();


    return(
        <>
            <CompanyPageNavbar idEmpresa={idEmpresa}/>
            <CompanyPageData />
        </>
    )
}