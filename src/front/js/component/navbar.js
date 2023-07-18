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
              <img id="logotipo-page" src={logoGrande} alt="Logo de la empresa" />
            </Link>
            <div className="ml-auto">
              <button
                className="btn nav_btn_signout" 
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
                <i className="fa-solid fa-user fa-xl custom-icon"></i>
              </button>
              <button
                className="btn nav_btn_signout"
                onClick={() => {
                  actions.logoutinator()
                  navigate("/", { replace: true });
                }}
                
              >
                <i className="fa-solid fa-right-from-bracket fa-xl custom-icon"></i>
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
              <img id="logotipo-page" src={logoGrande} alt="Logo de la empresa"/>
            </Link>
            <div className="ml-auto">
              <button
                className="btn nav_btn_login"
                onClick={() => {
                  navigate("/login", { replace: true });
                }}
              >
               <i className="fa-solid fa-user"></i> Log in
              </button>
              <button
                className="btn nav_btn_signup"
                onClick={() => {
                  navigate("/signup", { replace: true });
                }}
              >
              <i className="fa-solid fa-user-plus"></i> Sign up
              </button>
            </div>
          </div>
        </nav>
      );
  }

  
};
