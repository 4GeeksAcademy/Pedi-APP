import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Menu } from "../component/menu";
import { InfoCompanyBox } from "../component/infoCompanyBox";

export const MenuCompany = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!actions.isloged()) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className="container-fluid container-company-profile">
      <div className="row">
        <InfoCompanyBox />
        <div className="col-12 col-md-7">
          <Menu />
        </div>
      </div>
    </div>
  );
};
