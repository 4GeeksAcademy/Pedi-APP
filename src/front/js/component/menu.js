import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/menu.css";

export const Menu = () => {
  const { store, actions } = useContext(Context);
  const [products, setProduct] = useState([]);
  console.log(products);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("jwt-token");

        const response = await fetch(
          process.env.BACKEND_URL +
            "/api/menu/" +
            store.current_user_data.idEmpresa,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const result = await response.json();
        if (response.status == 401) {
          Swal.fire(result.msg);

          navigate("/", { replace: true });
        }
        setProduct(result.menu); //Aqui tengo que poner result.menu porque en routes lo que se devuelve es menu
      } catch (error) {
        console.log(error);
      }
    })();
  }, [store.current_user_data]);

  return (
    <>
      <h1 className="text-center menu-title-company">Menu</h1>
      {products.map((product, index) => {
        return (
          <div className="row col-11 border menu_container" key={index}>
            <div className="col-6 col-sm-4">
              <div className="menu_imgbox  mx-3 my-5">
                <img src={product.img} alt="..." className="menu_categoryimg" />
              </div>
            </div>
            <div className="col-6 col-sm-8 py-4">
              <div className="row">
                <div className="col-9 menu_title_box">
                  <h2 className="menu_title">{product.nombre}</h2>
                </div>
                {/* <div className="col-3 menu_icono">
                                    <i className="fa-regular fa-pen-to-square fa-xl"></i>
                                </div> */}
              </div>
              <div className="menu_price_box">
                <h4 className="menu_price_text">{product.precio}$</h4>
              </div>
              <div className="menu_description">
                <p>{product.descripcion}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
