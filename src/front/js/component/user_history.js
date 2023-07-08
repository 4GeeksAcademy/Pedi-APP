import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/userHistory.css";
import User_order from "./user_order";


const User_history = () =>{
    const {store,actions} = useContext(Context)
    const [bills, setBills] = useState([])

    useEffect( () =>{
        
        (async () => {
            
            
            try {
                const response = await fetch(process.env.BACKEND_URL + "/api/bill", { 
                    method : "POST",
                    body: JSON.stringify({id : store.current_user_data.id}),
                    headers: { 
                        "Content-Type": "application/json",
                        } 
                    
                    
                })
                const result = await response.json()
                setBills(result.bills)
                
                

            }catch(error){
                console.log("Error loading message from backend")
            }		
        })()
       

    }, []);
    
    return(
        <>
            <h1 className="title_history_user">Your orders</h1>
            {bills && (
                        bills.map((x,index) =>{    
                            return <User_order date = {x.bill.fecha} bill_id = {x.bill.id} company={x.company} key = {index}/>
                        })
                         )}
        </>
    )
}

export default User_history