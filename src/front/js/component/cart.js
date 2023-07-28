import React, { useContext } from "react";
import { Context } from "../store/appContext";

const Cart = () => {
  const { store, actions } = useContext(Context);
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
                      <li key={index2}>
                        <p>{j.nombre}</p>
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
    </>
  );
};

export default Cart;
