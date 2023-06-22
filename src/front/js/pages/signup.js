import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Signup = () => {
    const {store, actions } = useContext(Context)
    const [user, setUser] = useState({
        email:"",
        password:"",
        role:""
    })

    const handleSignup = () => {
        actions.getNewUser(user.email, user.password, user.role);
    };

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <form className="col-12 col-md-4 mx-auto my-3">
            <div className="mb-3">
                <label htmlFor="userEmail" className="form-label" >Email address</label>
                <input type="email" className="form-control" id="userEmail" placeholder="Enter your email" value={user.email} onChange={(data)=> {setUser({...user, email: data.target.value}); /*actions.setNewUser(data.target.value); */}}/>
            </div>
            <div className="mb-3">
                <label htmlFor="userPassword" className="form-label">Password</label>
                <input type="password" className="form-control" id="userPassword" placeholder="Enter your password" value={user.password} onChange={(data)=> {setUser({...user, password: data.target.value}); /*actions.setNewUser(data.target.value);*/}}/>
            </div>
            <div className="row my-3">
                <div className="col-12 col-md 4 mx-2 form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        I'm a user
                    </label>
                </div>
                <div className="col-12 col-md 4 mx-2 form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                    <label className="form-check-label" htmlFor="flexRadioDefault2">I'm a company
                    </label>
                </div>
            </div>

            <Link to="/signupempresa" type="submit" className="btn btn-primary" onClick={handleSignup}>Submit</Link>
        </form>
    )
}