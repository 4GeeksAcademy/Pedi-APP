import React, { Component } from "react";
import "../../styles/footer.css";
import Swal from "sweetalert2";
import logo from '../../img/DC.png';

export const Footer = () => (
  <footer className="py-3 border-top  footer_container">
    <div className="row footer_row ">
		<div className="col-6 col-lg-2 footer_col mt-3">
			<div className="footer_logo mb-2">
				<img type="button" className="btn btn-danger footer_logo_btn" src={logo} alt="Logo de la empresa" style={{ width: '50px'}}/>
			</div>
			<p className="footer_col1_text"> Follow us:</p>
			<div className="footer_social">
				<i className="fab fa-instagram fa-lg"></i>
				<i className="fab fa-twitter fa-lg mx-3"></i>
				<i className="fab fa-facebook-square fa-lg"></i>
			</div>

		</div>
		<div className="col-6 col-lg-2 footer_col mt-3">
			<div className="footer_store mb-2 ">
				<button type="button" className="btn btn-danger footer_store_btn mb-4 ">
					<div className="footer_appstore ">
						<i className="fab fa-apple me-2"></i>
						<p className="footer_appstore_text mt-3">Download on the<br/><strong className="footer_appstore_text1 mt-3">App Store</strong></p>
					</div>
					
				</button>
				<button type="button" className="btn btn-danger footer_store_btn mb-4">
					<div className="footer_appstore">
						<i className="fab fa-google-play me-2"></i>
						<p className="footer_google-play_text mt-3">Get it on <br/><strong className="footer_google-play_text1 mt-3">Google Play</strong></p>
					</div>
					
				</button>
			</div>

		</div>
		<div className="col-4 col-lg-2 footer_col  ">
			<div className="footer_infotext_container ">
				<p className="footer_infotext">Information</p>
				<p className="footer_infosubtext"> About us <br/> Contact <br/>Promotions<br/> DishDash Prime</p>
			</div>

		</div>
		<div className="col-4 col-lg-2 footer_col  ">
			<div className="footer_infotext_container ">
				<p className="footer_infotext ">Lets do it together</p>
				<p className="footer_infosubtext"> Become a rider <br/>Add your business</p>
				
				<div className="footer_languaje mb-auto">
					<i className="fa-solid fa-language me-3 mb-1"></i>
					<p className="footer_languaje_text mt-2">English</p>
				</div>
				
			</div>

		</div>
		<div className="col-4 col-lg-2 footer_col  ">
			<div className="footer_infotext_container ">
				<p className="footer_infotext">Helpfull links</p>
				<p className="footer_infosubtext"> Terms and conditions <br/> Privacy policy <br/>Cookies policy<br/> Compliance</p>
				
			</div>

		</div>
	</div>
  </footer>
);