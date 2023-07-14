import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";



const Top_5_carrousel = () =>{
    const {store,actions} = useContext(Context)
    return(
                    
        <>
            <div className=" home_categories_row row text-center flex-row flex-nowrap overflow-auto  justify-content-center">
                {store.top_5? store.top_5.map((x,index) =>{
                    return (
                    <div className="home_foodbox  mx-3 my-5" key= {x.id}>
                         <img src={x.imagen} alt="..." className="home_categoryimg" />
                    </div>)
                })
                : ""}
            
            </div>
        </>
    )

}

export default Top_5_carrousel