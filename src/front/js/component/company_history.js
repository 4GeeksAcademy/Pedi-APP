import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/userHistory.css";
import Company_order from "./company_order";

const Company_history = () => {
  const { store, actions } = useContext(Context);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("jwt-token");
      try {
        const response = await fetch(process.env.BACKEND_URL + "/api/bill", {
          method: "POST",
          body: JSON.stringify({
            id: store.current_user_data.id,
            role: store.current_user_data.role,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        const result = await response.json();
        if (response.status == 401) {
          Swal.fire(result.msg);

          navigate("/", { replace: true });
        }
        setBills(result.bills);
      } catch (error) {
        console.log("Error loading message from backend");
      }
    })();
  }, [store.current_user_data]);

  return (
    <>
      <h1 className="title_history_user">Your orders</h1>
      {bills &&
        bills.map((x, index) => {
          return (
            <Company_order
              date={x.bill.fecha}
              bill_id={x.bill.id}
              user={x.user}
              company_img={x.company_img}
              time={x.bill.hora}
              key={index}
            />
          );
        })}
    </>
  );
};

export default Company_history;
