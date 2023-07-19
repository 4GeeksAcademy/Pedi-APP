import React, { useState, useEffect, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "../../styles/checkout.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
        console.log(data);

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
          Swal.fire(result.msg);

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

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
      
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      /* redirigir a pago exitoso -----------------------------------------------------------------------------------------------------------------*/
      /* */
      
      Swal.fire("Your product is on the way!")
      navigate("/searchEmpresa", { replace: true });
      
    }
  };

  return (

    <div className="form-container container-flex">
        <form id="payment-form " className="pay_form" onSubmit={handleSubmit}>
          <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
          <button
            disabled={processing || disabled || succeeded}
            id="submit"
          >
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
            <a
              href={`https://dashboard.stripe.com/test/payments`}
            >
              {" "}
              Stripe dashboard.
            </a> Refresh the page to pay again.
          </p>
        </form>
    </div>
  );
}
