import React, { useContext, useEffect } from "react";
import { InfoCompanyBox } from "../component/infoCompanyBox";
import { InfoCompany } from "../component/infoCompany";
import "../../styles/companyProfileBox.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const CompanyProfile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        
        if(!actions.isloged()){
            navigate("/", { replace: true });
        }		  
    
      }, []);
  return (
    <div className="container-fluid container-company-profile">
      <div className="row">
        <InfoCompanyBox />
        <div className="col-12 col-md-7">
          <InfoCompany />
        </div>
      </div>
    </div>
  );
};
