import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";



const Top_5_carrousel = () =>{
    const {store,actions} = useContext(Context)
    const navigate = useNavigate()

    const page_redirectionator = (id) => {
        navigate(`/companyPage/${id}`, { replace: true });


    }
    return(
                    
        <>
            <div className=" home_categories_row1 row flex-row justify-content-center mb-5">
                {store.top_5? store.top_5.map((x,index) =>{
                    return (

                    <div className="home_foodbox1 col-5 col-md-1 gy-3 mx-3" key= {x.id}>
                           <img src={x.imagen} alt="..." className="home_categoryimg1 mt-3" onClick={() => {page_redirectionator(x.id)}} />
                    </div>)
                })
                : ""}
            
            </div>
        </>
    )

}

export default Top_5_carrousel