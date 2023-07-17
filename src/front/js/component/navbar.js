import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css";
import logoGrande from '../../img/Dishdash-blanco-grande.png';

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();


  if(store.isloged){
    return(
      <>
          
        <nav className="navbar">
          <div className="container-fluid">
            <Link to="/">
              <img className="nav_title" src={logoGrande} alt="Logo de la empresa" style={{ width: '200px'}}/>
            </Link>
            <div className="ml-auto">
              <button
                className="btn nav_btn_login"
                onClick={() => {
                  actions.isloged()
                  if(store.isloged == true){
                    if(store.current_user_data.role == "Cliente"){
                      navigate("/userProfile/info", { replace: true });
                    } else if (store.current_user_data.role == "Empresa" ){
                      navigate("/companyProfile", { replace: true });
                    }
                      
                    
                  } else{
                    navigate("/", { replace: true });
                  }
                  
                }}
              >
                Profile
              </button>
              <button
                className="btn nav_btn_signup"
                onClick={() => {
                  actions.logoutinator()
                  navigate("/", { replace: true });
                }}
                
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      
          
      </>
    )
  } else{
      return (
        <nav className="navbar">
          <div className="container-fluid">
            <Link to="/">
              <img className="nav_title" src={logoGrande} alt="Logo de la empresa" style={{ width: '200px'}}/>
            </Link>
            <div className="ml-auto">
              <button
                className="btn nav_btn_login"
                onClick={() => {
                  navigate("/login", { replace: true });
                }}
              >
                Login
              </button>
              <button
                className="btn nav_btn_signup"
                onClick={() => {
                  navigate("/signup", { replace: true });
                }}
              >
                Signup
              </button>
            </div>
          </div>
        </nav>
      );
  }

  
};
