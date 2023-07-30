import React, { Profiler, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/orderDetail.css";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderDetail = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [company, setCompany] = useState({});
  const [products, setProducts] = useState([]);
  const [delivery, setdelivery] = useState(null);

  const [speed, setSpeed] = useState(null);
  const [payMethod, setPayMethod] = useState(null);

  const method_choosinator = (option) => {
    setPayMethod(option);
  };

  const speed_choosinator = (option) => {
    setSpeed(option);
  };

  const showToastAndNavigate = () => {
    return new Promise((resolve) => {
      toast.success("Your product is on the way!", {
        autoClose: 2000,
        onClose: resolve, // Resuelve la promesa cuando se cierra la notificación
      });
    });
  };

  useEffect(() => {
    (async () => {
      try {
        if (!actions.isloged() || store.cart.ammount <= 0) {
          toast.error("User not loged", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          navigate("/searchEmpresa", { replace: true });
        }

        let company_id_array = Object.keys(store.cart.products[0]);
        let company_id = company_id_array[0];

        const token = localStorage.getItem("jwt-token");
        const response = await fetch(
          process.env.BACKEND_URL + "/api/companyget",
          {
            method: "POST",
            body: JSON.stringify({ id: company_id }),
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const result = await response.json();
        if (response.status == 401) {
          toast.error(result.msg, {
            position: "bottom-right",
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
        setCompany(result.company);
        let products_object = store.cart.products[0];

        setProducts(products_object[company_id]);
      } catch (error) {
        console.log("Error loading message from backend");
      }
    })();
  }, [store.cart.ammount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (actions.isloged()) {
      if (delivery == null) {
        toast.error("Select delivery or takeout option", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        if (store.cart.ammount <= 0) {
          toast.error("Select al least one product", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          if (payMethod == null) {
            toast.error("Select a payment method", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } else if (payMethod == "cash") {
            const checkout_data = {
              products: products,
              user_id: store.current_user_data.id,
              delivery: delivery,
              pay_method: payMethod,
              company_id: company.id,
            };
            const token = localStorage.getItem("jwt-token");
            const response = await fetch(
              process.env.BACKEND_URL + "/api/checkout_data",
              {
                method: "POST",
                body: JSON.stringify(checkout_data),
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
              }
            );
            if (response.status == 401) {
              toast.error(result.msg, {
                position: "bottom-right",
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
            if (response.status == 200) {
              await showToastAndNavigate();
              actions.company_deletinator(company.id);
              navigate("/searchEmpresa", { replace: true });
            }
          } else if (payMethod == "card") {
            const checkout_data = {
              product_id: product.id,
              user_id: store.current_user_data.id,
              cantidad: product.cantidad,
              precio: product.precio,
              delivery: delivery,
              pay_method: payMethod,
            };
            const checkout = actions.checkout_configurator(checkout_data);
            if (checkout == false) {
              toast.error("Not loged in", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              navigate("/searchEmpresa", { replace: true });
            } else {
              navigate("/checkout", { replace: true });
            }
          }
        }
      }
    } else {
      toast.error("User not loged", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/searchEmpresa", { replace: true });
    }
  };
  let price_no_tax = 0;
  let tax = 0;
  let full_price = 0;

  for (let i of products) {
    price_no_tax += i.cantidad * i.precio;
  }
  tax = price_no_tax * 0.21;
  full_price = price_no_tax + tax;

  if (products.length > 0 && Object.keys(company) != 0) {
    return (
      <>
        <form onSubmit={(e) => handleSubmit(e)}>
          <ToastContainer />
          <div className="container-fluid text-center order_page_container p-5 ">
            <div className="row order_all p-sm-5 ">
              <div className="col-12 col-lg-5 order_left_col px-4 pb-4 ">
                <div className="row left_first_row pt-4 ">
                  <div className="col-sm-2 col-6  order_img_box ">
                    <img
                      src={company.imagen}
                      alt="..."
                      className="order_img rounded"
                    />
                  </div>
                  <div className="col-sm-5 col-6  order_company_name  ">
                    <h3 className="">{company.nombre}</h3>
                  </div>
                  <div className="col-sm-5  col-12 d-flex order_btn_box_box justify-content-center">
                    <div className="order_btn_box ">
                      <input
                        type="radio"
                        className="btn-check order_btn "
                        name="options"
                        id="option1"
                        autoComplete="off"
                        disabled={company.delivery == true ? false : true}
                        onClick={() => {
                          setdelivery(true);
                        }}
                      />
                      <label className="btn  order_btn me-2" htmlFor="option1">
                        Delivery
                      </label>

                      <input
                        type="radio"
                        className="btn-check order_btn"
                        name="options"
                        id="option2"
                        autoComplete="off"
                        onClick={() => {
                          setdelivery(false);
                        }}
                      />
                      <label
                        className="btn  order_btn text-nowrap"
                        htmlFor="option2"
                      >
                        Take away
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row left_second_row pt-1 ">
                  <div className="col order_delidet_box  ">
                    <h3>Delivery details</h3>
                  </div>
                  <div className="col order_delidet_box  ">
                    <i className="fas fa-map-marker-alt fa-lg order_icon"></i>
                    <p className="order_adress fs-6">
                      {store.current_user_data.direccion}
                    </p>
                  </div>
                  <div className="col order_instructions_box d-flex mt-2  ">
                    <p className="order_adress fs-6">
                      {store.current_user_data.instrucciones
                        ? store.current_user_data.instrucciones
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="row left_second_row  ">
                  <div className="col order_delidet_box  ">
                    <h3>Delivery estimate</h3>
                  </div>

                  <div
                    className={`col order_delidet_box ${
                      speed === "standard" ? "order_standexp" : ""
                    }`}
                    onClick={() => speed_choosinator("standard")}
                    tabindex="1"
                  >
                    <i className="fas fa-bicycle fa-lg order_icon"></i>
                    <div className=" ">
                      <p className="order_adress fs-5 ">Standard</p>
                      <p className="order_adress  text-secondary fs-6 ">
                        30-40 min
                      </p>
                    </div>
                  </div>

                  <div
                    className={`col order_delidet_box d-flex mt-2  ${
                      speed === "express" ? "order_standexp" : ""
                    }`}
                    onClick={() => speed_choosinator("express")}
                    tabindex="2"
                  >
                    <i class="fas fa-motorcycle fa-lg order_icon"></i>
                    <div className="  ">
                      <p className="order_adress fs-5 ">Express</p>
                      <p className="order_adress  text-secondary fs-6 ">
                        10-20 min
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row left_second_row  ">
                  <div className="col order_delidet_box  ">
                    <h3>Payment</h3>
                  </div>
                  <div
                    className={`col order_delidet_box  ${
                      payMethod === "card" ? "order_standexp" : ""
                    }`}
                    onClick={() => method_choosinator("card")}
                    tabindex="1"
                  >
                    <i className="far fa-credit-card fa-lg order_icon"></i>
                    <p className="order_adress fs-5 ">Credit Card</p>
                  </div>
                  <div
                    className={`col order_delidet_box  ${
                      payMethod === "cash" ? "order_standexp" : ""
                    }`}
                    onClick={() => method_choosinator("cash")}
                    tabindex="2"
                  >
                    <i className="fas fa-coins fa-lg order_icon"></i>
                    <div className="  ">
                      <p className="order_adress fs-5 ">Cash</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-5 order_right_col px-4 pb-4">
                <div className="row right_first_row py-4 ">
                  <h3 className=" text-start">Order summary</h3>
                </div>
                {products &&
                  products.map((x, index) => {
                    return (
                      <div
                        className="row right_second_row py-sm-4  "
                        key={index}
                      >
                        <div className="col-7 order_detail_box ">
                          <div className=" d-flex w-100">
                            <p className="order_product fs-5">{x.nombre} </p>
                            <p className="order_quant fs-5 text-secondary  ">
                              {x.cantidad}{" "}
                            </p>
                          </div>

                          <p className="order_adress order_description text-secondary fs-6">
                            {x.descripcion}
                          </p>
                        </div>
                        <div className="col-sm-5  order_product_price_box  ">
                          <div
                            className="btn-group order_product_btnbox "
                            role="group"
                            aria-label="Basic example"
                          >
                            <button
                              type="button"
                              className="btn  btn-sm order_product_btn"
                              onClick={() => {
                                //</div>x.cantidad > 0
                                //</div> ? setProduct({
                                //    ...product,
                                //   cantidad: product.cantidad - 1,
                                //</div>   })
                                // : "";

                                actions.product_deletinator(x.id, company.id);
                                console.log(
                                  "pendiente quitar un solo producto"
                                );
                              }}
                            >
                              <i class="fas fa-trash fa"></i>
                            </button>
                            <button
                              type="button"
                              className="btn  btn-sm order_product_btn"
                            >
                              <p className="my-auto mx-1">{x.cantidad}</p>
                            </button>
                            <button
                              type="button"
                              className="btn  btn-sm order_product_btn"
                              onClick={() => {
                                //</div>setProduct({
                                //   ...product,
                                //  cantidad: product.cantidad + 1,
                                //});
                                console.log(
                                  "pendiente agregar un solo producto"
                                );
                              }}
                            >
                              <p className="my-auto mx-1">+</p>
                            </button>
                          </div>
                          <p className="order_product_price fs-5">
                            {(x.cantidad * x.precio).toFixed(2)}${" "}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                <div className="row right_third_row py-4 ">
                  <div className="col  order_subtotal  w-100">
                    {" "}
                    <h4 className=" text-start">Subtotal</h4>{" "}
                    <h4 className=" ms-auto me-3">
                      {price_no_tax.toFixed(2)}$
                    </h4>
                  </div>
                  <div className="col  order_tax w-100">
                    {" "}
                    <h4 className=" text-start">Tax</h4>{" "}
                    <h4 className=" ms-auto me-3">{tax.toFixed(2)}$</h4>
                  </div>
                  <div className="col   order_total w-100">
                    {" "}
                    <h3 className=" text-start">Total</h3>{" "}
                    <h3 className=" ms-auto me-3">{full_price.toFixed(2)}$</h3>
                  </div>
                  <div className="col d-flex  w-100">
                    {" "}
                    <p className=" text-secondary order_disclaimer">
                      If you’re not around when the delivery person arrives,
                      they’ll leave your order at the door. By placing your
                      order, you agree to take full responsibility for it once
                      it’s delivered. Orders containing alcohol or other
                      restricted items may not be eligible for leave at door and
                      will be returned to the store if you are not avaiable.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg order_submit"
                >
                  Place order
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  } else {
    return (
      <>
        <h1>loading</h1>
      </>
    );
  }
};

export default OrderDetail;
