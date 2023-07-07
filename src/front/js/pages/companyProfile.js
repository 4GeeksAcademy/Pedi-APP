import React from "react";
import "../../styles/companyProfile.css";
import { Addproduct } from "../component/addProduct";

export const CompanyProfile = () => {
    return(
        <div className="container-fluid container-company-profile">
            <div className="row">
                    <form className="card sidebar col-12 col-md-5 company-profile-box">
                        <ul className="nav company-profile-list">
                            <li className="nav-item text-box">
                                <a className="nav-link company-profile-box-text" href="">Account info</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link company-profile-box-text" href="#">Menu</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link company-profile-box-text" href="#">Add product</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link company-profile-box-text" href="#">Order history</a>
                            </li>
                        </ul>
                    </form>
                <div className="col-12 col-md-7">
                    <Addproduct/>
                </div>
            </div>
        </div>
    )
}