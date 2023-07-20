import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/companyPageMenu.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const CompanyPageMenu = ({ idEmpresa }) => {
  const { store, actions } = useContext(Context);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const handleBuyProduct = (
    e,
    nombre,
    precio,
    descripcion,
    img,
    cantidad,
    id
  ) => {
    e.preventDefault();
    if (store.current_user_data.role == "Empresa") {
      Swal.fire("Must be a client to buy!");
    } else if (!store.current_user_data.role) {
      Swal.fire("Must be logged to buy!");
    } else {
      actions.buyProduct(nombre, precio, descripcion, img, cantidad, id);
      navigate("/orderDetail", { replace: true });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${process.env.BACKEND_URL}/api/empresa/menu/${idEmpresa}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        console.log(result);
        setProducts(result);
      } catch (error) {
        console.log("error");
      }
    })();
  }, []);

  return (
    <div className="container-fluid">
        <div className="tab-pane fade show active" id="nav-menu" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
                <div className="row row-cols-2 d-flex justify-content-evenly">
                { products.length > 0 ?
                  products.map((product,index)=>{
                    return (
                  <div className="col-11 col-md-5 d-flex border menu_container_page" key={index}>
                        <div className="col-3 menu_imgbox">
                            <img src={product && product.img} alt="foto producto" className="page_company_img" />
                        </div>
                        <div className="menu_text_page">
                            <div className="d-flex container-tittle-icon">
                                <div className="menu_title_page">
                                    <h4 className="menu_title">{product && product.nombre}</h4>
                                </div>
                                <button className="btn menu_icono"  onClick={(e) => handleBuyProduct(e, product.nombre, product.precio, product.descripcion, product.img, 1, product.id)}>
                                    <i className="fa-solid fa-plus fa-lg"></i>
                                </button>
                            </div>
                            <div className="menu_price_data">
                                    <h6 className="menu_price_page">{product && product.precio}$</h6>
                            </div>
                            <div className="menu_description_page">
                                <p>{product && product.descripcion}</p>
                            </div>
                        </div>
                  </div>
                  )}) : (<div className="container-flex no-hay-productos">
                  <h1 className="no-hay-productos-text">Nothing to see here</h1>
                  </div>)
                }
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
