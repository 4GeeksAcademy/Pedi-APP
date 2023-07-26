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
import { Search } from "./pages/search";

import { CompanyProfile } from "./pages/companyProfile";

import { CompanyAddProduct } from "./pages/companyAddProduct";
import { MenuCompany } from "./pages/menuCompany";

import Login from "./pages/login";
import UserInfo from "./pages/userInfo";
import UserHistory from "./pages/userHistory";
import UserFavorites from "./pages/userFavorites";
import { CompanyPage } from "./pages/companyPage";

import OrderDetail from "./pages/orderDetail";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./pages/checkoutForm";
import CompanyOrderHistory from "./pages/companyOrderHistory";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  const promise = loadStripe(
    "pk_test_51NShHZGaOqlS5geCwKPZaHTaW5yq3C9nFeNqD13fcdrVdcp810PI3GeYW43IcsVqXTSg7ip0saQtuVnDq0FjvSyl00tpotDJnL"
  );

  return (
    <div className="cont">
      <BrowserRouter basename={basename}>
        <Navbar />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<SingupCliente />} path="/signupCliente" />
          <Route element={<SingupEmpresa />} path="/signupEmpresa" />
          <Route element={<Search />} path="/searchEmpresa" />
          <Route element={<Signup />} path="/signup" />
          <Route element={<Login />} path="/login" />
          <Route element={<CompanyProfile />} path="/companyProfile" />
          {
            <Route
              element={<CompanyOrderHistory />}
              path="/companyOrderHistory"
            />
          }
          <Route element={<MenuCompany />} path="/menu" />
          <Route element={<CompanyAddProduct />} path="/addProduct" />
          <Route element={<UserInfo />} path="/userProfile/info" />
          <Route element={<UserHistory />} path="/userProfile/history" />
          <Route element={<UserFavorites />} path="/userProfile/favorites" />
          <Route element={<CompanyPage />} path="/companyPage/:idEmpresa" />
          <Route element={<OrderDetail />} path="/orderDetail" />
          <Route
            path="/checkout"
            element={
              <Elements stripe={promise}>
                <CheckoutForm />
              </Elements>
            }
          />

          <Route element={<h1>Not found!</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
