import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center container-fluid ">
			<div className="row home_first_row">
				<h1 className="home_title"> DishDash</h1>
				<p className="home_subtitle"> Dashing to your door</p>

				<form>
					<div className="mb-3 ">
						<input type="email" className="form-control" id="search" aria-describedby="emailHelp"/>
					</div>
				</form>
			</div>
			<div className="row">

			</div>
		</div>
	);
};