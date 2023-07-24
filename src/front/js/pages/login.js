import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logoGrande from '../../img/Dishdash-blanco-grande.png';

const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const user_setinator = (event) => {
    setUser({ ...user, [event.target.id]: event.target.value });
  };

  const submit_handlinator = async (event) => {
    event.preventDefault();

    const loged = await actions.login_handlinator(user);
    // if lo de arriba es OK lo de abajo pasa

    if (loged == true) {
      navigate("/searchEmpresa", { replace: true });
    } else {
      toast.error(loged, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
  };

  return (
    <>
      <div className="container-fluid text-center  login_page_container p-5 ">
        <div className="row login_all ">
          <div className="col-sm-4 d-none d-sm-flex login_logo_container">
          <img className="signup_logo"src={logoGrande} alt="Logo de la empresa" />
          </div>
          <div className="col-sm-8 col-12 login_form_container ">
            <h1 className="login_title">Login</h1>
            <p className="login_subtitle">
              Welcome back! Please login to your account
            </p>

            <form
              onSubmit={(e) => {
                submit_handlinator(e);
              }}
            >
              <div className="mb-3">
                <label htmlFor="email" className="form-label login_label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter your email"
                  onChange={(e) => {
                    user_setinator(e);
                  }}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label login_label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  onChange={(e) => {
                    user_setinator(e);
                  }}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary login_submit ">
                Login
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
