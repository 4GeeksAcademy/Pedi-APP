import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/categories.css"

import japanese from "../../img/japanese.png";
import indian from "../../img/indian.png";
import arab from "../../img/arab.png";
import bar from "../../img/bar.png";
import brasilean from "../../img/brasilean.png";
import breakfast from "../../img/breakfast.png";
import korean from "../../img/korean.png";
import burger from "../../img/burger.png";
import cafe from "../../img/cafe.png";
import chinese from "../../img/chinese.png";
import churros from "../../img/churros.png";
import desert from "../../img/desert.png";
import empanadas from "../../img/empanadas.png";
import fast_food from "../../img/fast_food.png";
import french from "../../img/french.png";
import grill from "../../img/grill.png";
import ice_cream from "../../img/ice_cream.png";
import italian from "../../img/italian.png";
import pizza from "../../img/pizza.png";
import mexican from "../../img/mexican.png";
import salad from "../../img/salad.png";
import thai from "../../img/thai.png";
import vegan from "../../img/vegan.png";
import vegetarian from "../../img/vegetarian.png";
import seafood from "../../img/seafood.png";


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
            <div className=" home_categories_row row text-center flex-row flex-nowrap overflow-auto ">
                {store.categories? store.categories.map((x,index) =>{
                    return (
                    <div className="home_foodbox  mx-3 my-5" key= {x}>
                        <img src={`/${x}.png`} alt="..." className="home_categoryimg mt-1" />
                    </div>)
                })
                : ""}
            
            </div>
        </>
    )

}

export default Categories