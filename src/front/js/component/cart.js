import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <>
      {store.cart
        ? store.cart.products.map((x, index1) => {
            let products = Object.values(x)[0];

            return (
              <>
                <h5 key={index1}>{products[0].company_name}</h5>
                {products.map((j, index2) => {
                  return (
                    <>
                      <li className="d-flex my-1" key={index2}>
                        <p className="my-auto">
                          {j.nombre} x{j.cantidad}
                        </p>
                        <i
                          className="fas fa-trash fa-lg my-auto ms-auto me-2"
                          onClick={() => {
                            actions.product_deletinator(j.id, j.company_id);
                          }}
                        ></i>
                      </li>
                    </>
                  );
                })}

                <li>
                  <hr className="dropdown-divider" />
                </li>
              </>
            );
          })
        : ""}
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => {
          navigate("/orderDetail", { replace: true });
        }}
      >
        Go to checkout
      </button>
    </>
  );
};

export default Cart;
