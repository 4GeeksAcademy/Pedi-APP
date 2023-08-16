import React, { useState, useEffect, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "../../styles/checkout.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    (async () => {
      try {
        if (!store.checkout_data) {
          navigate("/searchEmpresa", { replace: true });
        }

        const data = store.checkout_data;

        const token = localStorage.getItem("jwt-token");
        const response = await fetch(
          process.env.BACKEND_URL + "/api/create-payment-intent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify(data),
          }
        );
        const result = await response.json();
        if (response.status == 401) {
          toast.error(result.msg);
          navigate("/", { replace: true });
        }
        setClientSecret(result.clientSecret);
      } catch (error) {
        console.log("Error loading message from backend");
      }
    })();
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        fontFamily: "Arial, sans-serif",
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const showToastAndNavigate = () => {
    return new Promise((resolve) => {
      toast.success("Your product is on the way!", {
        autoClose: 2000,
        onClose: resolve, // Resuelve la promesa cuando se cierra la notificación
      });
    });
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!actions.isloged()) {
      navigate("/", { replace: true });
    }
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    const token = localStorage.getItem("jwt-token");
    const response = await fetch(
      process.env.BACKEND_URL + "/api/checkout_data",
      {
        method: "POST",
        body: JSON.stringify(store.checkout_data),
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

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      toast.error(payload.error.message);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      /* redirigir a pago exitoso -----------------------------------------------------------------------------------------------------------------*/
      /* */
      if (store.cart.products.length > 1) {
        await showToastAndNavigate();
        actions.company_deletinator(store.checkout_data.company_id);
      } else {
        await showToastAndNavigate();
        actions.company_deletinator(store.checkout_data.company_id);
        navigate("/searchEmpresa", { replace: true });
      }
    }
  };

  return (
    <div className="form-container container-flex">
      <form id="payment-form " className="pay_form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />

          <div className="container">
              <div className="d-flex flex-row-reverse gx-0 mx-0 px-0">
                <div className="col-8">
                  <div className="d-flex flex-row-reverse gx-0 mx-0 px-0">
                    {/* <div className="col-1 mx-0"><i class="fa-brands fa-cc-visa fa-2xl mt-5"></i></div>
                    <div className="col-1 mx-0 px-0"><i class="fa-brands fa-cc-mastercard fa-2xl mt-5 mx-0 px-0"></i></div>
                    <div className="col-1 mx-0 px-0"><i class="fa-brands fa-cc-amex fa-2xl mt-5 mx-0 px-0"></i></div>
                    <div className="col-1 mx-0 px-0"><i class="fa-brands fa-cc-discover fa-2xl mt-5 mx-0 px-0"></i></div> */}
                    <img className="imagenPago mt-3" src="https://shop.carmen24.es/wp-content/uploads/2020/12/pago-seguro-garantizado.png"/>
                  </div>
                </div>
              </div>          
          </div>


        <button disabled={processing || disabled || succeeded} id="submit">
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>



        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment succeeded, see the result in your
          <a href={`https://dashboard.stripe.com/test/payments`}>
            {" "}
            Stripe dashboard.
          </a>{" "}
          Refresh the page to pay again.
        </p>
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        progress={undefined}
        theme="colored"
      />
    </div>
  );
}
