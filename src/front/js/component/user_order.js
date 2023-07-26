import React, { useEffect, useState } from "react";
import "../../styles/userOrder.css";
import logoGrande from '../../img/Dishdash-blanco-grande.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const User_order = (props) => {
  const { date, bill_id, company, time } = props;
  const [order, setOrder] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("jwt-token");

        const response = await fetch(process.env.BACKEND_URL + "/api/history", {
          method: "POST",
          body: JSON.stringify({ id: bill_id }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        const result = await response.json();
        if (response.status == 401) {
          toast.error(result.msg,  {position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
          navigate("/", { replace: true });
        }
        setOrder(result.history);
      } catch (error) {
        console.log("Error loading message from backend");
      }
    })();
  }, []);

  let amount = 0;
  let price = 0;
  for (let i of order) {
    amount += i.detail.cantidad;
    price += i.detail.precioActual;
  }

  return (
    <>
      <ToastContainer />
      {order && (
        <div className="row border order_container">
          <div className="col-12 col-sm-4 order_imgbox">
            <img
                src={company.imagen}
                alt="imagen empresa"
                className="order_company_img_box rounded"
              />
          </div>
          <div className="col-12 col-sm-8  py-4">
            <div className="row text-center">
              <div className="col-6 order_title_box ">
                <h3 className="order_title">{company.nombre}</h3>
              </div>
              <div className="col-5 order_date_box">
                <p className="order_date">Ordered on {date}</p>
              </div>
            </div>
            <div className="row order_secondrow">
              <div className="col-5 order_amount_box ">
                <p className="order_amount s">
                  {amount
                    ? `${amount} items for ${(price * amount * 1.21).toFixed(
                        2
                      )}$`
                    : ""}
                </p>
                <a
                  className=" ms-3 order_recipt"
                  data-bs-toggle="modal"
                  data-bs-target={`#reciptmodal${bill_id}`}
                >
                  View recipt
                </a>
                <div
                  className="modal fade"
                  id={`reciptmodal${bill_id}`}
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header position-relative">
                        <div className="row">
                          <div className="col-9 position-absolute start-0">
                              <p className="text-light">
                                Thanks for ordering with
                              </p>
                          </div>
                          <button
                            type="button"
                            className="btn-close position-absolute col-2 end-0 me-1"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="row  w-100 modal_row_header">
                          <div className="col-8  p-0 ">
                            <img id="logotipo-page" src={logoGrande} alt="Logo de la empresa" />
                          </div>
                          <div className="col-4 modal_price_col p-0 h-100">
                            <p className=" text-light  text-end">
                              {" "}
                              {price ? `${(price * 1.21).toFixed(2)}$` : ""}
                            </p>
                            <p className=" text-light  text-end my-0">
                              {" "}
                              {date} at {time}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="modal-body">
                        <ul className="  modal_ul_box">
                          {order.map((x, index) => {
                            
                            return (
                              <li key={index} className="d-flex ms-3 ">
                                {" "}
                                <h5 className="mt-3">
                                  {" "}
                                  {`${x.product.nombre} x${x.detail.cantidad}`}
                                </h5>{" "}
                                <p className="modal_subtotal_body mt-3 me-3 ms-auto">
                                  {x.detail.precioActual}$
                                </p>{" "}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div className="modal-footer ">
                        <div className="row  modal_footer_row">
                          <div className="col-6 d-flex ps-0">
                            <p className="modal_price_footer ms-3">
                              {" "}
                              Subtotal{" "}
                            </p>
                          </div>
                          <div className="col-6 d-flex pe-0">
                            <p className="modal_subtotal_footer  me-3 ms-auto">
                              {" "}
                              {price ? `${(price * amount).toFixed(2)}$` : ""}
                            </p>
                          </div>
                        </div>
                        <div className="row  modal_footer_row">
                          <div className="col-6 d-flex ps-0">
                            <p className="modal_price_footer ms-3"> IVA </p>
                          </div>
                          <div className="col-6 d-flex pe-0">
                            <p className="modal_subtotal_footer  me-3 ms-auto">
                              {" "}
                              {price
                                ? `${(price * amount * 0.21).toFixed(2)}$`
                                : ""}
                            </p>
                          </div>
                        </div>
                        <div className="row  modal_footer_row ">
                          <div className="col-6 d-flex ps-0">
                            <h4 className="modal_total_footer ms-3"> Total </h4>
                          </div>
                          <div className="col-6 d-flex pe-0">
                            <h4 className="modal_total_footer  me-3 ms-auto">
                              {" "}
                              {price
                                ? `${(price * amount * 1.21).toFixed(2)}$`
                                : ""}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row my-3">
              <ol className="list-group list-group-numbered  order_menu">
                {order.map((x, index) => {
                  return (
                    <li
                      className="list-group-item d-flex justify-content-between align-items-start order_items"
                      key={index}
                    >
                      <div className="ms-2 me-auto ">
                        <div className="fw-bold">{x.product.nombre}</div>
                        <small className="order_description">
                          {x.product.descripcion}
                        </small>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User_order;
