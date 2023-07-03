import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <Link to="/">
          <h1 className="nav_title">DishDash</h1>
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
};
