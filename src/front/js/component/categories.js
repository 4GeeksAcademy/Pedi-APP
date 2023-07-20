import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

import japanese from "../../img/japanese.png";
import bar from "../../img/bar.png";
import burger from "../../img/burger.png";
import cafe from "../../img/cafe.png";
import chinese from "../../img/chinese.png";
import empanadas from "../../img/empanadas.png";
import grill from "../../img/grill.png";
import italian from "../../img/italian.png";
import pizza from "../../img/pizza.png";
import mexican from "../../img/mexican.png";
import vegan from "../../img/vegan.png";
import asian from "../../img/asian.png";
import mediterranean from "../../img/mediterranean.png";
import { useNavigate } from "react-router-dom";


const Categories = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const category_searchinator = async (category) => {
    const result = await actions.caregory_filtrator(category);

    navigate("/searchEmpresa", { replace: true });
  };

const Categories = () =>{
    const {store,actions} = useContext(Context)
    return(
       
    //     const firstSixCategories = store.categories.slice(0, 6).map(item => item.id);   TENGO QUE QUITAR LA BARRA DE CARROUSEL
    
    //     return (
    //         <>
    //             <div className="home_categories_row row text-center flex-row flex-nowrap overflow-auto">
    //                 {store.categories ? (
    //                     firstSixCategories.map((x, index) => {
    //                         return (
    //                             <div className="home_foodbox col-3 col-md-6 mx-3 my-5" key={x}>
    //                                 <img src={`/${x}.png`} alt="..." className="home_categoryimg" />
    //                             </div>
    //                         );
    //                     })
    //                 ) : (
    //                     ""
    //                 )}
    //             </div>
    //         </>
    //     );
    // }

        <>
            <div className=" home_categories_row row text-center flex-row px-0 mx-0 ">
                {store.categories? store.categories.map((x,index) =>{
                    return (
                    <div className="home_foodbox mx-0 my-3 px-0 ms-3 col-1" key= {x}>
                        
                        <div className="me-0 pe-0">
                                <img src={`/${x}.png`} alt="..." className="home_categoryimg" />
                        </div>
                        <div className="me-1 ms-0 p-0">
                            <p className="nombreCategoria">{x}</p>
                        </div>
                        
                        
                    </div>)
                })
                : ""}
            
            </div>
        </>
    )

}

export default Categories