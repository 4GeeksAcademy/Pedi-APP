import React, { Component } from "react";
import "/workspaces/Pedi-APP/src/front/styles/footer.css"
import Swal from "sweetalert2";

export const Footer = () => (
  <footer className="py-3  border-top  footer_container">
    <div className="row footer_row ">
		<div className="col-2 footer_col ">
			<div className="footer_logo mb-2">
				<button type="button" className="btn btn-danger footer_logo_btn">DishDash</button>
			</div>
			<p className="footer_col1_text"> Follow us:</p>
			<div className="footer_social">
				<i className="fab fa-instagram fa-lg"></i>
				<i className="fab fa-twitter fa-lg mx-3"></i>
				<i className="fab fa-facebook-square fa-lg"></i>
			</div>

		</div>
		<div className="col-2 footer_col ">
			<div className="footer_store mb-2 ">
				<button type="button" className="btn btn-danger footer_store_btn mb-4 ">
					<div className="footer_appstore ">
						<i className="fab fa-apple fa-lg"></i>
						<p className="footer_appstore_text ">Download on <br/>the App Store</p>
					</div>
					
				</button>
				<button type="button" className="btn btn-danger footer_store_btn mb-4">
					<div className="footer_appstore ">
						<i className="fab fa-google-play fa-lg"></i>
						<p className="footer_appstore_text ">Get it on <br/>Google Play</p>
					</div>
					
				</button>
			</div>

		</div>
		<div className="col-2 footer_col  ">
			<div className="footer_infotext_container ">
				<p className="footer_infotext">Information</p>
				<p className="footer_infosubtext"> About us <br/> Contact <br/>Promotions<br/> DishDash Prime</p>
			</div>

		</div>
		<div className="col-2 footer_col  ">
			<div className="footer_infotext_container ">
				<p className="footer_infotext ">Lets do it together</p>
				<p className="footer_infosubtext"> Become a rider <br/>Add your business</p>
				
				<div className="footer_languaje mb-auto">
					<i className="far fa-language fa-lg "></i>
					<p className="footer_languaje_text">English</p>
				</div>
				
			</div>

		</div>
		<div className="col-2 footer_col  ">
			<div className="footer_infotext_container ">
				<p className="footer_infotext">Helpfull links</p>
				<p className="footer_infosubtext"> Terms and conditions <br/> Privacy policy <br/>Cookies policy<br/> Compliance</p>
				
			</div>

		</div>
	</div>
  </footer>
);