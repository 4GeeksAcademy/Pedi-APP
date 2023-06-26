import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";

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

    if (loged) {
      navigate("/", { replace: true });
    }
  };

  return (
    <>
      <div className="container-fluid text-center mt-5 login_page_container p-5 ">
        <div className="row login_all ">
          <div className="col-4 d-flex login_logo_container">
            <p className="login_logo border">dishdash</p>
          </div>
          <div className="col-8 login_form_container ">
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
                  onChange={(e) => {
                    user_setinator(e);
                  }}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary login_submit ">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
