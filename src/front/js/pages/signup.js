import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/signupUsuario.css";
import logoGrande from '../../img/Dishdash-blanco-grande.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Signup = () => {
    const {store, actions } = useContext(Context)
    const [user, setUser] = useState({
        email:"",
        password:"",
        password2: "",
        role: ""
    })
    const navigate = useNavigate()

    
    const handleSignup = (e) => {
        e.preventDefault()
        if (user.role === "") {
            toast.error('Select User or Company',  {position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
          }
        else{actions.getNewUser(user.email, user.password, user.role);}
        
        goAnotherPage()

    };

    const goAnotherPage = () => {
        if (user.role === "Usuario" && user.email !== "" && user.password !== "" && user.password2 !=="" && user.password == user.password2){
            navigate('/signupCliente', { replace: true }); 
        }
        else if(user.role === "Empresa" && user.email !== "" && user.password !== "" && user.password2 !=="" && user.password == user.password2){
            navigate('/signupEmpresa', { replace: true }); 
        }
        else if (user.password !== user.password2){
            toast.error('Password does not match',  {position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        }
        else {
            toast.error('Check all the fields',  {position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        }
    } 


  const handleOnChange = (e) => {
    const selectedRole = e.target.id === "usercheckbox" ? "Usuario" : "Empresa";
    setUser({ ...user, role: selectedRole });
  };

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <div className="container-fluid text-center p-5 signup_page_container" >
            <div className="row signup_all">
                <div className="col-sm-4 d-none d-sm-flex signup_logo_container">
                    <img className="signup_logo"src={logoGrande} alt="Logo de la empresa" />
                </div>
                <div className="signup_form_container col-sm-8 col-12  ">
                    <h1 className="signup_title">Signup</h1>
                    <p className="signup_subtitle">Enter your email and password to register</p>
                    <form onSubmit={(e)=> {handleSignup(e)}}>
                        <div className="mb-3">
                            <label htmlFor="userEmail" className="form-label signup_label" >Email address</label>
                            <input type="email" className="form-control" id="userEmail" placeholder="Enter your email" value={user.email} onChange={(data)=> {setUser({...user, email: data.target.value})}} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userPassword" className="form-label signup_label">Password</label>
                            <input type="password" className="form-control" id="userPassword" placeholder="Enter your password" value={user.password} onChange={(data)=> {setUser({...user, password: data.target.value}); }} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userPassword2" className="form-label signup_label">Confirm Password</label>
                            <input type="password" className="form-control" id="userPassword2" placeholder="Enter your password" value={user.password2} onChange={(data)=> {setUser({...user, password2: data.target.value}); }} required/>
                        </div>
                        <div className="row my-3">
                            <div className="col-12 col-sm-6 signup_checkbox_container">
                                <input className="form-check-input checkbox" type="radio" name="flexRadioDefault" id="usercheckbox" onChange={handleOnChange}
                        checked={user.role === "Usuario"}/>
                                <label className="form-check-label" htmlFor="usercheckbox">
                                    I'm a user
                                </label>
                            </div>
                            <div className="col-12 col-sm-6 signup_checkbox_container">
                                <input className="form-check-input checkbox" type="radio" name="flexRadioDefault" id="companycheckbox" onChange={handleOnChange}
                        checked={user.role === "Empresa"} />
                                <label className="form-check-label" htmlFor="companycheckbox" >I'm a company
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary signup_submit">Next</button>
                        <ToastContainer />
                    </form>
                </div>
            </div>
        </div>
)
}

