import React from "react";
import "../../styles/companyProfileBox.css";


export const InfoCompanyBox = () => {
    return (
            <div className="card sidebar col-12 col-md-5 company-profile-box">
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
            </div>
    )
}
