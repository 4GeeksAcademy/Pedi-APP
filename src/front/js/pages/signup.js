import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/signupUsuario.css";

export const Signup = () => {
    const {store, actions } = useContext(Context)
    const [user, setUser] = useState({
        email:"",
        password:"",
        role: ""
    })

    const handleSignup = (e) => {
        e.preventDefault()
        if (user.role === "") {
            return alert ("Select User or Company");
          }
        else{actions.getNewUser(user.email, user.password, user.role);}
        
    };

  const handleOnChange = (e) => {
    const selectedRole = e.target.id === "usercheckbox" ? "Usuario" : "Empresa";
    setUser({ ...user, role: selectedRole });
  };

  const moveUserOrCompany = ()=> {
    if (user.role === "Usuario"){
        return "/signupCliente"
    }
    else{
        return "/signupEmpresa"
    }
    // if (user.role === "Usuario"){
    //     return "/signupCliente"
    // }
    // if (user.role === "Empresa") {
    //     return "/signupEmpresa"
    // } if(user.role ==="" &&  user.email ==="" &&  user.password ==="") {
    //     return alert ("You have to fill in all the fields")
    // }
  }

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <div className="container-fluid text-center" onSubmit={(e)=> {handleSignup(e)}}>
            <div className="row signup_all">
                <div className="col-4 d-flex logo_container">
                    <p className="border logo">dishdash</p>
                </div>
                <div className="form_container col-8 p-5">
                    <h1 className="title">Signup</h1>
                    <p>Enter your email and password to register</p>
                    <form className="container-fluid" >
                        <div className="mb-3">
                            <label htmlFor="userEmail" className="form-label" >Email address</label>
                            <input type="email" className="form-control" id="userEmail" placeholder="Enter your email" value={user.email} onChange={(data)=> {setUser({...user, email: data.target.value})}} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" id="userPassword" placeholder="Enter your password" value={user.password} onChange={(data)=> {setUser({...user, password: data.target.value}); }} required/>
                        </div>
                        <div className="row my-3">
                            <div className="col-12 col-md-6 form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="usercheckbox" onChange={handleOnChange}
                        checked={user.role === "Usuario"}/>
                                <label className="form-check-label" htmlFor="usercheckbox">
                                    I'm a user
                                </label>
                            </div>
                            <div className="col-12 col-md-6 form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="companycheckbox" onChange={handleOnChange}
                        checked={user.role === "Empresa"} />
                                <label className="form-check-label" htmlFor="companycheckbox" >I'm a company
                                </label>
                            </div>
                        </div>
                        <Link to={moveUserOrCompany()} type="submit" className="btn submit">Submit</Link>
                    </form>
                </div>
            </div>
        </div>
)
}

