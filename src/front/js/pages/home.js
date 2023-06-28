import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import bk from "../../img/bk.png";
import { useNavigate } from "react-router-dom";

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


export const Home = () => {
  const { store, actions } = useContext(Context);
  const [address, setAddress] = useState("")
  const navigate = useNavigate();

  const address_setinator = (event) => {
    setAddress({ ...address, [event.target.id]: event.target.value });
    
  };

  const search_handlinator = (event) => {
    event.preventDefault()
    actions.search_handlinator(address)
  }
  
  const categories = store.categories

  return (
    <div className="text-center container-fluid ">
      <div className="row home_first_row">
        <h1 className="home_title"> DishDash</h1>
        <p className="home_subtitle"> Dashing to your door</p>

        <form className="home_searchform my-5" onSubmit={(e) => {search_handlinator(e)}}>
          <div className="mb-3 input-group home_searchbar">
            <input
              type="text"
              className="form-control home_input pure-input-rounded"
              id="address"
              aria-describedby="emailHelp"
              placeholder="Enter your adress"
              onChange={(e) => address_setinator(e)}
              required
            />
            <button type="submit" className="btn home_searchbtn ">
                
              <i className="fa-solid fa-location-arrow fa-xl"></i>
            </button>
          </div>
        </form>
      </div>
      <div className="row home_second_row">
        <h1 className="home_categories_title">Categories</h1>
        <div className=" home_categories_row row text-center flex-row flex-nowrap overflow-auto carrousel border border-primary">
          {store.categories? store.categories.map((x,index) =>{
            console.log(x)
            return (
              <div className="home_foodbox  mx-3 my-5" key= {index}>
                <img src={`/${x}.png`} alt="..." className="home_categoryimg" />
              </div>)
          })
          : ""}
          
        </div>
        <h1 className="home_categories_title">Top rated</h1>
        <div className="row home_categories_row my-3">
          <div className="home_foodbox py-1">
            <img src={bk} alt="..." className="home_categoryimg" />
          </div>
        </div>
      </div>
    </div>
  );
};
