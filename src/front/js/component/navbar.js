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
          <h1 className="nav_title mx-5">DishDash</h1>
        </Link>
        <div className="ml-auto mx-5">
          <button
            className="btn  me-4 nav_btn"
            onClick={() => {
              navigate("/login", { replace: true });
            }}
          >
            Login
          </button>
          <button
            className="btn nav_btn"
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
