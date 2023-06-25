import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import sushi from "../../img/sushi.png";
import bk from "../../img/bk.png";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center container-fluid ">
      <div className="row home_first_row">
        <h1 className="home_title"> DishDash</h1>
        <p className="home_subtitle"> Dashing to your door</p>

        <form className="home_searchform my-5">
          <div className="mb-3 input-group home_searchbar">
            <button class="btn home_dirbtn " type="button">
              Direcci000000000000000on
            </button>
            <input
              type="text"
              className="form-control home_input pure-input-rounded"
              id="search"
              aria-describedby="emailHelp"
              placeholder="Your search"
            />
            <button type="submit" class="btn home_searchbtn ">
              <i class="fa-solid fa-location-arrow fa-xl"></i>
            </button>
          </div>
        </form>
      </div>
      <div className="row home_second_row">
        <h1 className="home_categories_title">Categories</h1>
        <div className="row home_categories_row my-3">
          <div className="home_foodbox">
            <img src={sushi} alt="..." className="home_categoryimg" />
          </div>
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
