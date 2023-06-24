import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "/workspaces/Pedi-APP/src/front/styles/navbar.css"


export const Navbar = () => {
	const {store,actions} = useContext(Context)
	const navigate = useNavigate()

	return (
		<nav className="navbar">
			<div className="container">
				<Link to="/">
					<h1 className="nav_title">DishDash</h1>
				</Link>
				<div className="ml-auto">
					<button className="btn  me-4 nav_btn" onClick={()=>{navigate('/login', { replace: true })}}>Login</button>
					<button className="btn nav_btn" onClick={()=>{navigate('/signup', { replace: true })}}>Signup</button>		
				</div>
			</div>
		</nav>
	);
};
