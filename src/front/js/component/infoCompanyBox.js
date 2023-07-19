import React from "react";
import "../../styles/companyProfileBox.css";
import { Link, useLocation } from 'react-router-dom';

export const InfoCompanyBox = () => {
  const location = useLocation();

  return (
    <div className="card col-12 col-md-5 company-profile-box">
      <ul className="nav company-profile-list">
        <li className="nav-item text-box">
          <Link
            className={`nav-link company-profile-box-text ${location.pathname === '/companyProfile' ? 'active' : ''}`}
            to="/companyProfile"
          >
            Account info
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link company-profile-box-text ${location.pathname === '/menu' ? 'active' : ''}`}
            to="/menu"
          >
            Menu
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link company-profile-box-text ${location.pathname === '/addProduct' ? 'active' : ''}`}
            to="/addProduct"
          >
            Add product
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link company-profile-box-text ${location.pathname === '/companyOrderHistory' ? 'active' : ''}`}
            to="/companyOrderHistory"
          >
            Order history
          </Link>
        </li>
      </ul>
    </div>
  );
};