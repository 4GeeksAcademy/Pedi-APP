import React from "react";
import "../../styles/companyProfile.css";

export const CompanyProfile = () => {
    return(
        <div className="container-fluid container-company-profile">
            <div className="row">
                <div className="card sidebar col-12 col-md-6 company-profile-box">
                    <ul className="nav company-profile-list">
                        <li className="nav-item text-box">
                            <a className="nav-link company-profile-box-text" href="#">Account info</a>
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
                <div className="col-12 col-md-6 company-basic-info">
                    <h1 className="title-acount-company">Acount info</h1>
                    <h3 className="">Basic info</h3>
                    <h5 className="ms-3">Company name</h5>
                    {/* <p className="ms-5">{store.current_user_data.name}</p> */}
                    <h5 className="ms-3">Email</h5>
                    <p className="ms-5">test@test.com</p>
                    <h5 className="ms-3">Tax code</h5>
                    <p className="ms-5">12345</p>
                    <h5 className="ms-3">Addres</h5>
                    <p className="ms-5">C/Pico Clavero, 12, 28038, Comunidad de Madrid</p>
                    <h5 className="ms-3">Services</h5>
                    <div className="row">
                        <p className="col-5 ms-5">Delivery</p>
                        <p className="col-5 ms-5">Reservation</p>
                    </div>
                    <h5 className="ms-3">Timetable</h5>
                    <div className="row">
                        <p className="col-5 ms-5">Morning</p>
                        <p className="col-5 ms-5">Afternoon</p>
                    </div>
                </div>
            </div>
        </div>
    )
}