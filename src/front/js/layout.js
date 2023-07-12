import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { SingupCliente } from "./pages/signupCliente";
import { Signup } from "./pages/signup";
import { SingupEmpresa } from "./pages/signupEmpresa";

import { CompanyProfile } from "./pages/companyProfile";
// import UserProfile from "./pages/userProfile";
import { CompanyAddProduct } from "./pages/companyAddProduct";
import { MenuCompany } from "./pages/menuCompany";

import Login from "./pages/login";
import UserInfo from "./pages/userInfo";
import UserHistory from "./pages/userHistory";
import UserFavorites from "./pages/userFavorites";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<SingupCliente/>} path="/signupCliente" />
                        <Route element={<SingupEmpresa/>} path="/signupEmpresa" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Login/>} path="/login"/>
                        <Route element={<CompanyProfile />} path="/companyProfile"/>
                        {/* <Route element={<UserProfile/>} path="/userProfile"/> */}
                        <Route element={<MenuCompany/>} path="/menu"/>
                        <Route element={<CompanyAddProduct />} path="/addProduct"/>
                        <Route element={<UserInfo/>} path="/userProfile/info"/>
                        <Route element={<UserHistory/>} path="/userProfile/history"/>
                        <Route element={<UserFavorites/>} path="/userProfile/favorites"/>
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
