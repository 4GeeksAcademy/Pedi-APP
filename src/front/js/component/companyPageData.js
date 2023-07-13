import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/companyPageData.css"
import { CompanyPageMap } from "./companyPageMap";
import { CompanyPageMenu } from "./companyPageMenu";
import { useParams } from "react-router-dom";


export const CompanyPageData = () => {

  const { idEmpresa } = useParams();

    return(
        <div>
        {/* PESTAÑAS DE IMAGENES */}
          {/* BOTONES ICONOS */}
          {/* <nav class="nav nav-pills nav-justified nav-company-page">
            <button class="nav-link active nav-btn-company-page" aria-current="page" href="#">Menu</button>
            <button class="nav-link nav-btn-company-page" href="#">Information</button>
          </nav> */}
        {/* primer nav */}
        <div className="tab-content" id="nav-tabContent">
            <CompanyPageMenu idEmpresa={idEmpresa} />
        </div>
          {/* segundo nav
        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
            <CompanyPageMap />
        </div> */}
        </div>

    )
}