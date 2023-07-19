import React from "react";
import { Link, useLocation} from "react-router-dom";
import "../../styles/userProfileMenu.css";


const User_profile_menu = () => {
    const location = useLocation ();

    return(
        <>
                    <div className="card  col-12 col-md-5 user-profile-box">
                        <ul className="nav user-profile-list">
                            <li className="nav-item text-box">
                                <Link className={`nav-link user-profile-box-text ${location.pathname === '/userProfile/info' ? 'active' : ''}`} to={"/userProfile/info"}>Account info</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link user-profile-box-text ${location.pathname === '/userProfile/history' ? 'active' : ''}`} to={"/userProfile/history"}>My orders</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link user-profile-box-text ${location.pathname === '/userProfile/favorites' ? 'active' : ''}`} to={"/userProfile/favorites"}>Favorites</Link>
                            </li>
                        </ul>
                    </div>
        </>
    )
}

export default User_profile_menu