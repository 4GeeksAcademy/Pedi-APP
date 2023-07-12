import React from "react";
import "../../styles/companyProfileBox.css";
import { Link } from "react-router-dom";


export const InfoCompanyBox = () => {
    return (
            <div className="card sidebar col-12 col-md-5 company-profile-box">
                <ul className="nav company-profile-list">
                    <li className="nav-item text-box">
                        <Link className="nav-link company-profile-box-text" to="/companyProfile">Account info</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link company-profile-box-text" to="/menu">Menu</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link company-profile-box-text" to="/addProduct">Add product</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link company-profile-box-text" to="/companyOrderHistory">Order history</Link>
                    </li>
                </ul>
            </div>
    )
}
